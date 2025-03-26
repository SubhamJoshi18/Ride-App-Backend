import { Channel, ConsumeMessage } from 'amqplib';
import { RabbitMQExceptions } from '../../exceptions';
import { HTTP_STATUS } from '../../constants/http-status.constant';
import authLogger from '../../libs/logger.libs';
import { ICreateRider, IIncludeId } from '../../interfaces/rider.interface';
import {
  createRiderBasedOnUserId,
  findDataFromUser,
  innerJoinRider,
} from '../../repository/user.repository';
import { createRider } from '../../repository/rider.repository';

async function handleCreateRideMessage(channel: Channel, msg: ConsumeMessage) {
  try {
    const content = msg?.content ?? null;
    if (!content) {
      throw new RabbitMQExceptions(
        HTTP_STATUS.BAD_REQUEST.CODE,
        `createRideConsumer: The Content Property on the Message Field is Empty`,
      );
    }
    const parseContent = JSON.parse(content.toString()) as IIncludeId;

    authLogger.info(
      `Auth-microservice: The Auth Microservice has received the payload : ${JSON.stringify(parseContent)} From the User-Microservice`,
    );

    const { userId, riderName, riderPlateNumber, vechileType } = parseContent;

    const userDocuments = await findDataFromUser('id', userId);

    if (!userDocuments) {
      throw new RabbitMQExceptions(
        HTTP_STATUS.BAD_REQUEST.CODE,
        `createRiderConsumer: The User Does not Exists on the System`,
      );
    }


    const isUserAlreadyRider = await innerJoinRider(
      userDocuments.hasId() ? userDocuments : null,
    );

    if (isUserAlreadyRider) {
      throw new RabbitMQExceptions(
        HTTP_STATUS.BAD_REQUEST.CODE,
        `createRiderConsumer: The User is Already an Rider Cannot Create the Second Account`,
      );
    }

    const deleteUserId = (payload: IIncludeId) => {
      delete payload.userId;
      return parseContent;
    };

    const savedRider = await createRider(
      'userId' in parseContent ? deleteUserId(parseContent) : parseContent,
    );

    const riderId = savedRider.id;
    const createRiderUserId = await createRiderBasedOnUserId(
      userId,
      savedRider,
    );

    authLogger.info(
      `The Rider has been Created having :${riderId} with  the Rider Name : ${riderName}`,
    );
  } catch (err) {
    throw err;
  }
}

export { handleCreateRideMessage };
