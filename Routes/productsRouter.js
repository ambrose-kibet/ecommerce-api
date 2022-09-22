const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  authorizePermisions,
} = require("../Middleware/authMiddleware");
const {
  getAllProducts,
  getSingleProduct,
  updateProduct,
  createProduct,
  deleteProduct,
  uploadImage,
} = require("../Conttrollers/productController");
const { getSingleProductreview } = require("../Conttrollers/reviewController");
router
  .route("/")
  .get(getAllProducts)
  .post(authMiddleware, authorizePermisions("admin"), createProduct);
router
  .route("/uploadimage")
  .post(authMiddleware, authorizePermisions("admin"), uploadImage);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(authMiddleware, authorizePermisions("admin"), updateProduct)
  .delete(authMiddleware, authorizePermisions("admin"), deleteProduct);
router.route("/:id/reviews").get(getSingleProductreview);
module.exports = router;
