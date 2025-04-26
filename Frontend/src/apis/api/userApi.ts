import { API_URLS } from "../../constants/apiUrls";
import { apiCustom } from "../apiClient";

export const fetchNationalityData = async () => {
  const nationalityData = await apiCustom.get(API_URLS.ALL_COUNTRIES);
  return nationalityData.data;
}