import { IUser } from "../models";

export interface IUserRepository {
  create(userData: Partial<IUser>): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>
}