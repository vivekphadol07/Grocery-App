import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom"; 

export const Signup = ({setIsLoggedIn}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // handle input change
  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  // handle submit
  function submitHandler(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsLoggedIn(true);
    toast.success("Account Created Successfully");

    console.log("Account Data:", formData);

    navigate("/");
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-50"
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL}/loginBackground.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-md bg-white/90 shadow-lg rounded-xl p-8 backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

        <form className="flex flex-col w-full gap-y-4" onSubmit={submitHandler}>
          {/* first name and last name */}
          <div className="flex gap-x-3">
            <label className="w-full">
              <p className="text-sm text-gray-700 mb-1">
                First Name<sup className="text-red-500">*</sup>
              </p>
              <input
                required
                type="text"
                name="firstname"
                placeholder="First Name"
                onChange={changeHandler}
                value={formData.firstname}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </label>

            <label className="w-full">
              <p className="text-sm text-gray-700 mb-1">
                Last Name<sup className="text-red-500">*</sup>
              </p>
              <input
                required
                type="text"
                name="lastname"
                placeholder="Last Name"
                onChange={changeHandler}
                value={formData.lastname}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </label>
          </div>

          {/* email */}
          <label>
            <p className="text-sm text-gray-700 mb-1">
              Email Address<sup className="text-red-500">*</sup>
            </p>
            <input
              required
              type="email"
              name="email"
              placeholder="Enter Email Address"
              onChange={changeHandler}
              value={formData.email}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </label>

          {/* password + confirm password */}
          <div className="flex gap-x-3">
            <label className="relative w-full">
              <p className="text-sm text-gray-700 mb-1">
                Create Password<sup className="text-red-500">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                onChange={changeHandler}
                value={formData.password}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <span
                className="absolute right-3 top-[38px] cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible
                    fontSize={24}
                    className="text-gray-500"
                  />
                ) : (
                  <AiOutlineEye fontSize={24} className="text-gray-500" />
                )}
              </span>
            </label>

            <label className="relative w-full">
              <p className="text-sm text-gray-700 mb-1">
                Confirm Password<sup className="text-red-500">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={changeHandler}
                value={formData.confirmPassword}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <span
                className="absolute right-3 top-[38px] cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible
                    fontSize={24}
                    className="text-gray-500"
                  />
                ) : (
                  <AiOutlineEye fontSize={24} className="text-gray-500" />
                )}
              </span>
            </label>
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="bg-green-500 text-white rounded-lg font-medium px-4 py-3 mt-6 hover:bg-green-600 transition"
          >
            Create Account
          </button>

          {/* login link */}
          <p className="text-center mt-6 text-gray-600">
            Already Have an Account?{" "}
            <Link to="/login">
              <span className="text-green-600 cursor-pointer hover:underline">
                Click here
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
