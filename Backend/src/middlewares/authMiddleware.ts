import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { CustomError } from '../utils/customError';
import { HttpStatusCodes } from '../enums/httpStatusCodes';
import { MESSAGES } from '../constants/messages';
import { AuthRequest, JwtCustomPayload } from '../interfaces/auth';

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return next(new CustomError(MESSAGES.ERROR.UNAUTHORIZED, HttpStatusCodes.UNAUTHORIZED));
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded as JwtCustomPayload;
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === 'TokenExpiredError') {
        return next(new CustomError(MESSAGES.ERROR.SESSION_EXPIRED, HttpStatusCodes.UNAUTHORIZED));
      } else if (error.name === 'JsonWebTokenError') {
        return next(new CustomError(MESSAGES.ERROR.INVALID_TOKEN, HttpStatusCodes.UNAUTHORIZED));
      }
    }
    return next(new CustomError(MESSAGES.ERROR.UNAUTHORIZED, HttpStatusCodes.UNAUTHORIZED));
  }
}

export default authMiddleware;