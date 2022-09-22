const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../Middleware/authMiddleware");
const {
  createReview,
  getAllRewiews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../Conttrollers/reviewController");
router.route("/").post(authMiddleware, createReview).get(getAllRewiews);
router
  .route("/:id")
  .get(getSingleReview)
  .patch(authMiddleware, updateReview)
  .delete(authMiddleware, deleteReview);
module.exports = router;
