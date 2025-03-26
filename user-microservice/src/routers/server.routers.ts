import userProfileRouter from './userProfile.routers';
import { Application, Router } from 'express';
import { handleNotFoundError } from '../utils/error.utils';
import { errorHandler } from '../middleware/error.middleware';
import userRouter from './user.routers';
import { handleAPIPrefix } from '../middleware/auth.middleware';

const serverRouter = (app: Application): void => {
  app.use('/api', [userRouter, userProfileRouter]);
  app.use(handleAPIPrefix);
  app.use(errorHandler as any);
};

export default serverRouter;
