import { Request, Response, NextFunction } from 'express';
import { ValidationException } from '../exceptions';
import { HTTP_STATUS } from '../constants/http-status.constant';
import { verifyAccessToken } from '../helpers/jwt.helpers';
import { handleNotFoundError } from '../utils/error.utils';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

async function verifyAuthAccessToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let token: string | undefined;
  try {
    token = req.headers['authorization'] ?? req.headers.authorization;

    if (!token) {
      throw new ValidationException(
        HTTP_STATUS.VALIDATION_ERROR.CODE,
        `The Token is not Provided to be Authenticated`,
      );
    }
    const decodedPayload = await verifyAccessToken(token);
    req.user = decodedPayload;
    next();
  } catch (err) {
    next(err);
  }
}

function handleAPIPrefix(req: Request, res: Response, next: NextFunction) {
  if (req.url.includes('/docs') || req.url.startsWith('/api/')) {
    next();
  } else {
    return handleNotFoundError(req, res);
  }
}

export { verifyAccessToken, handleAPIPrefix };
