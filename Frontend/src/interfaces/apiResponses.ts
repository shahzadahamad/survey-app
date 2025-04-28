import { UserData } from "./auth";

export interface BaseRes {
  message: string;
}

export interface LoginRes extends BaseRes {
  response: {
    token: string;
    userData: UserData;
  }
}

export interface RegisterRes extends BaseRes {
  response: UserData;
}