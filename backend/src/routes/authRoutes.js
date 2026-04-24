import express from "express";
import {
  getAllUsers,
  getCurrentUser,
  loginUser,
  registerUser,
  updateUserRole,
  updateProfile,
  subscribeUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerificationOTP,
} from "../controllers/authController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerificationOTP);
router.get("/me", protect, getCurrentUser);
router.patch("/profile-update", protect, updateProfile);
router.post("/subscribe", protect, subscribeUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/users", protect, authorize("admin"), getAllUsers);
router.patch("/users/:id/role", protect, authorize("admin"), updateUserRole);

export default router;

