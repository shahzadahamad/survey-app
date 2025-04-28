import { IAdmin, IUser } from "../models";

export interface IAdminRepository {
  findByEmail(email: string): Promise<IAdmin | null>
}