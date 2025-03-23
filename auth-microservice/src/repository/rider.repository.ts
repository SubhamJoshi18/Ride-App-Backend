import { Rider } from '../database/entities/rider.entity';
import { ICreateRider } from '../interfaces/rider.interface';

async function createRider(data: ICreateRider): Promise<Rider> {
  const rider = await Rider.create({
    ...(data as any),
  });

  return rider.save();
}

export { createRider };
