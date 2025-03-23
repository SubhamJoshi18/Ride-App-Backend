import { Channel, ConsumeMessage } from 'amqplib';
import authLogger from '../../libs/logger.libs';
import { confidentallyUpdateQueue } from '../../config/queue.config';
import { DIRECT_EXCHANGE_TYPE } from '../../constants/modules.constant';
import { handleConfidentallyUpdate } from '../handlers/confidentalUpdateHandler';

async function confidentallyUpdateConsumer(channel: Channel) {
  const { queueName, queueExchange, queueRoutingKey } =
    confidentallyUpdateQueue;
  try {
    await channel.assertExchange(queueExchange, DIRECT_EXCHANGE_TYPE, {
      durable: true,
    });

    await channel.assertQueue(queueName, { durable: true });

    await channel.bindQueue(queueName, queueExchange, queueRoutingKey);

    await channel.consume(queueName, async (msg: ConsumeMessage | null) => {
      try {
        await handleConfidentallyUpdate(channel, msg);
      } catch (err) {
        console.log(err);
        authLogger.error(
          `confidentallyUpdateConsumer: Error while handling the Consume Message`,
        );
      } finally {
        channel.ack(msg);
      }
    });

    authLogger.info(
      `confidentallyUpdateConsumer: Waiting For Message or Payload in the ${queueName} with Exchange : ${queueExchange}`,
    );
  } catch (err) {
    authLogger.error(
      `confidentallyUpdateConsumer: Error while consuming the message for the  : ${queueName}`,
    );
  }
}

export { confidentallyUpdateConsumer };
