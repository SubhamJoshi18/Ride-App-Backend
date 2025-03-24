import { Channel, ConsumeMessage } from 'amqplib';
import authLogger from '../../libs/logger.libs';
import {
  createRiderConfig,
  userRideRequestQueue,
} from '../../config/queue.config';
import { DIRECT_EXCHANGE_TYPE } from '../../constants/modules.constant';
import { handleRideRequestQueue } from '../handlers/rideRequestHandler';

async function rideRequestConsumer(channel: Channel) {
  const { queueName, queueExchange, queueRoutingKey } = userRideRequestQueue;
  try {
    await channel.assertExchange(queueExchange, DIRECT_EXCHANGE_TYPE, {
      durable: true,
    });

    await channel.assertQueue(queueName, { durable: true });

    await channel.bindQueue(queueName, queueExchange, queueRoutingKey);

    await channel.consume(queueName, async (msg: ConsumeMessage | null) => {
      try {
        await handleRideRequestQueue(channel, msg);
      } catch (err) {
        console.log(err);
        authLogger.error(
          `rideRequestConsumer: Error while handling the Consume Message`,
        );
      } finally {
        channel.ack(msg);
      }
    });

    authLogger.info(
      `rideRequestConsumer: Waiting For Message or Payload in the ${queueName} with Exchange : ${queueExchange}`,
    );
  } catch (err) {
    authLogger.error(
      `rideRequestConsumer: Error while consuming the message for the  : ${queueName}`,
    );
  }
}

export { rideRequestConsumer };
