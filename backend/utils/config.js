import dotenv from 'dotenv';

dotenv.config();
export const pattern = /(http[s]?:\/\/)(?:www)?[A-Za-zа-яА-яё0-9-._~:/?#[\]@!$&'()*+,;=]+\.\w{2,4}(?:\/[A-Za-zа-яА-яё0-9-._~:/?#[\]@!$&'()*+,;=]+)?(?:#$)?/;

export const NODE_ENV = process.env.NODE_ENV || 'dev';
export const PORT = NODE_ENV === 'production' ? parseInt(process.env.PORT, 10) : 4000;
export const DB_CONN = process.env.DB_CONN || 'mongodb://127.0.0.1:27017/mestodb';
export const JWT_SECRET = process.env.JWT_SECRET || 'super-strong-secret';
