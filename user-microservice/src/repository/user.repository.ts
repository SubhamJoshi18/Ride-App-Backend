import { Users } from '../database/entities/user.entity';

async function findDataFromUser<T>(key: string, data: T): Promise<Users> {
  const searchResult = await Users.findOne({
    where: {
      [`${key}`]: data,
    },
  });
  return searchResult as Users;
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

export { findDataFromUser, innerJoinUserProfile };
