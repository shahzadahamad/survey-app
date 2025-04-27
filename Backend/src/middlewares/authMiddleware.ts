import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { CustomError } from '../utils/customError';
import { HttpStatusCodes } from '../enums/httpStatusCodes';
import { MESSAGES } from '../constants/messages';
import { AuthRequest } from '../interfaces/auth';

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return next(new CustomError(MESSAGES.ERROR.UNAUTHORIZED, HttpStatusCodes.UNAUTHORIZED));
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return next(new CustomError(MESSAGES.ERROR.SESSION_EXPIRED, HttpStatusCodes.UNAUTHORIZED));
  };

}

export default authMiddleware;
