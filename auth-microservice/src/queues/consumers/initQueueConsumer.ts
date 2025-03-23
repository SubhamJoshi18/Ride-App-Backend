import { Channel } from 'amqplib';
import { consumerStatus } from '../../config/consumer.config';
import { createRiderConsumer } from './createRiderConsumer';

async function MergeAllConsumerAndUp(channel: Channel) {
  const consumerHandlerSttatus = Object.entries(consumerStatus);
  const consumerPrefix = 'Consumer';
  for (const [key, value] of consumerHandlerSttatus) {
    if (key && typeof value === 'function' && value) {
      if (
        [key, consumerPrefix]
          .join()
          .replace(',', '')
          .includes(Object.keys(consumerStatus) as any)
      ) {
        await value(channel);
      }
    }
  }
}

export { MergeAllConsumerAndUp };
