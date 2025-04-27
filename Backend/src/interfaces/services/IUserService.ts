import { IUser } from "../../models/userModel";

export interface IUserService {
  createUser(userData: Partial<IUser>): Promise<IUser>;
}