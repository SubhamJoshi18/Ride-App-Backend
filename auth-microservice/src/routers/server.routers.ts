import healthRouter from './health.routes';
import { Application, Router } from 'express';
import { handleNotFoundError } from '../utils/error.utils';
import { errorHandler } from '../middleware/error.middleware';
import authRouter from './auth.routes';

const serverRouter = (app: Application): void => {
  app.use('/api', [healthRouter, authRouter]);
  app.use('*', handleNotFoundError);
  app.use(errorHandler as any);
};

export default serverRouter;
