import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay Order
// @route   POST /api/payments/create-order
// @access  Private
export const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { amount, currency = "INR" } = req.body;

  if (!amount) {
    res.status(400);
    throw new Error("Amount is required");
  }

  const options = {
    amount: Math.round(amount * 100), // Razorpay expects amount in paise
    currency,
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500);
    throw new Error("Failed to create Razorpay order");
  }
});

// @desc    Verify Razorpay Payment
// @route   POST /api/payments/verify
// @access  Private
export const verifyPayment = asyncHandler(async (req, res) => {
  const { 
    razorpay_order_id, 
    razorpay_payment_id, 
    razorpay_signature,
    order_id // Our DB Order ID
  } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

  if (razorpay_signature === expectedSign) {
    // Payment verified
    const order = await Order.findById(order_id);
    if (order) {
      order.paymentStatus = "PAID";
      order.razorpayOrderId = razorpay_order_id;
      order.razorpayPaymentId = razorpay_payment_id;
      order.razorpaySignature = razorpay_signature;
      await order.save();

      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } else {
    res.status(400);
    throw new Error("Invalid payment signature");
  }
});
