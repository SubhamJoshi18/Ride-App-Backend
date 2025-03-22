import { HTTP_STATUS } from '../constants/http-status.constant';
import { DatabaseException } from '../exceptions';
import { IDecodedPayload } from '../interfaces/user.interface';
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

export { fetchUserProfileServices };
