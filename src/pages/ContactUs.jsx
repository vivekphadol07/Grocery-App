import React, { useState } from "react";
import toast from "react-hot-toast";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";

export const ContactUs = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    address: "",
    message: "",
  });

  // handle input change
  function changeHandler(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // handle form submit
  function submitHandler(e) {
    e.preventDefault();

    // validation (basic check)
    if (!formData.fullName || !formData.email || !formData.message) {
      toast.error("Please fill required fields (Name, Email, Message)");
      return;
    }

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    toast.success("Message sent successfully");
    console.log("Contact Form Data:", formData);

    // clear form after submit
    setFormData({
      fullName: "",
      email: "",
      phoneNo: "",
      address: "",
      message: "",
    });
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto p-6 gap-10">
        <div className="lg:w-1/2 w-full">
          <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
          <h2 className="text-xl text-gray-600 mb-6">Get In Touch</h2>

          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              value={formData.fullName}
              onChange={changeHandler}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={changeHandler}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <input
              type="text"
              name="phoneNo"
              placeholder="Phone No."
              value={formData.phoneNo}
              onChange={changeHandler}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={changeHandler}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <textarea
              name="message"
              placeholder="Message"
              rows="4"
              required
              value={formData.message}
              onChange={changeHandler}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <button
              type="submit"
              className="bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="lg:w-1/2 w-full flex justify-center">
          <img
            src={`${import.meta.env.BASE_URL}/contactus.png`}
            alt="Contact Us"
            className="max-w-md w-full object-contain"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};
