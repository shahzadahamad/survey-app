import { NextFunction, Request, Response } from "express";
import { HttpStatusCodes } from "../enums/httpStatusCodes";
import { MESSAGES } from "../constants/messages";
import { IAdminController } from "../interfaces/controllers/IAdminController";
import { IAdminService } from "../interfaces/services/IAdminService";

export class AdminController implements IAdminController {
  private adminService: IAdminService;

  constructor(adminService: IAdminService) {
    this.adminService = adminService;
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this.adminService.login(req.body);
      res.status(HttpStatusCodes.CREATED).json({ message: MESSAGES.SUCCESS.ADMIN_LOGGED_IN, response });
    } catch (error) {
      next(error);
    }
  }

};