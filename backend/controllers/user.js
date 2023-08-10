import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/user.js';
import ValidationError from '../errors/validation-error.js';
import NotFoundError from '../errors/not-found-error.js';
import AlreadyExistError from '../errors/already-exist-error.js';

async function getAllUsers(req, res, next) {
  try {
    const users = await User.find({});
    res.status(200).send({ data: users });
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      next(new NotFoundError('Ничего не найдено'));
      return;
    }
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const id = req.params.userId || req.user._id;
    const user = await User.findById(id).orFail();
    res.status(200).send({ data: user });
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      next(new NotFoundError('Такого пользователя не существует'));
      return;
    }
    next(err);
  }
}

async function addUser(req, res, next) {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      about,
      avatar,
      password: hash,
      email,
    });
    const userData = newUser.toObject();
    delete userData.password;
    res.status(201).send({ data: userData });
  } catch (err) {
    if (
      err instanceof mongoose.Error.ValidationError
        || err instanceof mongoose.Error.CastError
    ) {
      next(new ValidationError(err));
      return;
    }
    if (err.code === 11000) {
      next(new AlreadyExistError('Пользователь с таким Email уже существует'));
      return;
    }
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
    res.cookie('jwt', token, {
      maxAge: 36000000,
      httpOnly: true,
    });
    res.status(200).send({ _id: user._id });
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const { name, about, avatar } = req.body;
    const id = req.user._id;
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: { name, about, avatar },
      },
      {
        returnOriginal: false,
        runValidators: true,
      },
    ).orFail();
    res.status(200).send({ data: user });
  } catch (err) {
    if (
      err instanceof mongoose.Error.ValidationError
        || err instanceof mongoose.Error.CastError
    ) {
      next(new ValidationError(err));
      return;
    }
    if (err instanceof mongoose.Error.NotFoundError) {
      next(new NotFoundError('Такого пользователя не существует'));
      return;
    }
    next(err);
  }
}

export {
  updateUser, addUser, getAllUsers, getUser, login,
};
