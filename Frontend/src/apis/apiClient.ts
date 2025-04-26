import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL!,
  withCredentials: true,
});

export const apiCustom: AxiosInstance = axios;

export default apiClient;