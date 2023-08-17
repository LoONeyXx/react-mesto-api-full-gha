import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { errors } from 'celebrate';
import router from './routes/index.js';
import errorHandler from './middlewares/error.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import { PORT, DB_CONN } from './utils/config.js';

const app = express();
dotenv.config();
app.use(helmet());
app.use(cookieParser());
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(cors({ origin: 'https://cardsplace.nomoreparties.co', credentials: true }));
app.use(requestLogger);
app.use(router);
mongoose.connect(DB_CONN);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(PORT);
});
