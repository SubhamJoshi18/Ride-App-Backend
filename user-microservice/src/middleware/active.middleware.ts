import { NextFunction, Request, Response } from 'express';
import { ValidationException } from '../exceptions';
import { HTTP_STATUS } from '../constants/http-status.constant';

function isUserActive(req: Request, res: Response, next: NextFunction) {
  const userActiveStatus = req.user.isActive;
  if (typeof userActiveStatus !== 'boolean' && !userActiveStatus) {
    throw new ValidationException(
      HTTP_STATUS.UNAUTHORIZED.CODE,
      `The User is Deactivated, Please Activate the Following User`,
    );
  }
  next();
}

export { isUserActive };
