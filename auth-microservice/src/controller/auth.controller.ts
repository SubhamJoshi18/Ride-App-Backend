import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { loginSchema, signupSchema } from '../validation/auth.validation';
import authLogger from '../libs/logger.libs';
import { mapZodMessages } from '../mappers/zod.mapper';
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../utils/response.utilts';
import { loginService, signUpUserServices } from '../services/auth.service';

async function signUpUser(req: Request, res: Response, next: NextFunction) {
  try {
    const content = req.body;
    const parsePayload = signupSchema.parse(content);
    const apiResponse = await signUpUserServices(parsePayload);
    const message = `${parsePayload['username']} Has Registered Successfully as the Users`;
    return sendSuccessResponse(res, apiResponse, message);
  } catch (err) {
    if (err instanceof z.ZodError) {
      authLogger.error(
        `ValidationError: Error while validating the Request Body`,
      );
      const mappedError = mapZodMessages(err.issues as unknown as Array<any>);
      return sendErrorResponse(res, mappedError);
    }
    next(err);
  }
}

async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const content = req.body;
    const parsePayload = loginSchema.parse(content);
    const apiResponse = await loginService(parsePayload);
    const message = `${parsePayload['phoneNumber']} Has Login Successfully as the Users`;
    return sendSuccessResponse(res, apiResponse, message);
  } catch (err) {
    if (err instanceof z.ZodError) {
      authLogger.error(
        `ValidationError: Error while validating the Request Body`,
      );
      const mappedError = mapZodMessages(err.issues as unknown as Array<any>);
      return sendErrorResponse(res, mappedError);
    }
    next(err);
  }
}

export { signUpUser, loginUser };
