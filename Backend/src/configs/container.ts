import { AdminController } from "../controllers/adminController";
import { UserController } from "../controllers/userController";
import { AdminRepository } from "../repositories/adminRepository";
import { UserRepository } from "../repositories/userRepository";
import { AdminService } from "../services/adminService";
import { UserService } from "../services/userService";

const userRepository = new UserRepository();
const adminRepository = new AdminRepository();

const userService = new UserService(userRepository);
const adminService = new AdminService(adminRepository);

const userController = new UserController(userService);
const adminController = new AdminController(adminService);

export { userController, adminController };