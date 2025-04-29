import { ISurvey } from "../interfaces/models";
import { ISurveyRepository } from "../interfaces/repositories/ISurveyRepository";
import SurveyModel from "../models/surveyModel";
import { BaseRepository } from "./baseRepository";

export class SurveyRepository extends BaseRepository<ISurvey> implements ISurveyRepository {
  constructor() {
    super(SurveyModel);
  }

  async findByUserId(userId: string): Promise<ISurvey[]> {
    return await SurveyModel.find({ userId }).sort({ createdAt: -1 });
  }

  async findAll(): Promise<ISurvey[]> {
    return await SurveyModel.find().sort({ createdAt: -1 });
  }
};