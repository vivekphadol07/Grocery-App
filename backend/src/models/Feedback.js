import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNo: String,
    address: String,
    subject: {
      type: String,
      enum: ["General Inquiry", "Order Complaint", "Feedback", "Other"],
      default: "General Inquiry",
    },
    orderId: String,
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["NEW", "IN_PROGRESS", "RESOLVED"],
      default: "NEW",
    },
    adminResponse: String,
    respondedAt: Date,
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
