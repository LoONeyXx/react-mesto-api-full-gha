import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import AuthError from '../errors/auth-error.js';
import { pattern } from '../utils/config.js';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: "Некорректный URL поля 'email' ",
      },
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      minlength: [2, "Минимальная длина поля 'name' - 2"],
      maxlength: [30, "Максимальная длина поля 'name' - 30"],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: [2, "Минимальная длина поля 'about' - 2"],
      maxlength: [30, "Максимальная длина поля 'about' - 30"],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      validate: {
        validator: (v) => pattern.test(v),
        message: "Некорректный URL поля 'avatar' ",
      },
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
  },
  { versionKey: false },
);
// userSchema.plugin(uniqueValidator);
userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new AuthError('Неверный Email');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    return user;
  }
  throw new AuthError('Неправильный пароль');
};
const model = mongoose.model('user', userSchema);
model.createIndexes();
export default model;
