import { HttpStatusCodes } from "../enums/httpStatusCodes";

export class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static validationError(message: string): CustomError {
    return new CustomError(message, HttpStatusCodes.BAD_REQUEST);
  }

}
