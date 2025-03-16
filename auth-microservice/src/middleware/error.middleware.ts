import authLogger from '../libs/logger.libs';
import statusCode from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { HttpExceptions } from '../exceptions';

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof HttpExceptions) {
    return res.status(error.getStatusCode()).json({
      message: error.getMessage(),
      error: true,
      statusCode: error.getStatusCode(),
    });
  }

  authLogger.crit('Unhandled Error found. Error: ' + error);

  return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
    message: 'Unhandle Error Found: ' + error?.message,
    error: true,
    statusCode: statusCode.INTERNAL_SERVER_ERROR,
  });
};
