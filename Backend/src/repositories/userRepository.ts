import { IUser } from "../interfaces/models";
import { IUserRepository } from "../interfaces/repositories/IUserRepository";
import UserModel from "../models/userModel";
import { BaseRepository } from "./baseRepository";

export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email });
  }
}
