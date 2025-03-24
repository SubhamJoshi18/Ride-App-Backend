import { Request, Response, Router } from 'express';
import { verifyAuthAccessToken } from '../middleware/auth.middleware';
import { isRider } from '../middleware/role.middleware';
import { isUserActive } from '../middleware/active.middleware';
import { getAllNewRides } from '../controller/rider.controller';

const riderRouter = Router();

riderRouter.get(
  '/rides',
  verifyAuthAccessToken,
  isRider,
  isUserActive,
  getAllNewRides,
);

export default riderRouter;
