import { Router } from 'express';
import { Request, Response } from 'express';
import statusCode from 'http-status-codes';

const healthRouter = Router();

healthRouter.get('/health', (req: Request, res: Response): void => {
  res.status(statusCode.ACCEPTED).json({
    message: `The Route : ${req.originalUrl} is Working!!`,
    time: new Date().toDateString(),
    error: false,
  });
});

export default healthRouter;
