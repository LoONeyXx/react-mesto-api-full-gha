import { celebrate, Joi } from 'celebrate';
import { pattern } from './config.js';

export const idCardValidator = () => celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().alphanum().length(24),
  }),
});

export const bodyCardValidator = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().regex(pattern).required(),
  }),
});

export const userValidatorAuth = () => celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    avatar: Joi.string().regex(pattern).min(8),
    name: Joi.string().max(30).min(2),
    about: Joi.string().max(30).min(2),
  }),
});

export const userValidatorUpdate = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().max(30).min(2),
    about: Joi.string().max(30).min(2),
  }),
});

export const userAvatarValidator = () => celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(pattern).min(8),
  }),
});

export const userIdValidator = () => celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().alphanum().length(24),
  }),
});
