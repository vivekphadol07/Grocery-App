import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

export const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // input change handler
  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  // submit handler
  function submitHandler(event) {
    event.preventDefault();
    setIsLoggedIn(true);
    toast.success("Logged In Successfully");
    console.log("Login Data:", formData);
    navigate("/Grocery-App/");
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL}/loginBackground.jpg)`
      }}
    >
      <div className="w-full max-w-md bg-white bg-opacity-90 shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={changeHandler}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={changeHandler}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <span
              className="absolute right-3 top-[14px] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={22} className="text-gray-500" />
              ) : (
                <AiOutlineEye fontSize={22} className="text-gray-500" />
              )}
            </span>
          </div>

          {/* Forgot password */}
          <p className="text-sm text-right text-green-600 cursor-pointer hover:underline">
            Forgot Password?
          </p>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
          >
            Login
          </button>

        </form>

        {/* Create account */}
        <p className="text-center mt-6 text-gray-600">
          Create New Account?{" "}
          <Link to="/Grocery-App/signup">
            <span className="text-green-600 cursor-pointer hover:underline">
              Click here
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

