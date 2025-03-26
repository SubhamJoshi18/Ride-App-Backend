import amqplib, { Channel, ChannelModel, Connection } from 'amqplib';
import {
  confidentallyUpdateQueue,
  createRiderConfig,
} from '../../config/queue.config';
import {
  IConfidentallyUpdate,
  ICreateRider,
} from '../../interfaces/user.interface';
import { DIRECT_EXCHANGE_TYPE } from '../../constants/modules.constant';
import userLogger from '../../libs/logger.libs';
import { resolve } from 'path';

async function publishConfidentallyUpdateQueue(
  configPayload: { channel: Channel; connection: ChannelModel },
  payload: IConfidentallyUpdate,
) {
  const { channel, connection } = configPayload;
  const { queueName, queueExchange, queueRoutingKey } =
    confidentallyUpdateQueue;

  return new Promise(async (resolve, reject) => {
    try {
      await channel.assertExchange(queueExchange, DIRECT_EXCHANGE_TYPE, {
        durable: true,
      });

      await channel.assertQueue(queueName, { durable: true });

      await channel.bindQueue(queueName, queueExchange, queueRoutingKey);

      const payloadQueue = Buffer.from(JSON.stringify(payload));

      channel.publish(queueExchange, queueRoutingKey, payloadQueue);

      userLogger.info(
        `user-microservice: Payload  : ${JSON.stringify(payloadQueue)} is Published to the ${queueName}`,
      );
      resolve(true);
    } catch (err) {
      throw err;
    } finally {
      if (channel && connection) {
        await channel.close();
      }
    }
  });
}

export { publishConfidentallyUpdateQueue };
