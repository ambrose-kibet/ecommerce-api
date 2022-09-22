const Review = require("../Models/reviewShema");
const { StatusCodes } = require("http-status-codes");
const Product = require("../Models/productShema");
const NotFound = require("../Errors/NotFound");
const BadRequest = require("../Errors/BadRequest");
const { findOneAndUpdate, findOneAndDelete } = require("../Models/reviewShema");
const checkPermisions = require("../utils/checkPermissions");

const createReview = async (req, res) => {
  const { product: productId } = req.body;
  req.body.user = req.user.userId;
  const isValid = await Product.findOne({ _id: productId });
  if (!isValid) {
    throw new NotFound(`No product with id :${productId}`);
  }
  const alreadySubmited = await Review.findOne({
    user: req.user.userId,
    product: productId,
  });
  if (alreadySubmited) {
    throw new BadRequest("user already submitted review for this product");
  }
  const review = await Review.create(req.body);

  res.status(StatusCodes.CREATED).json({ review });
};

const getAllRewiews = async (req, res) => {
  const allreviews = await Review.find({}).populate({
    path: "user",
    select: "name",
  });
  // add pagination
  res.status(StatusCodes.OK).json({ allreviews, count: allreviews.length });
};
const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId }).populate({
    path: "user",
    select: "name",
  });
  if (!review) {
    throw new NotFound(`No review with id :${reviewId}`);
  }
  res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
  const {
    params: { id: reviewId },
    body: { rating, title, comment },
  } = req;

  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new NotFound(`No review with id :${reviewId}`);
  }
  review.rating = rating;
  review.title = title;
  review.comment = comment;
  await review.save();
  res.status(StatusCodes.OK).json({ review });
};

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new NotFound(`No review with id :${reviewId}`);
  }
  checkPermisions(req.user, review.user);
  await review.remove();
  res.status(StatusCodes.OK).json({ msg: "review deleted successfully" });
};
const getSingleProductreview = async (req, res) => {
  const { id: productId } = req.params;
  const reviews = await Review.find({ product: productId });
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};
module.exports = {
  createReview,
  getAllRewiews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductreview,
};
