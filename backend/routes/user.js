import express from 'express';
import {
  addUser, getUser, getAllUsers, updateUser, login, logout,
} from '../controllers/user.js';
import auth from '../middlewares/auth.js';
import {
  userValidatorAuth, userValidatorUpdate, userIdValidator, userAvatarValidator,
} from '../utils/validators.js';

const router = express.Router();
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
router.post('/signup', userValidatorAuth(), addUser);
router.post('/signin', userValidatorAuth(), login);
router.use(auth);
router.get('/logout', logout);
router.get('/users', getAllUsers);
router.get('/users/me', getUser);
router.get('/users/:userId', userIdValidator(), getUser);
router.patch('/users/me', userValidatorUpdate(), updateUser);
router.patch('/users/me/avatar', userAvatarValidator(), updateUser);

export default router;
