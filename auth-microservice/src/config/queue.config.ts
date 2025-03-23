import { IGenericQueueConfig } from '../interfaces/queue.interface';

const createRiderConfig = Object.preventExtensions({
  queueName: 'user-microservice:create-rider',
  queueExchange: 'user-microservice-exchange',
  queueRoutingKey: 'user-microservice-routingKey',
}) as IGenericQueueConfig;

export { createRiderConfig };
