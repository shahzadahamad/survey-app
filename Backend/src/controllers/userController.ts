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
      const response = await this.userService.createUser(req.body);
      res.status(HttpStatusCodes.CREATED).json({ message: MESSAGES.SUCCESS.USER_CREATED, response });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this.userService.login(req.body);
      res.status(HttpStatusCodes.CREATED).json({ message: MESSAGES.SUCCESS.USER_LOGGED_IN, response });
    } catch (error) {
      next(error);
    }
  }

};