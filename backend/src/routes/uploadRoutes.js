import express from "express";
import multer from "multer";
import { uploadImage } from "../controllers/uploadController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.post("/", protect, authorize("admin"), upload.single("image"), uploadImage);

export default router;
