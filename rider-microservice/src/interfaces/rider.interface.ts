interface IQueueCreateRidePayload {
  userId: number;
  currentLocation: string;
  destinationLocation: string;
  flare: number;
  rideCreatedAt: Date;
  rideStatus: string;
}

interface ICreateRide {
  currentLocation: string;
  destinationLocation: string;
  flare: number;
}

interface ICreateRideWithStatus extends ICreateRide {
  rideStatus: string;
}

export { IQueueCreateRidePayload, ICreateRide, ICreateRideWithStatus };
