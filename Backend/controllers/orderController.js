const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  const order = await Order.create({ ...req.body, userId: req.user.id });
  res.json(order);
};

exports.getUserOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
};

exports.getAllOrders = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: "Forbidden" });
  const orders = await Order.find();
  res.json(orders);
};
