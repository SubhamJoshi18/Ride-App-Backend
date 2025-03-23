import { NextFunction, Request, Response } from 'express';
import {
  changeTheUserProfileService,
  fetchUserProfileServices,
  makeUserRiderServices,
  updateUserProfileServices,
} from '../services/user.service';
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../utils/response.utilts';
import { map, z } from 'zod';
import userLogger from '../libs/logger.libs';
import { mapZodMessages } from '../mappers/zod.mapper';
import {
  createRiderSchema,
  updateUserProfileSchema,
} from '../validation/user.validation';
import { ICreateRider, IDecodedPayload } from '../interfaces/user.interface';

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
    const userContent = req.user;
    const parsePayload = createRiderSchema.parse(content);
    const apiResponse = await makeUserRiderServices(
      parsePayload as ICreateRider,
      userContent as IDecodedPayload,
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

async function updateUserProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userContent = req.user;
    const content = req.body;
    const parseContent = await updateUserProfileSchema.parse(content);
    const apiResponse = await updateUserProfileServices(
      userContent,
      parseContent,
    );
    const contentMessage = `The User Profile has been Updated`;
    sendSuccessResponse(res, apiResponse, contentMessage);
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

async function changeTheUserStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const queryOptions = req.query;
    const userData = req.user;
    const apiResponse = await changeTheUserProfileService(
      userData,
      queryOptions,
    );
    const contentMessage = `The Account has been Deactivated`;
    sendSuccessResponse(res, apiResponse, contentMessage);
  } catch (err) {
    next(err);
  }
}

export {
  fetchUserProfile,
  makeUserRider,
  updateUserProfile,
  changeTheUserStatus,
};
