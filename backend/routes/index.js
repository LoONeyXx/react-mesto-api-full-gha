import express from 'express';
import rateLimit from 'express-rate-limit';
import userRouter from './user.js';
import cardsRouter from './cards.js';
import NotFoundError from '../errors/not-found-error.js';

const router = express.Router();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, //
  standardHeaders: true,
  legacyHeaders: false,
});
router.use(limiter);
router.use(userRouter);
router.use(cardsRouter);
router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});
router.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});
export default router;
