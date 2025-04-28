import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../auth";

export interface ISurveyController {
  create(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
  listUserSurveys(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
  listAllSurveys(req: Request, res: Response, next: NextFunction): Promise<void>;
}