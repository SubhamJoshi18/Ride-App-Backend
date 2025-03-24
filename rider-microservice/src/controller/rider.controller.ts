import { NextFunction, Request, Response } from 'express';
import { getAllNewRidesService } from '../services/rider.service';
import { sendSuccessResponse } from '../utils/response.utilts';

async function getAllNewRides(req: Request, res: Response, next: NextFunction) {
  try {
    const apiResponse = await getAllNewRidesService();
    const contentMessage = `All Rides Have been Fetches`;
    sendSuccessResponse(res,apiResponse,contentMessage)
  } catch (err) {
    next(err);
  }
}

export { getAllNewRides };
