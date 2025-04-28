import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { StorageKeys } from "../enums/storageKeys";
import { MESSAGES } from "../constants/messages";

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(StorageKeys.ACCESS_TOKEN);
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

export const responseInterceptor = (error: AxiosError<{ message: string }>) => {
  if (error.response && error.response.status === 401) {
    if (error.response.data) {
      if (
        error.response.data.message === MESSAGES.ERROR.SESSION_EXPIRED ||
        error.response.data.message === MESSAGES.ERROR.INVALID_TOKEN
      ) {
        localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
        window.location.href = "/login";
      }
    }
  }
  return Promise.reject(error);
};

export const adminRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(StorageKeys.ADMIN_ACCESS_TOKEN);
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

export const adminResponseInterceptor = (error: AxiosError<{ message: string }>) => {
  if (error.response && error.response.status === 401) {
    if (error.response.data) {
      if (
        error.response.data.message === MESSAGES.ERROR.SESSION_EXPIRED ||
        error.response.data.message === MESSAGES.ERROR.INVALID_TOKEN
      ) {
        localStorage.removeItem(StorageKeys.ADMIN_ACCESS_TOKEN);
        window.location.href = "/admin/login";
      }
    }
  }
  return Promise.reject(error);
};



