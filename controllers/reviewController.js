const newError = require("../utils/createError");
const Review = require("../models/review");

const create = async (req, res, next) => {
  if (req.isSeller) {
    return next(newError("Sellers are not allowed to post review", 403));
  }
  try {
    const review = await Review.findOne({
      userId: req.id,
      gigId: req.body.gigId,
    });
    if (review) {
      return next(
        newError("You have already created a review for this gig", 403)
      );
    }
    const newReview = await Review.create({
      ...req.body,
      userId: req.id,
    });
    return res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  const reviews = await Review.find({
    gigId: req.params.gigId,
  });
  res.status(200).json(reviews);
  try {
  } catch (error) {
    next(error);
  }
};
const deleteReview = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  get,
  deleteReview,
};
