import { NextFunction, Request, Response } from 'express';
import { ValidationException } from '../exceptions';
import { HTTP_STATUS } from '../constants/http-status.constant';
import { RIDER_ROLE, USER_ROLE } from '../constants/roles.constant';

function isRider(req: Request, res: Response, next: NextFunction) {
  const userRole = req.user.role;
  if (!userRole) {
    throw new ValidationException(
      HTTP_STATUS.UNAUTHORIZED.CODE,
      `The Role is not Provided , The Server cannot determine the Authorization`,
    );
  }
  const isValidRole = userRole.includes(RIDER_ROLE);
  if (!isValidRole) {
    throw new ValidationException(
      HTTP_STATUS.UNAUTHORIZED.CODE,
      `The Provided Role is not Rider , The Server cannot determine the Authorization for this Role`,
    );
  }
  next();
}

export { isRider };
