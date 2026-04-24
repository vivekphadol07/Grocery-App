import mongoose from "mongoose";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Coupon from "../models/Coupon.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const computeDeliveryCharge = (subtotal) => (subtotal >= 499 ? 0 : 40);

export const createOrder = asyncHandler(async (req, res) => {
  const { items, deliveryAddress, paymentMethod = "COD", notes = "", couponCode = "" } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error("Please provide at least one item");
  }

  const productIds = items.map((item) => item.productId).filter(Boolean);
  if (productIds.some((id) => !mongoose.Types.ObjectId.isValid(id))) {
    res.status(400);
    throw new Error("One or more product ids are invalid");
  }
  const uniqueProductIds = [...new Set(productIds)];

  const products = await Product.find({ _id: { $in: uniqueProductIds }, isActive: true });
  const productMap = new Map(products.map((product) => [String(product._id), product]));

  let subtotal = 0;
  let itemCount = 0;
  const orderItems = [];

  for (const item of items) {
    const quantity = Number(item.quantity || 0);
    const product = productMap.get(String(item.productId));

    if (!product) {
      res.status(400);
      throw new Error(`Product not found: ${item.productId}`);
    }

    if (quantity < 1) {
      res.status(400);
      throw new Error(`Invalid quantity for ${product.name}`);
    }

    if (product.stock < quantity) {
      res.status(400);
      throw new Error(`Not enough stock for ${product.name}`);
    }

    itemCount += quantity;
    subtotal += product.price * quantity;
    orderItems.push({
      product: product._id,
      name: product.name,
      image: product.image,
      unit: product.unit,
      price: product.price,
      quantity,
    });
  }

  for (const orderItem of orderItems) {
    const product = productMap.get(String(orderItem.product));
    product.stock -= orderItem.quantity;
    await product.save();
  }

  const deliveryCharge = computeDeliveryCharge(subtotal);
  let discount = 0;

  if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
      if (coupon) {
          if (subtotal >= coupon.minOrderValue) {
              if (coupon.discountType === "PERCENTAGE") {
                  discount = (subtotal * coupon.discountValue) / 100;
              } else {
                  discount = coupon.discountValue;
              }
          }
      }
  }

  const totalPrice = Math.max(0, subtotal + deliveryCharge - discount);

  const fallbackAddress = {
    fullName: `${req.user.firstName} ${req.user.lastName}`.trim(),
    phone: deliveryAddress?.phone || "",
    addressLine: deliveryAddress?.addressLine || "",
    city: deliveryAddress?.city || "",
    state: deliveryAddress?.state || "",
    pincode: deliveryAddress?.pincode || "",
  };

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    itemCount,
    subtotal,
    deliveryCharge,
    discount,
    couponCode: couponCode ? couponCode.toUpperCase() : "",
    totalPrice,
    deliveryAddress: {
      ...fallbackAddress,
      ...(deliveryAddress || {}),
    },
    paymentMethod,
    status: "PLACED",
    notes,
  });

  const populatedOrder = await Order.findById(order._id).populate(
    "user",
    "firstName lastName email role"
  );

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    order: populatedOrder,
  });
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: orders.length,
    orders,
  });
});

export const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid order id");
  }

  const order = await Order.findById(id).populate("user", "firstName lastName email role");
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  const isOwner = String(order.user._id) === String(req.user._id);
  const isAdmin = req.user.role === "admin";

  if (!isOwner && !isAdmin) {
    res.status(403);
    throw new Error("You are not allowed to view this order");
  }

  res.status(200).json({
    success: true,
    order,
  });
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page || 1), 1);
  const limit = Math.max(Number(req.query.limit || 50), 1);
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.status) {
    filter.status = req.query.status;
  }

  const [orders, total] = await Promise.all([
    Order.find(filter)
      .populate("user", "firstName lastName email role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Order.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    orders,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, paymentStatus } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid order id");
  }

  const order = await Order.findById(id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  const validStatuses = ["PLACED", "CONFIRMED", "PACKED", "SHIPPED", "DELIVERED", "CANCELLED"];
  if (status && !validStatuses.includes(status)) {
    res.status(400);
    throw new Error(`Invalid status. Allowed: ${validStatuses.join(", ")}`);
  }

  const validPaymentStatuses = ["PENDING", "PAID", "FAILED"];
  if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
    res.status(400);
    throw new Error(`Invalid paymentStatus. Allowed: ${validPaymentStatuses.join(", ")}`);
  }

  if (status) order.status = status;
  if (paymentStatus) order.paymentStatus = paymentStatus;

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order updated",
    order,
  });
});

export const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid order id");
  }

  const order = await Order.findById(id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  for (const orderItem of order.orderItems) {
    const product = await Product.findById(orderItem.product);
    if (product) {
      product.stock += orderItem.quantity;
      await product.save();
    }
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
    message: "Order deleted and stock restored",
  });
});
export const cancelOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid order id");
  }

  const order = await Order.findById(id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Security check: Only the owner can cancel
  if (String(order.user) !== String(req.user._id)) {
    res.status(403);
    throw new Error("Not authorized to cancel this order");
  }

  // Check status
  const allowedForCancellation = ["PLACED", "CONFIRMED", "PACKED"];
  if (!allowedForCancellation.includes(order.status)) {
    res.status(400);
    throw new Error(`Cannot cancel order. Current status: ${order.status}`);
  }

  // Restore Stock
  for (const item of order.orderItems) {
    const product = await Product.findById(item.product);
    if (product) {
      product.stock += item.quantity;
      await product.save();
    }
  }

  order.status = "CANCELLED";
  await order.save();

  res.status(200).json({
    success: true,
    message: "Order cancelled successfully and stock restored",
    order,
  });
});
