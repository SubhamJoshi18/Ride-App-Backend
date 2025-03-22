import { Router } from 'express';
import { verifyAuthAccessToken } from '../middleware/auth.middleware';
import { isUser } from '../middleware/role.middleware';
import { fetchUserProfile } from '../controller/user.controller';
import { isUserActive } from '../middleware/active.middleware';

const userRouter = Router();

userRouter.get(
  '/user/profile',
  verifyAuthAccessToken,
  isUser,
  isUserActive,
  fetchUserProfile,
);

export default userRouter;
