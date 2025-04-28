import { StorageKeys } from "../enums/storageKeys"

export const isLoggedIn = () => {
  return localStorage.getItem(StorageKeys.ACCESS_TOKEN);
}

export const isAdminLoggedIn = () => {
  return localStorage.getItem(StorageKeys.ADMIN_ACCESS_TOKEN);
}