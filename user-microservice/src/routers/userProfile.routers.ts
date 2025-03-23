import { Router } from 'express';
import { verifyAuthAccessToken } from '../middleware/auth.middleware';
import { isUser } from '../middleware/role.middleware';
import { isUserActive } from '../middleware/active.middleware';
import { changeTheUserStatus, updateUserProfile } from '../controller/user.controller';

const userProfileRouter = Router();

userProfileRouter.patch(
  '/user/profile',
  verifyAuthAccessToken,
  isUser,
  isUserActive,
  updateUserProfile,
);

userProfileRouter.patch(
  '/user/profile/account',
  verifyAuthAccessToken,
  isUser,
  isUserActive,
  changeTheUserStatus,
);

export default userProfileRouter;
