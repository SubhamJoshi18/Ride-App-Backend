import { Rider } from '../database/entities/rider.entity';
import { Rides } from '../database/entities/rides.entity';
import { Users } from '../database/entities/user.entity';
import { ICreateRide } from '../interfaces/rider.interface';

async function searchDataFromRider<T>(key: string, data: T): Promise<Rider> {
  const searchResult = await Rider.findOne({
    where: {
      [`${key}`]: data,
    },
  });
  return searchResult as Rider;
}

async function createRides(payload: ICreateRide, userDoc: Users) {
  const savedResult = Rides.create({
    ...payload,
    rideStartedAt: new Date(),
    user: userDoc,
  });
  const dataSaved = savedResult.save();
  return dataSaved;
}

export { searchDataFromRider, createRides };
