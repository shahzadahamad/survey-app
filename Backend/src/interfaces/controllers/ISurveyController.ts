import { NextFunction, Request, Response } from "express";

export interface ISurveyController {
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
}