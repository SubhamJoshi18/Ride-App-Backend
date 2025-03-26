import { Channel } from 'amqplib';
import { consumerStatus } from '../../config/consumer.config';
import { createRiderConsumer } from './createRiderConsumer';

async function MergeAllConsumerAndUp(channel: Channel) {
  const consumerHandlerSttatus = Object.entries(consumerStatus);
  const consumerPrefix = 'Consumer';
  for (const [key, value] of consumerHandlerSttatus) {
    if (key && typeof value === 'function' && value) {
      await value(channel);
    }
  }
}

export { MergeAllConsumerAndUp };
