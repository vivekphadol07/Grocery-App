import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../services/api";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await authApi.forgotPassword({ email: formData.email });
      toast.success("OTP sent to your email!");
      setStep(2);
      setTimeLeft(60); // 1 minute countdown
    } catch (error) {
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (timeLeft <= 0) {
        return toast.error("OTP has expired. Please request a new one.");
    }

    try {
      setIsSubmitting(true);
      await authApi.resetPassword({
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      });
      toast.success("Password reset successful! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Failed to reset password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-72px)] bg-slate-50 relative overflow-hidden px-4">
      {/* Decorative Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50" />

      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[2.5rem] p-8 sm:p-12 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-800 mb-2">
            Reset <span className="text-emerald-600">Password</span>
          </h1>
          <p className="text-slate-500 font-medium">
            {step === 1 
              ? "Enter your email to receive a 1-minute OTP." 
              : "Check your email for the 6-digit OTP."}
          </p>
        </div>

        {step === 1 ? (
          <form className="flex flex-col gap-5" onSubmit={handleSendOTP}>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-100/50 border-2 border-transparent p-4 rounded-2xl text-[15px] font-medium focus:outline-none focus:bg-white focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl text-base font-black shadow-xl shadow-emerald-500/30 hover:bg-emerald-700 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-70 mt-2"
            >
              {isSubmitting ? "Sending OTP..." : "Send Reset OTP"}
            </button>
          </form>
        ) : (
          <form className="flex flex-col gap-5" onSubmit={handleResetPassword}>
             <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Verification OTP</label>
                <span className={`text-xs font-black ${timeLeft > 10 ? 'text-emerald-600' : 'text-rose-500'} animate-pulse`}>
                  {timeLeft > 0 ? `${timeLeft}s left` : 'Expired'}
                </span>
              </div>
              <input
                type="text"
                name="otp"
                placeholder="6-digit OTP"
                maxLength="6"
                required
                value={formData.otp}
                onChange={handleChange}
                className="w-full bg-slate-100/50 border-2 border-transparent p-4 rounded-2xl text-[15px] font-black tracking-[0.5em] text-center focus:outline-none focus:bg-white focus:border-emerald-500/30 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="••••••••"
                  required
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full bg-slate-100/50 border-2 border-transparent p-4 rounded-2xl text-[15px] font-medium focus:outline-none focus:bg-white focus:border-emerald-500/30 transition-all"
                />
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-emerald-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-slate-100/50 border-2 border-transparent p-4 rounded-2xl text-[15px] font-medium focus:outline-none focus:bg-white focus:border-emerald-500/30 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || timeLeft <= 0}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl text-base font-black shadow-xl shadow-emerald-500/30 hover:bg-emerald-700 hover:-translate-y-1 transition-all disabled:opacity-50 mt-2"
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>
            
            <button 
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
            >
                Resend OTP?
            </button>
          </form>
        )}

        <p className="text-center mt-8 text-[15px] font-medium text-slate-500">
          Remembered your password?{" "}
          <Link to="/login">
            <span className="text-emerald-600 cursor-pointer hover:underline underline-offset-4 font-bold">
              Sign In
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};
