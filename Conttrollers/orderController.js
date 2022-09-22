const Order = require("../Models/orderSchema");
const { StatusCodes } = require("http-status-codes");
const Product = require("../Models/productShema");
const NotFound = require("../Errors/NotFound");
const BadRequest = require("../Errors/BadRequest");
const { json } = require("express");
const { checkPermisions } = require("../utils");
const fakeStripe = async ({ amount, currency }) => {
  const clientsecret = "someRandomValue";
  return { amount, clientsecret };
};
const createOrder = async (req, res) => {
  const { tax, shippingFee, items: cartItems } = req.body;
  if (!cartItems || cartItems.length < 1) {
    throw new BadRequest("Please provide cart Items");
  }
  if (!tax || !shippingFee) {
    throw new BadRequest("tax and shipping fee  is required");
  }
  let orderItems = [];
  let subTotal = 0;
  for (const item of cartItems) {
    const singleCartItem = await Product.findOne({ _id: item.product });
    if (!singleCartItem) {
      throw new NotFound(`no product with id: ${item.product}`);
    }
    const { name, price, image, _id } = singleCartItem;
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };
    orderItems = [...orderItems, singleOrderItem];
    subTotal += singleOrderItem.amount * singleOrderItem.price;
  }
  const total = tax + shippingFee + subTotal;
  const paymentIntent = await fakeStripe({ amount: total, currency: "usd" });
  const order = await Order.create({
    orderItems,
    total,
    subTotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.clientsecret,
    user: req.user.userId,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
};
const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};
const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFound(`no order with id:${orderId}`);
  }
  res.status(StatusCodes.OK).json({ order });
};
const getCurrentUserOrder = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};
const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { paymentIntentId } = req.body;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFound(`no order with id:${orderId}`);
  }
  checkPermisions(req.user, order.user);
  order.paymentIntentId = paymentIntentId;
  order.status = "paid";
  await order.save();
  res.status(StatusCodes.OK).json({ order });
};
module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrder,
  updateOrder,
};
