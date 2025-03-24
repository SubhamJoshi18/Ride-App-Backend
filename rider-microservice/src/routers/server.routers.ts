import { Application, Router } from 'express';
import { errorHandler } from '../middleware/error.middleware';
import { handleAPIPrefix } from '../middleware/auth.middleware';
import riderRouter from './rider.routers';

const serverRouter = (app: Application): void => {
  app.use('/api', [riderRouter]);
  app.use(handleAPIPrefix);
  app.use(errorHandler as any);
};

export default serverRouter;
