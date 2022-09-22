const mongoose = require("mongoose");
const singleOrderItem = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "product",
    required: true,
  },
});
const orderSchema = new mongoose.Schema(
  {
    tax: {
      type: Number,
      required: [true, "Tax value is required"],
    },
    shippingFee: {
      type: Number,
      required: [true, "shipping fee value is required"],
    },
    subTotal: {
      type: Number,
      required: [true, "Sub total value is required"],
    },
    total: {
      type: Number,
      required: [true, "Total value is required"],
    },
    orderItems: [singleOrderItem],
    status: {
      type: String,
      enum: ["pending", "delivered", "failed", "cancelled", "paid"],
      default: "pending",
      required: [true, "status value is required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "Tax value is required"],
    },
    clientSecret: {
      type: String,
      required: [true, " Client secret value is required"],
    },
    paymentIntentId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
