import mongoose from "mongoose";
import Product from "../models/Product.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const buildProductFilter = (query) => {
  const filter = { isActive: true };

  if (query.category) {
    filter.category = query.category;
  }

  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { category: { $regex: query.search, $options: "i" } },
    ];
  }

  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }

  if (query.inStock === "true") {
    filter.stock = { $gt: 0 };
  }

  return filter;
};

const buildSort = (sortBy = "createdAt", sortOrder = "desc") => {
  const allowed = ["createdAt", "price", "rating", "stock", "name"];
  const field = allowed.includes(sortBy) ? sortBy : "createdAt";
  const direction = sortOrder === "asc" ? 1 : -1;
  return { [field]: direction };
};

export const getProducts = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page || 1), 1);
  const limit = Math.max(Number(req.query.limit || 100), 1);
  const skip = (page - 1) * limit;

  const filter = buildProductFilter(req.query);
  const sort = buildSort(req.query.sortBy, req.query.sortOrder);

  const [products, total] = await Promise.all([
    Product.find(filter).sort(sort).skip(skip).limit(limit),
    Product.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    products,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid product id");
  }

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json({
    success: true,
    product,
  });
});

export const getProductCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct("category", { isActive: true });

  res.status(200).json({
    success: true,
    categories: categories.sort(),
  });
});

export const createProduct = asyncHandler(async (req, res) => {
  const { name, category, price, unit, image, stock, rating, description } = req.body;

  if (!name || !category || price === undefined || !unit || !image) {
    res.status(400);
    throw new Error("name, category, price, unit, and image are required");
  }

  const product = await Product.create({
    name: name.trim(),
    category: category.trim(),
    price: Number(price),
    unit: unit.trim(),
    image: image.trim(),
    stock: Number(stock || 0),
    rating: Number(rating || 0),
    description: description || "",
    createdBy: req.user?._id,
  });

  res.status(201).json({
    success: true,
    message: "Product created",
    product,
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid product id");
  }

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const updatableFields = [
    "name",
    "category",
    "price",
    "unit",
    "image",
    "stock",
    "rating",
    "description",
    "isActive",
  ];

  updatableFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      product[field] = req.body[field];
    }
  });

  await product.save();

  res.status(200).json({
    success: true,
    message: "Product updated",
    product,
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid product id");
  }

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted",
  });
});

