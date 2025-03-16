import { Users } from '../database/entities/user.entity';

async function findDataFromUser<T>(key: string, data: T) {
  const searchResult = await Users.findOne({
    where: {
      [`${key}`]: data,
    },
  });
  return searchResult;
}

export { findDataFromUser };
