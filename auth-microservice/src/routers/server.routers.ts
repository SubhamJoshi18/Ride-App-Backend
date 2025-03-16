import healthRouter from './health.routes';
import { Application, Router } from 'express';
import { handleNotFoundError } from '../utils/error.utils';
import { errorHandler } from '../middleware/error.middleware';

const serverRouter = (app: Application): void => {
  app.use('/api', [healthRouter]);
  app.use('*', handleNotFoundError);
  app.use(errorHandler as any);
};

export default serverRouter;
