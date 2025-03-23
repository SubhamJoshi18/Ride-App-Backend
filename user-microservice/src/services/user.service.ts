import { HTTP_STATUS } from '../constants/http-status.constant';
import { DatabaseException } from '../exceptions';
import { ICreateRider, IDecodedPayload } from '../interfaces/user.interface';
import { searchDataFromRider } from '../repository/rider.repository';
import {
  findDataFromUser,
  innerJoinUserProfile,
} from '../repository/user.repository';

async function fetchUserProfileServices(payload: IDecodedPayload) {
  const { userId } = payload;

  const userDocs = await findDataFromUser('id', userId);

  if (!userDocs) {
    throw new DatabaseException(
      HTTP_STATUS.BAD_REQUEST.CODE,
      `The User Does not Exists on the System`,
    );
  }

  const dbUserId = userDocs.id;

  const userProfileDocs = await innerJoinUserProfile(dbUserId);

  if (!userProfileDocs) {
    throw new DatabaseException(
      HTTP_STATUS.BAD_REQUEST.CODE,
      `The User Profile is not Associated with the User`,
    );
  }

  if ('userProfile' in userProfileDocs && 'password' in userProfileDocs) {
    delete userProfileDocs.password;
    const userProfileContent = userProfileDocs['userProfile'];
    if ('user' in userProfileContent) {
      delete userProfileDocs.userProfile.user;
    }
  }

  return userProfileDocs;
}

async function makeUserRiderServices(payload: ICreateRider) {
  const { riderName, riderPlateNumber, vechileType } = payload;

  const isRiderNameExists = await searchDataFromRider('riderName', riderName);
  if (!isRiderNameExists) {
    throw new DatabaseException(
      HTTP_STATUS.DATABASE_ERROR.CODE,
      `The Rider with ${riderName} has been already Taken, Please Enter a new Rider Name`,
    );
  }

  const riderPayload = Object.preventExtensions({
    riderName,
    riderPlateNumber:
      typeof riderPlateNumber === 'string'
        ? Number(riderPlateNumber)
        : riderPlateNumber,
    vechileType,
  }) as unknown as {
    riderName: string;
    riderPlateNumber: number;
    vechileType: string;
  };


  
}

export { fetchUserProfileServices, makeUserRiderServices };
