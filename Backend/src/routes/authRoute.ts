import { Router } from "express";
import { userController } from "../configs/container";

const router = Router();

router.post('/register', userController.create.bind(userController));

export default router;