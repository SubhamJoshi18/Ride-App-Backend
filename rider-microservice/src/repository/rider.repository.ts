import { Rider } from '../database/entities/rider.entity';
import { Rides } from '../database/entities/rides.entity';
import { RideMetadata } from '../database/entities/rides.metaData.entity';
import { Users } from '../database/entities/user.entity';
import { ICreateRideWithStatus } from '../interfaces/rider.interface';

async function searchDataFromRider<T>(key: string, data: T): Promise<Rider> {
  const searchResult = await Rider.findOne({
    where: {
      [`${key}`]: data,
    },
  });
  return searchResult as Rider;
}

async function createRides(payload: ICreateRideWithStatus, userDoc: Users) {
  const savedResult = Rides.create({
    ...payload,
    user: userDoc,
  });
  const dataSaved = savedResult.save();
  return dataSaved;
}

async function createRideMetaBasedOnRides(rides: Rides) {
  const savedMetadata = RideMetadata.create({
    rides: rides,
  });
  const savedResult = await savedMetadata.save();
  return savedResult;
}

async function fetchAllRides() {
  const allRides = await Rides.find({
    relations: {
      ridesMetadata: true,
    },
  });
  return allRides;
}

export {
  searchDataFromRider,
  createRides,
  createRideMetaBasedOnRides,
  fetchAllRides,
};
