import { Channel, ChannelModel, Connection } from 'amqplib';
import { userRideRequestQueue } from '../../config/queue.config';
import { IConfidentallyUpdate } from '../../interfaces/user.interface';
import { DIRECT_EXCHANGE_TYPE } from '../../constants/modules.constant';
import userLogger from '../../libs/logger.libs';
import { IQueueCreateRidePayload } from '../../interfaces/rider.interface';

async function publishRideRequestQueue(
  configPayload: { channel: Channel; connection: ChannelModel },
  payload: IQueueCreateRidePayload,
) {
  const { channel, connection } = configPayload;
  const { queueName, queueExchange, queueRoutingKey } = userRideRequestQueue;

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
        `rider-microservice: Payload  : ${JSON.stringify(payloadQueue)} is Published to the ${queueName}`,
      );
      resolve(true);
    } catch (err) {
      reject(err);
    } finally {
      if (channel && connection) {
        await channel.close();
      }
    }
  });
}

export { publishRideRequestQueue };
