import userProfileRouter from './userProfile.routers';
import { Application, Router } from 'express';
import { handleNotFoundError } from '../utils/error.utils';
import { errorHandler } from '../middleware/error.middleware';
import userRouter from './user.routers';
import { handleAPIPrefix } from '../middleware/auth.middleware';
import rideRouter from './rider.routers';

const serverRouter = (app: Application): void => {
  app.use('/api', [userRouter, userProfileRouter, rideRouter]);
  app.use(handleAPIPrefix);
  app.use(errorHandler as any);
};

export default serverRouter;
