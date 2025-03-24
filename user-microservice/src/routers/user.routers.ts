import { Router } from 'express';
import { verifyAuthAccessToken } from '../middleware/auth.middleware';
import { isUser } from '../middleware/role.middleware';
import {
  changeUserPhoneNumber,
  fetchUserProfile,
  makeUserRider,
} from '../controller/user.controller';
import { isUserActive } from '../middleware/active.middleware';

const userRouter = Router();

userRouter.get(
  '/user/profile',
  verifyAuthAccessToken,
  isUser,
  isUserActive,
  fetchUserProfile,
);

userRouter.post(
  '/user/rider',
  verifyAuthAccessToken,
  isUser,
  isUserActive,
  makeUserRider,
);

userRouter.patch(
  '/user/profile/phoneNumber',
  verifyAuthAccessToken,
  isUser,
  isUserActive,
  changeUserPhoneNumber,
);

export default userRouter;
