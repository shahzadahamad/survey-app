import { Router } from "express";
import { userController } from "../configs/container";

const router = Router();

router.post('/register', userController.create.bind(userController));
router.post('/login', userController.login.bind(userController));

export default router;