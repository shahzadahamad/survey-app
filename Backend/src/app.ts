import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import surveyRouter from './routes/survey';
import { ROUTES } from './constants/route';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({ origin: process.env.CORS_ORIGIN!, credentials: true }));

app.use(ROUTES.AUTH, authRouter);
app.use(ROUTES.USER, userRouter);
app.use(ROUTES.SURVEY, surveyRouter);

export default app;