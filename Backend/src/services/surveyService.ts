import { ISurvey } from "../interfaces/models";
import { ISurveyRepository } from "../interfaces/repositories/ISurveyRepository";
import { ISurveyService } from "../interfaces/services/ISurveyService";


export class SurveyService implements ISurveyService {
  private repository: ISurveyRepository;

  constructor(repository: ISurveyRepository) {
    this.repository = repository;
  }

  async createSurvey(surveyData: Partial<ISurvey>): Promise<ISurvey> {
    return await this.repository.create(surveyData);
  }

};
