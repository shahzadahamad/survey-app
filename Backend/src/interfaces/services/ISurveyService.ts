import { ISurvey } from "../models";

export interface ISurveyService {
  createSurvey(surveyData: Partial<ISurvey>): Promise<ISurvey>;
  listUserSurveys(userId: string): Promise<ISurvey[]>;
  listAllSurveys(): Promise<ISurvey[]>;
}