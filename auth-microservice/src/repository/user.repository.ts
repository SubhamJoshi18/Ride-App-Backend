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

export { findDataFromUser, createUser, innerJoinUserProfile };
