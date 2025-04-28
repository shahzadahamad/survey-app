import { Router } from "express";
import { adminController, userController } from "../configs/container";

const router = Router();

router.post('/register', userController.create.bind(userController));
router.post('/login', userController.login.bind(userController));
router.post('/admin/login', adminController.login.bind(adminController))

export default router;