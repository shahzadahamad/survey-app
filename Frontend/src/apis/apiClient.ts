import axios, { AxiosInstance } from "axios";
import { adminRequestInterceptor, adminResponseInterceptor, requestInterceptor, responseInterceptor } from "./interceptors";

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL!,
  withCredentials: true,
});

apiClient.interceptors.request.use(requestInterceptor);
apiClient.interceptors.response.use((response) => response, responseInterceptor);

export const apiCustom: AxiosInstance = axios;

export default apiClient;

export const adminApiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

adminApiClient.interceptors.request.use(adminRequestInterceptor);
adminApiClient.interceptors.response.use((response) => response, adminResponseInterceptor);
