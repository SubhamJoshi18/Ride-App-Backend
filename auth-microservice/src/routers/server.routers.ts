import healthRouter from './health.routes';
import { Application, Router } from 'express';
import { handleNotFoundError } from '../utils/error.utils';
import { errorHandler } from '../middleware/error.middleware';
import authRouter from './auth.routes';
import { handleAPIPrefix } from '../middleware/auth.middleware';

const serverRouter = (app: Application): void => {
  app.use('/api', [healthRouter, authRouter]);
  app.use(handleAPIPrefix);
  app.use(errorHandler as any);
};

export default serverRouter;
