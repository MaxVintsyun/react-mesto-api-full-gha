const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

function throwCardError(err) {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return new BadRequestError('Переданы некорректные данные');
  }
  return err;
}

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(throwCardError(err)));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => next(throwCardError(err)));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не являетесь владельцем карточки');
      }
      return Card.findByIdAndRemove(req.params.cardId);
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => next(throwCardError(err)));
};

module.exports.putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => res.send(card))
    .catch((err) => next(throwCardError(err)));
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => res.send(card))
    .catch((err) => next(throwCardError(err)));
};
