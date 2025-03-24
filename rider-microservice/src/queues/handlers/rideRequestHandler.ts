import { Channel, ConsumeMessage } from 'amqplib';
import { RabbitMQExceptions } from '../../exceptions';
import { HTTP_STATUS } from '../../constants/http-status.constant';
import { IQueueCreateRidePayload } from '../../interfaces/rider.interface';
import { findDataFromUser } from '../../repository/user.repository';
import {
  createRideMetaBasedOnRides,
  createRides,
} from '../../repository/rider.repository';
import riderLogger from '../../libs/logger.libs';

async function handleRideRequestQueue(channel: Channel, msg: ConsumeMessage) {
  try {
    const content = msg?.content ?? null;
    if (!content) {
      throw new RabbitMQExceptions(
        HTTP_STATUS.BAD_REQUEST.CODE,
        `rideRequestConsumer: The Content Property on the Message Field is Empty`,
      );
    }
    const parseContent = JSON.parse(
      content.toString(),
    ) as IQueueCreateRidePayload;

    riderLogger.info(
      `Rider-microservice: The Auth Microservice has received the payload : ${JSON.stringify(parseContent)} From the User-Microservice`,
    );

    const { userId, currentLocation, destinationLocation, flare, rideStatus } =
      parseContent;

    const userData = await findDataFromUser('id', userId);

    const initalRidePayload = Object.preventExtensions({
      currentLocation,
      destinationLocation,
      flare,
      rideStatus: rideStatus,
    });

    const savedInitialRides = await createRides(initalRidePayload, userData);
    const ridesId = savedInitialRides.hasId() ? savedInitialRides.id : null;
    const savedMetadataRides = await createRideMetaBasedOnRides(
      ridesId ? savedInitialRides : null,
    );
    const savedMetadataId = savedMetadataRides.hasId()
      ? savedMetadataRides.id
      : null;
    riderLogger.info(
      `Rider-microservice, The Ride has been Initial Saved with Metadata : ${savedMetadataId}`,
    );
  } catch (err) {
    throw err;
  }
}

export { handleRideRequestQueue };
