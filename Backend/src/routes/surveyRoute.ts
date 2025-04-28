import { Router } from "express";
import { surveyController } from "../configs/container";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post('/create', authMiddleware, surveyController.create.bind(surveyController));

export default router;