import { Users } from '../database/entities/user.entity';
import { UserProfile } from '../database/entities/userProfile.entity';
import { IUpdateUserProfile } from '../interfaces/user.interface';
import { findDataFromUser } from './user.repository';

async function createUserProfileBasedOnUserId(
  userId: number,
  userProfilePayload: object,
): Promise<UserProfile> {
  const userProfile = UserProfile.create({
    ...userProfilePayload,
  });
  const userDocs = (await findDataFromUser('id', userId)) as Users;
  userProfile.user = userDocs;
  const savedProfileResult = await userProfile.save();
  return savedProfileResult;
}

async function findUserProfileBasedOnUserId(user: Users): Promise<UserProfile> {
  const searchResult = await UserProfile.findOne({
    where: {
      user: user,
    },
  });
  return searchResult;
}

async function updateUserProfile(
  payload: IUpdateUserProfile,
  userProfileId: number,
) {
  const updatedResult = await UserProfile.update(
    {
      id: userProfileId,
    },
    {
      ...payload,
    },
  );

  return updatedResult.affected > 0;
}

export {
  createUserProfileBasedOnUserId,
  findUserProfileBasedOnUserId,
  updateUserProfile,
};
