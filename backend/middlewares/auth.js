import jwt from 'jsonwebtoken';
import AuthError from '../errors/auth-error.js';

export default async function auth(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      next(new AuthError('Отсутствует токен'));
    }
    const payload = jwt.verify(token, 'super-strong-secret');
    req.user = payload;
    next();
  } catch (err) {
    next(new AuthError('Неудачная авторизация'));
  }
}
