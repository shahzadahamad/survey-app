import { NextFunction, Request, response, Response } from "express";
import { IUserController } from "../interfaces/controllers/IUserController";
import { IUserService } from "../interfaces/services/IUserService";
import { HttpStatusCodes } from "../enums/httpStatusCodes";
import { MESSAGES } from "../constants/messages";

export class UserController implements IUserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData = await this.userService.createUser(req.body);
      res.status(HttpStatusCodes.CREATED).json({ message: MESSAGES.SUCCESS.USER_CREATED, response: userData });
    } catch (error) {
      next(error);
    }
  }
};