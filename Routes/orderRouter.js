const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrder,
  updateOrder,
} = require("../Conttrollers/orderController");
const {
  authMiddleware,
  authorizePermisions,
} = require("../Middleware/authMiddleware");
router
  .route("/")
  .post(authMiddleware, createOrder)
  .get(authMiddleware, authorizePermisions("admin"), getAllOrders);
router.route("/showAllMyOrders").get(authMiddleware, getCurrentUserOrder);
router
  .route("/:id")
  .get(authMiddleware, getSingleOrder)
  .patch(authMiddleware, updateOrder);
module.exports = router;
