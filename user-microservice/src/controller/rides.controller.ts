import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';
import riderLogger from '../libs/logger.libs';
import { mapZodMessages } from '../mappers/zod.mapper';
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../utils/response.utilts';
import { createRideSchema } from '../validation/rider.validation';
import { createRideService } from '../services/rider.service';
import { ICreateRide } from '../interfaces/rider.interface';
import { IDecodedPayload } from '../interfaces/user.interface';

async function createRide(req: Request, res: Response, next: NextFunction) {
  try {
    const userContent = req.user;
    const content = req.body;
    const parseContent = createRideSchema.parse(content);
    const apiResponse = await createRideService(
      userContent as IDecodedPayload,
      parseContent as ICreateRide,
    );
    const contentMessage = `The Ride has been Created`;
    sendSuccessResponse(res, apiResponse, contentMessage);
  } catch (err) {
    if (err instanceof z.ZodError) {
      riderLogger.error(
        `ValidationError: Error while validating the Requested Body`,
      );
      const mappedError = mapZodMessages(err.issues as unknown as Array<any>);
      sendErrorResponse(res, mappedError);
    }
    next(err);
  }
}

export { createRide };
