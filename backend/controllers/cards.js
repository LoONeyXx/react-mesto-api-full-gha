import mongoose from 'mongoose';
import Card from '../models/card.js';
import AccessError from '../errors/access-error.js';
import ValidationError from '../errors/validation-error.js';
import NotFoundError from '../errors/not-found-error.js';

async function getCards(req, res, next) {
  try {
    const cards = await Card.find({});
    res.status(200).send({ data: cards });
  } catch (err) {
    next(err);
  }
}

async function addCard(req, res, next) {
  try {
    const { name, link } = req.body;
    const newCard = await Card.create({ name, link, owner: req.user._id });
    res.status(201).send({ data: newCard });
  } catch (err) {
    if (
      err instanceof mongoose.Error.ValidationError
          || err instanceof mongoose.Error.CastError
    ) {
      next(new ValidationError(err));
      return;
    }
    next(err);
  }
}

async function deleteCard(req, res, next) {
  try {
    const { cardId } = req.params;
    const userId = req.user._id;
    const card = await Card.findById({ _id: cardId }).orFail();
    if (card.owner.toString() === userId) {
      const data = await Card.deleteOne({ _id: cardId });
      res.status(200).send({ data });
    }
    throw new AccessError('У вас нет прав на удаление чужих карточек');
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      next(new NotFoundError('Такой карточки не существует'));
      return;
    }
    next(err);
  }
}

async function addLike(req, res, next) {
  try {
    const userId = req.user._id;
    const id = req.params.cardId;
    const newLikes = await Card.findByIdAndUpdate(
      id,
      { $addToSet: { likes: userId } },
      { new: true },
    ).orFail();
    res.status(200).send({ data: newLikes });
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      next(new NotFoundError('Такой карточки не существует'));
      return;
    }
    next(err);
  }
}

async function removeLike(req, res, next) {
  try {
    const userId = req.user._id;
    const id = req.params.cardId;
    const newLikes = await Card.findByIdAndUpdate(
      id,
      {
        $pull: { likes: userId },
      },
      { new: true },
    ).orFail();
    res.status(200).send({ data: newLikes });
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      next(new NotFoundError('Такой карточки не существует'));
      return;
    }
    next(err);
  }
}

export {
  getCards, addCard, deleteCard, addLike, removeLike,
};
