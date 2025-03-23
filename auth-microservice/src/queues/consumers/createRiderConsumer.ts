import { Channel, ConsumeMessage } from 'amqplib';
import authLogger from '../../libs/logger.libs';
import { createRiderConfig } from '../../config/queue.config';
import { DIRECT_EXCHANGE_TYPE } from '../../constants/modules.constant';
import { handleCreateRideMessage } from '../handlers/createRideHandler';

async function createRiderConsumer(channel: Channel) {
  const { queueName, queueExchange, queueRoutingKey } = createRiderConfig;
  try {
    await channel.assertExchange(queueExchange, DIRECT_EXCHANGE_TYPE, {
      durable: true,
    });

    await channel.assertQueue(queueName, { durable: true });

    await channel.bindQueue(queueName, queueExchange, queueRoutingKey);

    await channel.consume(queueName, async (msg: ConsumeMessage | null) => {
      try {
        await handleCreateRideMessage(channel, msg);
      } catch (err) {
        authLogger.error(
          `createRideConsumer: Error while handling the Consume Message`,
        );
      } finally {
        if (channel) {
          await channel.close();
        }
        channel.ack(msg);
      }
    });

    authLogger.info(
      `createRideConsumer: Waiting For Message or Payload in the ${queueName} with Exchange : ${queueExchange}`,
    );
  } catch (err) {
    authLogger.error(
      `createRideConsumer: Error while consuming the message for the  : ${queueName}`,
    );
  }
}

export { createRiderConsumer };
