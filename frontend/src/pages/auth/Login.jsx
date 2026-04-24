import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await login(formData);
      toast.success("Logged In Successfully");
      if (response.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-[calc(100vh-72px)] bg-slate-50 relative overflow-hidden px-4 pb-32 lg:pb-10"
    >
      {/* Decorative Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50" />

      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[2.5rem] p-8 sm:p-12 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 mb-2">
            Welcome <span className="text-emerald-600">Back</span>
          </h1>
          <p className="text-slate-500 font-medium">Freshness is just a login away.</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={submitHandler}>
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              required
              value={formData.email}
              onChange={changeHandler}
              className="w-full bg-slate-100/50 border-2 border-transparent p-4 rounded-2xl text-[15px] font-medium focus:outline-none focus:bg-white focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Password</label>
              <Link to="/forgot-password">
                <p className="text-xs font-bold text-emerald-600 cursor-pointer hover:underline underline-offset-4">
                  Forgot?
                </p>
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={changeHandler}
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

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 text-white py-4 rounded-2xl text-base font-black shadow-xl shadow-emerald-500/30 hover:bg-emerald-700 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {isSubmitting ? "Logging in..." : "Sign In"}
          </button>
        </form>

        {/* Create account */}
        <p className="text-center mt-10 text-[15px] font-medium text-slate-500">
          New here?{" "}
          <Link to="/signup">
            <span className="text-emerald-600 cursor-pointer hover:underline underline-offset-4 font-bold">
              Join the Farm
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};
