import { NextFunction, Response } from "express";
import { HttpStatusCodes } from "../enums/httpStatusCodes";
import { MESSAGES } from "../constants/messages";
import { ISurveyService } from "../interfaces/services/ISurveyService";
import { ISurveyController } from "../interfaces/controllers/ISurveyController";
import { AuthRequest, JwtCustomPayload } from "../interfaces/auth";
import { JwtPayload } from "jsonwebtoken";

export class SurveyController implements ISurveyController {
  private surveyService: ISurveyService;

  constructor(surveyService: ISurveyService) {
    this.surveyService = surveyService;
  }

  async create(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.user as JwtPayload;
      req.body.userId = userId
      const response = await this.surveyService.createSurvey(req.body);
      res.status(HttpStatusCodes.CREATED).json({ message: MESSAGES.SUCCESS.USER_CREATED, response });
    } catch (error) {
      next(error);
    };
  }

};