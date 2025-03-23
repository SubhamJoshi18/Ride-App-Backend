import { Channel, ConsumeMessage } from 'amqplib';
import { RabbitMQExceptions } from '../../exceptions';
import { HTTP_STATUS } from '../../constants/http-status.constant';
import authLogger from '../../libs/logger.libs';
import {
  IConfidentallyUpdate,
  ICreateRider,
  IIncludeId,
} from '../../interfaces/rider.interface';
import {
  findDataFromUser,
  updatePhoneNumber,
  updateTheUserStatus,
} from '../../repository/user.repository';
import { retrieveConfigPayload } from '../../mappers/confidentallyUpdate.mapper';
import { parse } from 'path';
import {
  ACCOUNT_STATUS_MODULE,
  PHONE_NUMBER_MODULE,
} from '../../constants/queue.constant';

async function handleConfidentallyUpdate(
  channel: Channel,
  msg: ConsumeMessage,
) {
  try {
    const content = msg?.content ?? null;
    if (!content) {
      throw new RabbitMQExceptions(
        HTTP_STATUS.BAD_REQUEST.CODE,
        `confidentallyUpdateConsumer: The Content Property on the Message Field is Empty`,
      );
    }
    const parseContent = JSON.parse(content.toString()) as IConfidentallyUpdate;

    authLogger.info(
      `Auth-microservice: The Auth Microservice has received the payload : ${JSON.stringify(parseContent)} From the User-Microservice`,
    );

    const { userId } = parseContent;

    const userDocuments = await findDataFromUser('id', userId);

    if (!userDocuments) {
      throw new RabbitMQExceptions(
        HTTP_STATUS.BAD_REQUEST.CODE,
        `confidentallyUpdateConsumer: The User Does not Exists on the System`,
      );
    }

    const configPayload = retrieveConfigPayload(parseContent);

    switch (configPayload) {
      case ACCOUNT_STATUS_MODULE: {
        await updateTheUserStatus(userId, parseContent);
        authLogger.info(
          `confidentallyUpdateConsumer: The User Status has been Changed`,
        );
      }

      case PHONE_NUMBER_MODULE: {
        await updatePhoneNumber(userId, parseContent[PHONE_NUMBER_MODULE]);
        authLogger.info(
          'confidentallyUpdateConsumer: The User Has Updated the Phone Number',
        );
      }
    }
  } catch (err) {
    throw err;
  }
}

export { handleConfidentallyUpdate };
