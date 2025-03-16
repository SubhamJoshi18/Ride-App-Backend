import { Router } from 'express';
import { Request, Response } from 'express';
import statusCode from 'http-status-codes';
import { Users } from '../database/entities/user.entity';
import { findDataFromUser } from '../repository/user.repository';
import { verifyAccessToken } from '../helpers/jwt.helpers';
import { verifyAuthAccessToken } from '../middleware/auth.middleware';

const healthRouter = Router();

healthRouter.get('/health', (req: Request, res: Response): void => {
  res.status(statusCode.ACCEPTED).json({
    message: `The Route : ${req.originalUrl} is Working!!`,
    time: new Date().toDateString(),
    error: false,
  });
});

healthRouter.get(
  '/test/user',
  verifyAuthAccessToken,
  async (req: Request, res: Response) => {
    const userData = req.user.userId;
    const result = await findDataFromUser('id', userData);
    res.status(201).json({
      data: {
        content: result,
      },
    });
  },
);

export default healthRouter;
