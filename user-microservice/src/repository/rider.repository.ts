import { Rider } from '../database/entities/rider.entity';

async function searchDataFromRider<T>(key: string, data: T): Promise<Rider> {
  const searchResult = await Rider.findOne({
    where: {
      [`${key}`]: data,
    },
  });
  return searchResult as Rider;
}

export { searchDataFromRider };
