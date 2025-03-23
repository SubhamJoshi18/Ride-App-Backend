import { Rider } from '../database/entities/rider.entity';
import { Users } from '../database/entities/user.entity';
import { IUserPayload } from '../interfaces/auth.interface';

async function findDataFromUser<T>(key: string, data: T): Promise<Users> {
  const searchResult = await Users.findOne({
    where: {
      [`${key}`]: data,
    },
  });
  return searchResult as Users;
}

async function createUser(data: IUserPayload): Promise<Users> {
  const user = Users.create({
    ...data,
  });
  const savedResult = await user.save();
  return savedResult;
}

async function innerJoinUserProfile(userId: number) {
  const searchResult = await Users.findOne({
    where: {
      id: userId,
    },
    relations: {
      userProfile: true,
    },
  });
  return searchResult;
}

async function innerJoinRider(userId: Users) {
  const searchResult = await Rider.findOne({
    where: {
      user: userId,
    },
  });
  return searchResult;
}

async function createRiderBasedOnUserId(
  userId: number,
  riderPayload: Rider,
): Promise<Rider> {
  const userDocs = (await findDataFromUser('id', userId)) as Users;
  riderPayload.user = userDocs;
  const savedProfileResult = await riderPayload.save();
  return savedProfileResult;
}

export {
  findDataFromUser,
  createUser,
  innerJoinUserProfile,
  innerJoinRider,
  createRiderBasedOnUserId,
};
