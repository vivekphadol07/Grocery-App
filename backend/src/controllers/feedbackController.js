import Feedback from "../models/Feedback.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// @desc    Submit Feedback/Complaint
// @route   POST /api/feedback
// @access  Private
export const submitFeedback = asyncHandler(async (req, res) => {
  const { fullName, email, phoneNo, address, subject, orderId, message } = req.body;

  if (!fullName || !email || !message) {
    res.status(400);
    throw new Error("Please fill required fields (Name, Email, Message)");
  }

  const feedback = await Feedback.create({
    user: req.user._id,
    fullName,
    email,
    phoneNo,
    address,
    subject,
    orderId,
    message,
  });

  res.status(201).json({
    success: true,
    message: "Feedback submitted successfully",
    feedback,
  });
});

// @desc    Get All Feedbacks (Admin only)
// @route   GET /api/feedback
// @access  Private/Admin
export const getAllFeedbacks = asyncHandler(async (req, res) => {
  const feedbacks = await Feedback.find({})
    .populate("user", "firstName lastName email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: feedbacks.length,
    feedbacks,
  });
});

// @desc    Update Feedback Status & Add Response (Admin only)
// @route   PATCH /api/feedback/:id
// @access  Private/Admin
export const updateFeedbackStatus = asyncHandler(async (req, res) => {
  const { status, adminResponse } = req.body;
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    res.status(404);
    throw new Error("Feedback not found");
  }

  if (status) feedback.status = status;
  if (adminResponse) {
    feedback.adminResponse = adminResponse;
    feedback.respondedAt = Date.now();
    feedback.status = "RESOLVED"; // Auto resolve if responded? Or keep it flexible.
  }

  await feedback.save();

  res.status(200).json({
    success: true,
    message: "Updated successfully",
    feedback,
  });
});

// @desc    Get My Feedbacks/Complaints
// @route   GET /api/feedback/my
// @access  Private
export const getMyFeedbacks = asyncHandler(async (req, res) => {
  const feedbacks = await Feedback.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: feedbacks.length,
    feedbacks,
  });
});
