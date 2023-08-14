export const pattern = /(http[s]?:\/\/)(?:www)?[A-Za-zа-яА-яё0-9-._~:/?#[\]@!$&'()*+,;=]+\.\w{2,4}(?:\/[A-Za-zа-яА-яё0-9-._~:/?#[\]@!$&'()*+,;=]+)?(?:#$)?/;
export const { JWT_SECRET = "JWT_SECRET" , PORT = 4000, BASE_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
