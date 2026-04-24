import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getDashboardStats = asyncHandler(async (req, res) => {
  const [userCount, productCount, orderCount, pendingOrders, lowStockProducts, revenueAgg] =
    await Promise.all([
      User.countDocuments({}),
      Product.countDocuments({ isActive: true }),
      Order.countDocuments({}),
      Order.countDocuments({ status: { $in: ["PLACED", "CONFIRMED", "PACKED", "SHIPPED"] } }),
      Product.find({ isActive: true, stock: { $lte: 20 } })
        .sort({ stock: 1 })
        .limit(10)
        .select("name stock category"),
      Order.aggregate([
        { $match: { status: { $ne: "CANCELLED" } } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$totalPrice" },
          },
        },
      ]),
    ]);

  res.status(200).json({
    success: true,
    stats: {
      userCount,
      productCount,
      orderCount,
      pendingOrders,
      totalRevenue: revenueAgg[0]?.totalRevenue || 0,
      lowStockProducts,
    },
  });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    users,
  });
});

