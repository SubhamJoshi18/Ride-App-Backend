import { IGenericQueueConfig } from '../interfaces/queue.interface';

const createRiderConfig = Object.preventExtensions({
  queueName: 'user-microservice:create-rider',
  queueExchange: 'user-microservice-exchange',
  queueRoutingKey: 'user-microservice-routingKey',
}) as IGenericQueueConfig;

const confidentallyUpdateQueue = {
  queueName: 'user-microservice:confidentally-update',
  queueExchange: 'user-microservice-update-exchange',
  queueRoutingKey: 'user-microservice-update-routingKey',
} as IGenericQueueConfig;

export { createRiderConfig, confidentallyUpdateQueue };
