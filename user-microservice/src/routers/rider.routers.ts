import { Router } from 'express';
import { verifyAuthAccessToken } from '../middleware/auth.middleware';
import { isUser } from '../middleware/role.middleware';
import { isUserActive } from '../middleware/active.middleware';
import { createRide } from '../controller/rides.controller';

const rideRouter = Router();

rideRouter.post(
  '/ride/create',
  verifyAuthAccessToken,
  isUser,
  isUserActive,
  createRide,
);

export default rideRouter;
