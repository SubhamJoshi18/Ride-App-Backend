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

const userRideRequestQueue = {
  queueName: 'rider-microservice:ride-request-queue',
  queueExchange: 'rider-microservice:ride-request-exchange',
  queueRoutingKey: 'rider-microservice:ride-request-routingKey',
};

export { createRiderConfig, confidentallyUpdateQueue, userRideRequestQueue };
