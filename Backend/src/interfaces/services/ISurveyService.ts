import { ISurvey } from "../models";

export interface ISurveyService {
  createSurvey(surveyData: Partial<ISurvey>): Promise<ISurvey>;
}