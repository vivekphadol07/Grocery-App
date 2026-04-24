import express from "express";
import { createCoupon, getCoupons, validateCoupon, toggleCouponState, getPublicCoupons } from "../controllers/couponController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/public", protect, getPublicCoupons);
router.post("/validate", protect, validateCoupon);
router.post("/", protect, authorize("admin"), createCoupon);
router.get("/", protect, authorize("admin"), getCoupons);
router.patch("/:id/toggle", protect, authorize("admin"), toggleCouponState);

export default router;
