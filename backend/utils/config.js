export const pattern = /(http[s]?:\/\/)(?:www)?[A-Za-zа-яА-яё0-9-._~:/?#[\]@!$&'()*+,;=]+\.\w{2,4}(?:\/[A-Za-zа-яА-яё0-9-._~:/?#[\]@!$&'()*+,;=]+)?(?:#$)?/;
export const { PORT = 4300, DB_CONN = 'mongodb://127.0.0.1:27017/mestodb', JWT_SECRET = 'jwt-strong-token' } = process.env;
