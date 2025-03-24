import { NextFunction, Request, Response } from 'express';
import { ValidationException } from '../exceptions';
import { HTTP_STATUS } from '../constants/http-status.constant';
import { USER_ROLE } from '../constants/roles.constant';

function isUser(req: Request, res: Response, next: NextFunction) {
  const userRole = req.user.role;
  if (!userRole) {
    throw new ValidationException(
      HTTP_STATUS.UNAUTHORIZED.CODE,
      `The Role is not Provided , The Server cannot determine the Authorization`,
    );
  }
  const isvalidRole = userRole.includes(USER_ROLE);
  if (!isvalidRole) {
    throw new ValidationException(
      HTTP_STATUS.UNAUTHORIZED.CODE,
      `The Provided Role is not User , The Server cannot determine the Authorization for this Role`,
    );
  }
  next();
}

export { isUser };
