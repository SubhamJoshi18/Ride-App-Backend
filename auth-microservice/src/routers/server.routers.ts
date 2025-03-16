import { Application, Router } from 'express';
import { handleNotFoundError } from '../utils/error.utils';
import healthRouter from './health.routes';

const serverRouter = (app: Application): void => {
  app.use('/api', [healthRouter]);
  app.use('*', handleNotFoundError);
};

export default serverRouter;
