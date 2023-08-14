import dotaenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { errors } from 'celebrate';
import router from './routes/index.js';
import errorHandler from './middlewares/error.js';

dotaenv.config();
const PORT = process.env.PORT || 4500;
const BASE_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/mestodb';
const app = express();
app.use(helmet());
app.use(cookieParser());
app.disable('x-powered-by');
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(router);
mongoose.connect(BASE_URL);
app.use(errors());
app.use(errorHandler);
app.listen(PORT)
