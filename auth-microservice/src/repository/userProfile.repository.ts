import { Users } from '../database/entities/user.entity';
import { UserProfile } from '../database/entities/userProfile.entity';
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

export { createUserProfileBasedOnUserId };
