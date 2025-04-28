import { AdminController } from "../controllers/adminController";
import { SurveyController } from "../controllers/surveyController";
import { UserController } from "../controllers/userController";
import { AdminRepository } from "../repositories/adminRepository";
import { SurveyRepository } from "../repositories/surveyRepository";
import { UserRepository } from "../repositories/userRepository";
import { AdminService } from "../services/adminService";
import { SurveyService } from "../services/surveyService";
import { UserService } from "../services/userService";

const userRepository = new UserRepository();
const adminRepository = new AdminRepository();
const surveyRepository = new SurveyRepository();

const userService = new UserService(userRepository);
const adminService = new AdminService(adminRepository);
const surveyService = new SurveyService(surveyRepository);

const userController = new UserController(userService);
const adminController = new AdminController(adminService);
const surveyController = new SurveyController(surveyService);

export { userController, adminController, surveyController };