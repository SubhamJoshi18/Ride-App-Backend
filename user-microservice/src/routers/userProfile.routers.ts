import { Router } from 'express';
import { verifyAuthAccessToken } from '../middleware/auth.middleware';
import { isUser } from '../middleware/role.middleware';
import { isUserActive } from '../middleware/active.middleware';
import { updateUserProfile } from '../controller/user.controller';

const userProfileRouter = Router();

userProfileRouter.patch(
  '/user/profile',
  verifyAuthAccessToken,
  isUser,
  isUserActive,
  updateUserProfile,
);

export default userProfileRouter;
