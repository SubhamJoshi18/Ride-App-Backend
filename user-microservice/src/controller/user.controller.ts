import { NextFunction, Request, Response } from 'express';
import {
  fetchUserProfileServices,
  makeUserRiderServices,
} from '../services/user.service';
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../utils/response.utilts';
import { z } from 'zod';
import userLogger from '../libs/logger.libs';
import { mapZodMessages } from '../mappers/zod.mapper';
import { createRiderSchema } from '../validation/user.validation';
import { ICreateRider } from '../interfaces/user.interface';

async function fetchUserProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userContent = req.user;
    const apiResponse = await fetchUserProfileServices(userContent);
    const message = `User Profile Has been Fetches`;
    sendSuccessResponse(res, apiResponse, message);
  } catch (err) {
    next(err);
  }
}

async function makeUserRider(req: Request, res: Response, next: NextFunction) {
  try {
    const content = req.body;
    const parsePayload = createRiderSchema.parse(content);
    const apiResponse = await makeUserRiderServices(
      parsePayload as ICreateRider,
    );
    const message = `The Rider has been Created`;
    sendSuccessResponse(res, apiResponse, message);
  } catch (err) {
    if (err instanceof z.ZodError) {
      userLogger.error(
        `ValidationError: Error while validating the Request Body`,
      );
      const mappedError = mapZodMessages(err.issues as unknown as Array<any>);
      sendErrorResponse(res, mappedError);
    }
    next(err);
  }
}

export { fetchUserProfile, makeUserRider };
