import { MESSAGES } from "../constants/messages";
import { HttpStatusCodes } from "../enums/httpStatusCodes";
import { IUserRepository } from "../interfaces/repositories/IUserRepository";
import { IUserService } from "../interfaces/services/IUserService";
import { IUser } from "../models/userModel";
import { CustomError } from "../utils/customError";
import { hashPassword } from "../utils/passwordHasher";

export class UserService implements IUserService {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async createUser(userData: Partial<IUser>): Promise<IUser> {

    if (!userData.email || !userData.password || !userData.fullname) {
      throw CustomError.validationError(MESSAGES.ERROR.ALL_FIELDS_REQUIRED);
    }

    const existingUser = await this.repository.findByEmail(userData.email);

    if (existingUser) {
      throw new CustomError(MESSAGES.ERROR.USER_EMAIL_ALREADY_IN_USE, HttpStatusCodes.CONFLICT)
    }

    const hashedPassword = await hashPassword(userData.password);
    userData.password = hashedPassword;

    const { password, ...userWithoutPassword } = (await this.repository.create(userData)).toObject();
    return userWithoutPassword;
  }
};
