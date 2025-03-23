import { confidentallyUpdateConsumer } from '../queues/consumers/confidentallyUpdateConsumer';
import { createRiderConsumer } from '../queues/consumers/createRiderConsumer';

const consumerStatus = {
  createRiderConsumer: createRiderConsumer,
  confidentallyUpdateConsumer: confidentallyUpdateConsumer,
};

export { consumerStatus };
