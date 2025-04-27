import { IUser } from "../models";

export interface IUserService {
  createUser(userData: Partial<IUser>): Promise<IUser>;
  login(userData: Partial<IUser>): Promise<{ token: string, userData: IUser }>;
}