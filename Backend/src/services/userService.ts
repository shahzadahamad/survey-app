import { MESSAGES } from "../constants/messages";
import { HttpStatusCodes } from "../enums/httpStatusCodes";
import { IUserRepository } from "../interfaces/repositories/IUserRepository";
import { IUserService } from "../interfaces/services/IUserService";
import { IUser } from "../models/userModel";
import { CustomError } from "../utils/customError";
import { generateToken } from "../utils/jwt";
import { comparePassword, hashPassword } from "../utils/passwordHasher";

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

    const { password, ...userDataWithoutPassword } = (await this.repository.create(userData)).toObject();
    return userDataWithoutPassword;
  }

  async login(userData: Partial<IUser>): Promise<{ token: string, userData: IUser }> {

    if (!userData.email || !userData.password) {
      throw CustomError.validationError(MESSAGES.ERROR.ALL_FIELDS_REQUIRED);
    }

    const userExist = await this.repository.findByEmail(userData.email);

    if (!userExist) {
      throw new CustomError(MESSAGES.ERROR.USER_NOT_FOUND, HttpStatusCodes.NOT_FOUND)
    }

    const isValidPassword = await comparePassword(userData.password, userExist.password);

    if (!isValidPassword) {
      throw new CustomError(MESSAGES.ERROR.INVALID_CREDENTIALS, HttpStatusCodes.UNAUTHORIZED);
    }

    const accessToken = await generateToken({ userId: userExist._id, role: 'user' });

    const { password, ...userDataWithoutPassword } = userExist.toObject();
    return { token: accessToken, userData: userDataWithoutPassword };
  }

};
