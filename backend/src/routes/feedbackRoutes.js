import express from "express";
import { 
  submitFeedback, 
  getAllFeedbacks, 
  updateFeedbackStatus,
  getMyFeedbacks 
} from "../controllers/feedbackController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, submitFeedback);
router.get("/my", protect, getMyFeedbacks);
router.get("/", protect, authorize("admin"), getAllFeedbacks);
router.patch("/:id", protect, authorize("admin"), updateFeedbackStatus);

export default router;
