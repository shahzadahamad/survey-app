import { IUser } from "../../models/userModel";

export interface IUserService {
  createUser(userData: Partial<IUser>): Promise<IUser>;
  login(userData: Partial<IUser>): Promise<{ token: string, userData: IUser }>;
}