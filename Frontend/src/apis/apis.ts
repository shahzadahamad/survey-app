import { API_URLS } from "../constants/apiUrls";
import { LoginRes, RegisterRes } from "../interfaces/apiResponses";
import { FormDataType } from "../interfaces/auth";
import { FormDataType as SurveyFormData } from '../interfaces/survey';
import apiClient, { adminApiClient, apiCustom } from "./apiClient";

export const fetchNationalityData = async () => {
  const response = await apiCustom.get(API_URLS.ALL_COUNTRIES);
  return response.data;
}

export const authenticateUser = async (formData: Partial<FormDataType>): Promise<LoginRes> => {
  const response = await apiClient.post(API_URLS.AUTHENTICATE_USER, formData);
  return response.data;
}

export const registerUser = async (formData: FormDataType): Promise<RegisterRes> => {
  const response = await apiClient.post(API_URLS.REGISTERUSER, formData);
  return response.data;
}

export const createSurvey = async (formData: SurveyFormData) => {
  const response = await apiClient.post(API_URLS.CREATE_SURVEY, formData);
  return response.data;
}

export const listUserSubmissions = async () => {
  const response = await apiClient.get(API_URLS.USER_SUBMISSIONS);
  return response.data;
}

export const listAllSubmissions = async () => {
  const response = await apiClient.get(API_URLS.ALL_SUBMISSIONS);
  return response.data;
}

//Admin
export const authenticateAdmin = async (formData: Partial<FormDataType>): Promise<LoginRes> => {
  const response = await adminApiClient.post(API_URLS.AUTHENTICATE_ADMIN, formData);
  return response.data;
}