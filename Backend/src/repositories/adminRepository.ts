import { IAdmin, IUser } from "../interfaces/models";
import { IAdminRepository } from "../interfaces/repositories/IAdminRepository";
import AdminModel from "../models/adminModal";
import { BaseRepository } from "./baseRepository";

export class AdminRepository extends BaseRepository<IAdmin> implements IAdminRepository {
  constructor() {
    super(AdminModel);
  }

  async findByEmail(email: string): Promise<IAdmin | null> {
    return await AdminModel.findOne({ email });
  }
}
