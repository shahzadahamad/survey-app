import { UserController } from "../controllers/userController";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userService";

const userRepository = new UserRepository();

const userService = new UserService(userRepository);

const userController = new UserController(userService);

export { userController };