import express from 'express';
import { idCardValidator, bodyCardValidator } from '../utils/validators.js';
import {
  getCards,
  addCard,
  deleteCard,
  addLike,
  removeLike,
} from '../controllers/cards.js';
import auth from '../middlewares/auth.js';

const router = express.Router();
router.use(auth);
router.get('/cards', getCards);
router.post('/cards', bodyCardValidator(), addCard);
router.delete('/cards/:cardId', idCardValidator(), deleteCard);
router.put('/cards/:cardId/likes', idCardValidator(), addLike);
router.delete('/cards/:cardId/likes', idCardValidator(), removeLike);

export default router;
