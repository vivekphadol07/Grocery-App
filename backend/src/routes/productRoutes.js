import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductCategories,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/categories", getProductCategories);
router.get("/:id", getProductById);
router.post("/", protect, authorize("admin"), createProduct);
router.put("/:id", protect, authorize("admin"), updateProduct);
router.delete("/:id", protect, authorize("admin"), deleteProduct);

export default router;

