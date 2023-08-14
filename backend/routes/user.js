import express from 'express';
import {
  addUser, getUser, getAllUsers, updateUser, login, logout,
} from '../controllers/user.js';
import auth from '../middlewares/auth.js';
import {
  userValidatorAuth, userValidatorUpdate, userIdValidator, userAvatarValidator,
} from '../utils/validators.js';

const router = express.Router();
router.post('/sign-up', userValidatorAuth(), addUser);
router.post('/sign-in', userValidatorAuth(), login);
router.use(auth);
router.get('/logout', logout);
router.get('/users', getAllUsers);
router.get('/users/me', getUser);
router.get('/users/:userId', userIdValidator(), getUser);
router.patch('/users/me', userValidatorUpdate(), updateUser);
router.patch('/users/me/avatar', userAvatarValidator(), updateUser);

export default router;
