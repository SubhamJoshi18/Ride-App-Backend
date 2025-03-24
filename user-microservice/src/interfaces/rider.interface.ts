interface ICreateRide {
  currentLocation: string;
  destinationLocation: string;
  flare: number;
}

interface IQueueCreateRidePayload {
  userId: number;
  currentLocation: string;
  destinationLocation: string;
  flare: number;
  rideCreatedAt: Date;
  rideStatus: string;
}

export { ICreateRide, IQueueCreateRidePayload };
