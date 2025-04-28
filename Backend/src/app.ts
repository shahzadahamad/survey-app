import express, { Application, ErrorRequestHandler } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRouter from './routes/authRoute';
import surveyRouter from './routes/surveyRoute';
import { ROUTES } from './constants/routes';
import errorMiddleware from './middlewares/errorMiddleware';
import connectDatabase from './configs/database';

connectDatabase();

const app: Application = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: process.env.CORS_ORIGIN!, credentials: true }));

app.use(ROUTES.AUTH, authRouter);
app.use(ROUTES.SURVEY, surveyRouter);

app.use(errorMiddleware);

export default app;