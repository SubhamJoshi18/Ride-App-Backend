const createRiderConfig = {
  queueName: 'user-microservice:create-rider',
  queueExchange: 'user-microservice-exchange',
  queueRoutingKey: 'user-microservice-routingKey',
};

const confidentallyUpdateQueue = {
  queueName: 'user-microservice:confidentally-update',
  queueExchange: 'user-microservice-update-exchange',
  queueRoutingKey: 'user-microservice-update-routingKey',
};

export { createRiderConfig, confidentallyUpdateQueue };
