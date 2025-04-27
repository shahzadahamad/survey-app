import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/customError';
import { HttpStatusCodes } from '../enums/httpStatusCodes';
import { MESSAGES } from '../constants/messages';

const errorMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
    });
  }

  return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
    message: MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  });
};

export default errorMiddleware;