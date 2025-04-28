import { MESSAGES } from "../constants/messages";
import { HttpStatusCodes } from "../enums/httpStatusCodes";
import { IAdmin, IUser } from "../interfaces/models";
import { IAdminRepository } from "../interfaces/repositories/IAdminRepository";
import { IAdminService } from "../interfaces/services/IAdminService";
import { CustomError } from "../utils/customError";
import { generateToken } from "../utils/jwt";
import { comparePassword } from "../utils/passwordHasher";

export class AdminService implements IAdminService {
  private repository: IAdminRepository;

  constructor(repository: IAdminRepository) {
    this.repository = repository;
  }

  async login(adminData: Partial<IAdmin>): Promise<{ token: string, adminData: IAdmin }> {

    if (!adminData.email || !adminData.password) {
      throw CustomError.validationError(MESSAGES.ERROR.ALL_FIELDS_REQUIRED);
    }

    const adminExist = await this.repository.findByEmail(adminData.email);

    if (!adminExist) {
      throw new CustomError(MESSAGES.ERROR.ADMIN_NOT_FOUNT, HttpStatusCodes.NOT_FOUND)
    }

    const isValidPassword = await comparePassword(adminData.password, adminExist.password);

    if (!isValidPassword) {
      throw new CustomError(MESSAGES.ERROR.INVALID_CREDENTIALS, HttpStatusCodes.UNAUTHORIZED);
    }

    const accessToken = await generateToken({ userId: adminExist._id, role: 'admin' });

    const { password, ...userDataWithoutPassword } = adminExist.toObject();
    return { token: accessToken, adminData: userDataWithoutPassword };
  }

};