import { Channel } from 'amqplib';
import { consumerStatus } from '../../config/consumer.config';

async function MergeAllConsumerAndUp(channel: Channel) {
  const consumerHandlerSttatus = Object.entries(consumerStatus);
  for (const [key, value] of consumerHandlerSttatus) {
    if (key && typeof value === 'function' && value) {
      await value(channel);
    }
  }
}

export { MergeAllConsumerAndUp };
