import express, { Application, ErrorRequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import authRouter from './routes/authRoute';
import userRouter from './routes/userRoute';
import surveyRouter from './routes/surveyRoute';
import { ROUTES } from './constants/routes';
import errorMiddleware from './middlewares/errorMiddleware';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({ origin: process.env.CORS_ORIGIN!, credentials: true }));


app.use(ROUTES.AUTH, authRouter);
app.use(ROUTES.USER, userRouter);
app.use(ROUTES.SURVEY, surveyRouter);
app.use(errorMiddleware as any);

export default app;