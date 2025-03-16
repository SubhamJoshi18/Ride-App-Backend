import { Router } from 'express';
import {
  SINGUP_API_ROUTES,
  LOGIN_API_ROUTES,
} from '../constants/auth-api.constant';
import { signUpUser } from '../controller/auth.controller';

const authRouter = Router();

authRouter.post(SINGUP_API_ROUTES, signUpUser as any);

export default authRouter;
