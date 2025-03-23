import amqplib, { Channel, ChannelModel, Connection } from 'amqplib';
import { createRiderConfig } from '../../config/queue.config';
import { ICreateRider } from '../../interfaces/user.interface';
import { DIRECT_EXCHANGE_TYPE } from '../../constants/modules.constant';
import userLogger from '../../libs/logger.libs';
import { resolve } from 'path';

async function publishCreaterideQueue(
  configPayload: { channel: Channel; connection: ChannelModel },
  payload: ICreateRider,
) {
  const { channel, connection } = configPayload;
  const { queueName, queueExchange, queueRoutingKey } = createRiderConfig;

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

export { publishCreaterideQueue };
