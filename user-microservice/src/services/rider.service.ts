import { HTTP_STATUS } from '../constants/http-status.constant';
import { IDLE_MODULE } from '../constants/rides-constant';
import { DatabaseException, ValidationException } from '../exceptions';
import { ICreateRide, IQueueCreateRidePayload } from '../interfaces/rider.interface';
import { IDecodedPayload } from '../interfaces/user.interface';
import MainQueueManager from '../queues/mainQueueManager';
import { publishRideRequestQueue } from '../queues/publisher/rideRequestPublisher';
import { createRides } from '../repository/rider.repository';
import { findDataFromUser } from '../repository/user.repository';
import { findUserProfileBasedOnUserId } from '../repository/userProfile.repository';

async function createRideService(
  userContent: IDecodedPayload,
  payload: ICreateRide,
) {
  const { userId } = userContent;

  const userDataResult = await findDataFromUser('id', userId);

  if (typeof userDataResult === 'object' && !userDataResult) {
    throw new DatabaseException(
      HTTP_STATUS.DATABASE_ERROR.CODE,
      `
        The User Does not Exists on the System`,
    );
  }

  const userIdFromDb = userDataResult.hasId() ? userDataResult.id : null;

  const userProfileDocs = await findUserProfileBasedOnUserId(userDataResult);

  if (typeof userDataResult === 'object' && !userProfileDocs) {
    throw new DatabaseException(
      HTTP_STATUS.DATABASE_ERROR.CODE,
      `
        The User Does not Have User Profiel Associates with It on the System`,
    );
  }

  const { currentLocation, destinationLocation, flare } = payload;

  const isPositiveNumber = !isNaN(flare) && Math.floor(flare) > 0;

  if (!isPositiveNumber) {
    throw new ValidationException(
      HTTP_STATUS.VALIDATION_ERROR.CODE,
      `The Flare is Invalid, Please add Appropriate Flare`,
    );
  }

  const isSameLoaction =
    currentLocation.trim().toLowerCase() ===
    destinationLocation.trim().toLowerCase();

  if (typeof isSameLoaction === 'boolean' && isSameLoaction)
    throw new ValidationException(
      HTTP_STATUS.VALIDATION_ERROR.CODE,
      `The Current Location is Same as the Current Location, Please Add Different Destination Location`,
    );

  const rabbitMQInstances = new MainQueueManager();
  const getChannel = await rabbitMQInstances.getChannel();
  const connection = await rabbitMQInstances.getConnection();

  const configPayload = {
    channel: getChannel,
    connection,
  };

  const queuePayload = Object.seal({
    userId: userId,
    currentLocation,
    destinationLocation,
    flare: typeof flare === 'string' ? Number(flare) : flare,
    rideCreatedAt: new Date().toDateString(),
    rideStatus: IDLE_MODULE,
  });

  const publishToRiders = await publishRideRequestQueue(
    configPayload,
    queuePayload as unknown as IQueueCreateRidePayload,
  );

  return {
    message: `The Ride has been Created, Searching For the Rider`,
  };
}

export { createRideService };
