import { Router } from "express";
import { surveyController } from "../configs/container";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post('/create', authMiddleware, surveyController.create.bind(surveyController));
router.get('/', authMiddleware, surveyController.listUserSurveys.bind(surveyController));
router.get('/all', authMiddleware, surveyController.listAllSurveys.bind(surveyController));

export default router;