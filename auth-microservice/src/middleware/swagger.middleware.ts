import { Request, Response, NextFunction } from 'express';
import { handleNotFoundError } from '../utils/error.utils';

function handleAPIPrefix(req: Request, res: Response, next: NextFunction) {
  if (req.url.includes('/docs') || req.url.startsWith('/api/')) {
    next();
  } else {
    return handleNotFoundError(req, res);
  }
}

export { handleAPIPrefix };
