import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom"; 
import { useAppContext } from "../../context/AppContext";
import { FiMail, FiShield, FiArrowRight, FiRefreshCw } from "react-icons/fi";

export const Signup = () => {
  const navigate = useNavigate();
  const { signup, verifyEmail, resendVerification } = useAppContext();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Verification State
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setIsSubmitting(true);
      await signup({
        firstName: formData.firstname,
        lastName: formData.lastname,
        email: formData.email,
        password: formData.password,
      });
      toast.success("Verification code sent to your email!");
      setIsVerifying(true);
    } catch (error) {
      toast.error(error.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleVerify(e) {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter 6-digit OTP");
      return;
    }

    try {
      setIsSubmitting(true);
      await verifyEmail({
        email: formData.email,
        otp: otp
      });
      toast.success("Email verified successfully! Welcome family!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Verification failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResend() {
    try {
      setIsResending(true);
      await resendVerification({ email: formData.email });
      toast.success("New code sent to your email");
    } catch (error) {
      toast.error(error.message || "Failed to resend code");
    } finally {
      setIsResending(false);
    }
  }

  if (isVerifying) {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-72px)] bg-slate-50 relative overflow-hidden px-4 py-12 pb-32 lg:pb-10">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50" />
            
            <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[2.5rem] p-8 sm:p-12 relative z-10 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-200">
                    <FiShield className="text-white text-4xl" />
                </div>
                
                <h1 className="text-3xl font-black text-slate-800 mb-2">Verify Email</h1>
                <p className="text-slate-500 font-medium mb-8">
                    We've sent a 6-digit code to <br/>
                    <span className="text-emerald-600 font-bold">{formData.email}</span>
                </p>

                <form onSubmit={handleVerify} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Enter OTP</label>
                        <input
                            required
                            type="text"
                            maxLength={6}
                            placeholder="000000"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                            className="w-full bg-slate-100/50 border-2 border-transparent p-5 rounded-2xl text-2xl font-black text-center tracking-[0.5em] focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-emerald-600 text-white py-5 rounded-2xl text-base font-black shadow-xl shadow-emerald-500/30 hover:bg-emerald-700 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? "Verifying..." : "Verify & Activate Account"}
                        <FiArrowRight />
                    </button>
                </form>

                <div className="mt-10 flex flex-col items-center gap-4">
                    <p className="text-sm font-medium text-slate-500">Didn't receive the code?</p>
                    <button 
                        onClick={handleResend}
                        disabled={isResending}
                        className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest hover:text-emerald-700 transition-colors disabled:opacity-50"
                    >
                        {isResending ? "Sending..." : "Resend New Code"}
                        <FiRefreshCw className={isResending ? "animate-spin" : ""} />
                    </button>
                </div>

                <button 
                    onClick={() => setIsVerifying(false)}
                    className="mt-8 text-slate-400 font-bold text-xs hover:text-slate-600 transition-colors"
                >
                    Back to Signup
                </button>
            </div>
        </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center min-h-[calc(100vh-72px)] bg-slate-50 relative overflow-hidden px-4 py-12 pb-32 lg:pb-10"
    >
      {/* Decorative Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50" />

      <div className="w-full max-w-xl bg-white/70 backdrop-blur-xl border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[2.5rem] p-8 sm:p-12 relative z-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 mb-2">
            Join the <span className="text-emerald-600">Family</span>
          </h1>
          <p className="text-slate-500 font-medium">Create an account and start shopping fresh.</p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={submitHandler}>
          {/* First + Last Name */}
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">First Name</label>
              <input
                required
                type="text"
                name="firstname"
                placeholder="John"
                onChange={changeHandler}
                value={formData.firstname}
                className="w-full bg-slate-100/50 border-2 border-transparent p-4 rounded-2xl text-[15px] font-medium focus:outline-none focus:bg-white focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
              />
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Last Name</label>
              <input
                required
                type="text"
                name="lastname"
                placeholder="Doe"
                onChange={changeHandler}
                value={formData.lastname}
                className="w-full bg-slate-100/50 border-2 border-transparent p-4 rounded-2xl text-[15px] font-medium focus:outline-none focus:bg-white focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Email Address</label>
            <input
              required
              type="email"
              name="email"
              placeholder="name@example.com"
              onChange={changeHandler}
              value={formData.email}
              className="w-full bg-slate-100/50 border-2 border-transparent p-4 rounded-2xl text-[15px] font-medium focus:outline-none focus:bg-white focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
            />
          </div>

          {/* Passwords */}
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Create Password</label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  onChange={changeHandler}
                  value={formData.password}
                  className="w-full bg-slate-100/50 border-2 border-transparent p-4 rounded-2xl text-[15px] font-medium focus:outline-none focus:bg-white focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
                />
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer p-1 text-slate-400 hover:text-emerald-600 transition-colors"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Confirm Password</label>
              <div className="relative">
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  onChange={changeHandler}
                  value={formData.confirmPassword}
                  className="w-full bg-slate-100/50 border-2 border-transparent p-4 rounded-2xl text-[15px] font-medium focus:outline-none focus:bg-white focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
                />
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer p-1 text-slate-400 hover:text-emerald-600 transition-colors"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 text-white py-4 rounded-2xl text-base font-black shadow-xl shadow-emerald-500/30 hover:bg-emerald-700 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-10 text-[15px] font-medium text-slate-500">
          Already have an account?{" "}
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
