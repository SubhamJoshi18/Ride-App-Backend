import { Users } from '../database/entities/user.entity';
import { IUserPayload } from '../interfaces/auth.interface';

async function findDataFromUser<T>(key: string, data: T) {
  const searchResult = await Users.findOne({
    where: {
      [`${key}`]: data,
    },
  });
  return searchResult;
}

async function createUser(data: IUserPayload): Promise<Users> {
  const user = Users.create({
    ...data,
  });
  const savedResult = await user.save();
  return savedResult;
}

export { findDataFromUser, createUser };
