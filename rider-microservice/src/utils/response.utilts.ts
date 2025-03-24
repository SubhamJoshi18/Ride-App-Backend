import statusCode from 'http-status-codes';
import { Response } from 'express';
import { HTTP_STATUS } from '../constants/http-status.constant';

function sendErrorResponse<T>(
  res: Response,
  data: T,
  message: string = HTTP_STATUS.VALIDATION_ERROR.MESSAGE,
  isOperational = true,
) {
  return res.status(HTTP_STATUS.VALIDATION_ERROR.CODE).json({
    message: message,
    error: true,
    isOperational,
    errorDetails: data,
  });
}

function sendSuccessResponse<T>(res: Response, data: T, message: string) {
  return res.status(statusCode.ACCEPTED).json({
    message: message,
    error: false,
    data: data,
  });
}

export { sendErrorResponse, sendSuccessResponse };
