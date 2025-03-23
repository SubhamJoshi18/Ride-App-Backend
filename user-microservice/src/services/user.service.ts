import { HTTP_STATUS } from '../constants/http-status.constant';
import { DatabaseException } from '../exceptions';
import {
  ICreateRider,
  IDecodedPayload,
  IUpdateUserProfile,
} from '../interfaces/user.interface';
import MainQueueManager from '../queues/mainQueueManager';
import { publishCreaterideQueue } from '../queues/publisher/createRiderPublisher';
import { searchDataFromRider } from '../repository/rider.repository';
import {
  findDataFromUser,
  innerJoinUserProfile,
} from '../repository/user.repository';
import {
  findUserProfileBasedOnUserId,
  updateUserProfile,
} from '../repository/userProfile.repository';

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

async function makeUserRiderServices(
  payload: ICreateRider,
  userContent: IDecodedPayload,
) {
  const { riderName, riderPlateNumber, vechileType } = payload;
  const { userId } = userContent;
  const rabbitMQInstances = new MainQueueManager();
  const channel = await rabbitMQInstances.getChannel();
  const connection = await rabbitMQInstances.getConnection();

  const isRiderNameExists = await searchDataFromRider('riderName', riderName);
  if (isRiderNameExists) {
    throw new DatabaseException(
      HTTP_STATUS.DATABASE_ERROR.CODE,
      `The Rider with ${riderName} has been already Taken, Please Enter a new Rider Name`,
    );
  }

  const riderPayload = Object.preventExtensions({
    userId,
    riderName,
    riderPlateNumber:
      typeof riderPlateNumber === 'string'
        ? Number(riderPlateNumber)
        : riderPlateNumber,
    vechileType,
  }) as unknown as {
    userId: number;
    riderName: string;
    riderPlateNumber: number;
    vechileType: string;
  };

  const configPayload = Object.seal({
    channel: channel,
    connection: connection,
  });

  const publishToCreateRider = await publishCreaterideQueue(configPayload, {
    riderPlateNumber: riderPayload.riderPlateNumber.toString(),
    ...riderPayload,
  } as any);

  const responseMappedobj = {};
  const isValidSendedPayload =
    typeof publishToCreateRider === 'boolean' && publishToCreateRider;
  if (isValidSendedPayload) {
    responseMappedobj['Success'] = true;
  } else {
    responseMappedobj['Failed'] = true;
  }

  return {
    message: `${'Success' in responseMappedobj ? 'The Rider is being  Created, Will send the Notification After the Analyzing the Rider Information, Thank you!' : 'There have been issue while creating to the Rider'}`,
  };
}

async function updateUserProfileServices(
  userContent: IDecodedPayload,
  userProfilePayload: IUpdateUserProfile,
) {
  const { userId } = userContent;

  const userData = await findDataFromUser('id', userId);

  if (!userContent) {
    throw new DatabaseException(
      HTTP_STATUS.DATABASE_ERROR.CODE,
      `The User Does not Exists on the System`,
    );
  }

  const userid = userData.hasId() ? userData.id : null;

  const isMatchUserId = userid.toString() === userId;

  if (typeof isMatchUserId === 'boolean' && !isMatchUserId) {
    throw new DatabaseException(
      HTTP_STATUS.DATABASE_ERROR.CODE,
      `
      The User Id Does not Match with the Saved User`,
    );
  }

  const isProfileExists = await findUserProfileBasedOnUserId(userData);

  if (typeof isProfileExists === null || undefined) {
    throw new DatabaseException(
      HTTP_STATUS.DATABASE_ERROR.CODE,
      `
      The User  Does not have the Profile Associated With it `,
    );
  }

  const userProfileId = isProfileExists.hasId() ? isProfileExists.id : null;

  const status = await updateUserProfile(
    JSON.parse(JSON.stringify(userProfilePayload)),
    userProfileId,
  );

  return {
    updatedStatus: status,
  };
}

export {
  fetchUserProfileServices,
  makeUserRiderServices,
  updateUserProfileServices,
};
