import { NextFunction, Request, Response } from 'express';
import { fetchUserProfileServices } from '../services/user.service';
import { sendSuccessResponse } from '../utils/response.utilts';

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

export { fetchUserProfile };
