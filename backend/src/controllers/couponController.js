import Coupon from "../models/Coupon.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createCoupon = asyncHandler(async (req, res) => {
  const { code, discountType, discountValue, minOrderValue, description } = req.body;

  if (!code || discountValue === undefined) {
    res.status(400);
    throw new Error("Please provide coupon code and discount value.");
  }

  const existing = await Coupon.findOne({ code: code.toUpperCase() });
  if (existing) {
    res.status(400);
    throw new Error("Coupon already exists");
  }

  const coupon = await Coupon.create({
    code: code.toUpperCase(),
    discountType: discountType || "PERCENTAGE",
    discountValue: Number(discountValue),
    minOrderValue: Number(minOrderValue || 0),
    description: description || "",
  });

  res.status(201).json({
    success: true,
    coupon,
  });
});

export const getCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find({}).sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    coupons,
  });
});

export const validateCoupon = asyncHandler(async (req, res) => {
  const { code, subtotal } = req.body;

  if (!code || subtotal === undefined) {
    res.status(400);
    throw new Error("Please provide code and subtotal");
  }

  const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
  if (!coupon) {
    res.status(404);
    throw new Error("Invalid or expired coupon");
  }

  if (Number(subtotal) < coupon.minOrderValue) {
    res.status(400);
    throw new Error(`Minimum order value of ₹${coupon.minOrderValue} required for this coupon`);
  }

  let discount = 0;
  if (coupon.discountType === "PERCENTAGE") {
    discount = (Number(subtotal) * coupon.discountValue) / 100;
  } else {
    discount = coupon.discountValue;
  }

  res.status(200).json({
    success: true,
    discount,
    coupon,
  });
});

export const toggleCouponState = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
        res.status(404);
        throw new Error("Coupon not found");
    }
    coupon.isActive = !coupon.isActive;
    await coupon.save();
    
    res.status(200).json({
        success: true,
        coupon
    });
});

export const getPublicCoupons = asyncHandler(async (req, res) => {
    const coupons = await Coupon.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        coupons
    });
});
