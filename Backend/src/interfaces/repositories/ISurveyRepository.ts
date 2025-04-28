import { ISurvey } from "../models";

export interface ISurveyRepository {
  create(userData: Partial<ISurvey>): Promise<ISurvey>;
}