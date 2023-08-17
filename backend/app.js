import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { errors } from 'celebrate';
import router from './routes/index.js';
import errorHandler from './middlewares/error.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';

const app = express();
app.use(helmet());
app.use(cookieParser());
app.disable('x-powered-by');
app.use(cors({ origin: 'https://cardsplace.nomoreparties.co', credentials: true }));
app.use(bodyParser.json());
app.use(requestLogger);

app.use(router);
mongoose.connect(process.env.DB_CONN);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(parseInt(process.env.PORT, 10));
