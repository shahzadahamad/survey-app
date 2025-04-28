import { IAdmin } from "../models";

export interface IAdminService {
  login(adminData: Partial<IAdmin>): Promise<{ token: string, adminData: IAdmin }>;
}