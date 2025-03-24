import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import { Application } from 'express';

const serverMiddleware = (app: Application): void => {
  app.disable('x-powered-by');
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));
};

export { serverMiddleware };
