import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateToken } from "../utils/generateToken.js";
import mongoose from "mongoose";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please provide firstName, lastName, email, and password");
  }

  const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists with this email");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes for signup verification

  const user = await User.create({
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.toLowerCase().trim(),
    password,
    role: "user",
    isVerified: false,
    verificationOTP: otp,
    verificationOTPExpires: otpExpires,
  });

  try {
    await sendEmail({
      email: user.email,
      subject: "Verify Your Email - FarmDirect",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e1e1e1; padding: 20px; border-radius: 10px;">
          <h2 style="color: #10b981; text-align: center;">Welcome to FarmDirect!</h2>
          <p>Hello <strong>${user.firstName}</strong>,</p>
          <p>Thank you for signing up. Please use the 6-digit OTP below to verify your email address and activate your account:</p>
          <div style="background-color: #f0fdf4; border: 2px dashed #10b981; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #059669; margin: 20px 0;">
            ${otp}
          </div>
          <p style="color: #64748b; font-size: 14px;">This OTP is valid for 10 minutes.</p>
          <p>If you did not create an account, please ignore this email.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #94a3b8; text-align: center;">FarmDirect Team</p>
        </div>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Verification OTP sent to email",
      email: user.email,
    });
  } catch (error) {
    // If email fails, we still created the user but they can resend later
    res.status(201).json({
      success: true,
      message: "Account created but failed to send verification email. Please request a new OTP.",
      email: user.email,
    });
  }
});

// @desc    Verify Email with OTP
// @route   POST /api/auth/verify-email
// @access  Public
export const verifyEmail = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    res.status(400);
    throw new Error("Please provide email and OTP");
  }

  const user = await User.findOne({
    email: email.toLowerCase().trim(),
    verificationOTP: otp,
    verificationOTPExpires: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired OTP");
  }

  user.isVerified = true;
  user.verificationOTP = undefined;
  user.verificationOTPExpires = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Email verified successfully",
    token: generateToken(user._id),
    user: user.toJSON(),
  });
});

// @desc    Resend Verification OTP
// @route   POST /api/auth/resend-verification
// @access  Public
export const resendVerificationOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Please provide an email address");
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });

  if (!user) {
    res.status(404);
    throw new Error("No user found with that email");
  }

  if (user.isVerified) {
    res.status(400);
    throw new Error("Account is already verified");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.verificationOTP = otp;
  user.verificationOTPExpires = Date.now() + 10 * 60 * 1000;
  await user.save();

  try {
    await sendEmail({
      email: user.email,
      subject: "Your New Verification Code - FarmDirect",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e1e1e1; padding: 20px; border-radius: 10px;">
          <h2 style="color: #10b981; text-align: center;">Email Verification</h2>
          <p>Hello <strong>${user.firstName}</strong>,</p>
          <p>You requested a new verification code. Please use the OTP below:</p>
          <div style="background-color: #f0fdf4; border: 2px dashed #10b981; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #059669; margin: 20px 0;">
            ${otp}
          </div>
          <p style="color: #64748b; font-size: 14px;">This OTP is valid for 10 minutes.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #94a3b8; text-align: center;">FarmDirect Team</p>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "New OTP sent to email",
    });
  } catch (error) {
    res.status(500);
    throw new Error("Email could not be sent");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await user.matchPassword(password);
  if (!isPasswordValid) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  if (!user.isVerified) {
    res.status(403).json({
      success: false,
      message: "Please verify your email to login",
      isVerified: false,
      email: user.email,
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Login successful",
    token: generateToken(user._id),
    user: user.toJSON(),
  });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password").sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid user id");
  }

  if (!["user", "admin"].includes(role)) {
    res.status(400);
    throw new Error("Role must be either user or admin");
  }

  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.role = role;
  await user.save();

  res.status(200).json({
    success: true,
    message: "User role updated",
    user: user.toJSON(),
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, addresses } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (firstName) user.firstName = firstName.trim();
  if (lastName) user.lastName = lastName.trim();
  if (phone !== undefined) user.phone = phone.trim();
  if (addresses) user.addresses = addresses;

  const updatedUser = await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: updatedUser.toJSON(),
  });
});

export const subscribeUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.isSubscribed = true;
  const updatedUser = await user.save();

  res.status(200).json({
    success: true,
    message: "Successfully subscribed to Grocery Pass",
    user: updatedUser.toJSON(),
  });
});

// @desc    Forgot password - Send OTP to email
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Please provide an email address");
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });

  if (!user) {
    res.status(404);
    throw new Error("No user found with that email");
  }

  // Generate 6 digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Set OTP and Expiry (1 minute as requested)
  user.resetPasswordOTP = otp;
  user.resetPasswordExpires = Date.now() + 1 * 60 * 1000; // 1 minute
  await user.save();

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. 
  Your OTP for password reset is: ${otp}
  This OTP is valid for only 1 minute.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset OTP",
      message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e1e1e1; padding: 20px; border-radius: 10px;">
          <h2 style="color: #10b981; text-align: center;">Reset Your Password</h2>
          <p>Hello <strong>${user.firstName}</strong>,</p>
          <p>You requested a password reset. Please use the 6-digit OTP below to reset your password:</p>
          <div style="background-color: #f0fdf4; border: 2px dashed #10b981; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #059669; margin: 20px 0;">
            ${otp}
          </div>
          <p style="color: #ef4444; font-weight: bold;">Important: This OTP will expire in 1 minute.</p>
          <p>If you did not request this, please ignore this email.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #94a3b8; text-align: center;">FreshGo Team</p>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent to email",
    });
  } catch (error) {
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(500);
    throw new Error("Email could not be sent");
  }
});

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    res.status(400);
    throw new Error("Please provide email, otp and new password");
  }

  const user = await User.findOne({
    email: email.toLowerCase().trim(),
    resetPasswordOTP: otp,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired OTP");
  }

  // Set new password
  user.password = newPassword;
  user.resetPasswordOTP = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successful. You can now login with your new password.",
  });
});
