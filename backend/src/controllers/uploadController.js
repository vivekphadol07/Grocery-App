import { asyncHandler } from "../utils/asyncHandler.js";
import cloudinary from "../config/cloudinary.js";

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  // Upload to Cloudinary using stream
  const uploadStream = cloudinary.uploader.upload_stream(
    {
      folder: "grocery_app_products",
    },
    (error, result) => {
      if (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({ success: false, message: "Upload failed" });
      }
      res.status(200).json({
        success: true,
        imageUrl: result.secure_url,
      });
    }
  );

  uploadStream.end(req.file.buffer);
});
