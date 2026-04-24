import React, { useState } from "react";
import toast from "react-hot-toast";
import { Footer } from "../../components/common/Footer";
import { useNavigate } from "react-router-dom";
import { FiMail, FiPhone, FiMapPin, FiSend, FiMessageSquare } from "react-icons/fi";
import { useAppContext } from "../../context/AppContext";
import { feedbackApi } from "../../services/api";

export const ContactUs = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    address: "",
    subject: "General Inquiry",
    orderId: "",
    message: "",
  });

  const { token, user } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  // Auto-fill user data if logged in
  React.useEffect(() => {
    if (isLoggedIn && user) {
      setFormData(prev => ({
        ...prev,
        fullName: `${user.firstName} ${user.lastName}`.trim(),
        email: user.email || "",
        phoneNo: user.phone || "",
        address: user.addresses?.length > 0 
          ? `${user.addresses[0].addressLine}, ${user.addresses[0].city}` 
          : ""
      }));
    }
  }, [isLoggedIn, user]);

  function changeHandler(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function submitHandler(e) {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.error("Please login to send messages");
      navigate("/login");
      return;
    }

    if (!formData.fullName || !formData.email || !formData.message) {
      toast.error("Please fill required fields");
      return;
    }

    setIsLoading(true);
    try {
      await feedbackApi.submit(formData, token);
      toast.success("Message sent successfully! We will get back to you soon.");
      setFormData(prev => ({
        fullName: isLoggedIn ? prev.fullName : "",
        email: isLoggedIn ? prev.email : "",
        phoneNo: isLoggedIn ? prev.phoneNo : "",
        address: isLoggedIn ? prev.address : "",
        subject: "General Inquiry",
        orderId: "",
        message: "",
      }));
    } catch (error) {
      toast.error(error.message || "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-32 lg:pb-10">
      <div className="flex-grow flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto p-6 gap-12 lg:gap-24 py-12 lg:py-20">
        
        {/* Left Side: Text Info */}
        <div className="lg:w-1/2 w-full flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="bg-emerald-100/50 p-4 rounded-2xl mb-6 inline-flex">
                <FiMessageSquare className="text-emerald-600 text-4xl" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-800 mb-4 tracking-tight">
                Let's get in <span className="text-emerald-600">touch.</span>
            </h1>
            <p className="text-slate-500 text-lg mb-10 max-w-md leading-relaxed">
                Whether you have a question about your order, our products, or just want to say hi, we're here to help!
            </p>

            <div className="w-full flex-col gap-6 hidden lg:flex mt-8 border-t border-slate-200 pt-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex justify-center items-center text-emerald-600 shrink-0">
                        <FiMail className="text-xl" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800">Email Us</h4>
                        <p className="text-slate-500 text-sm">support@groceryapp.com</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex justify-center items-center text-emerald-600 shrink-0">
                        <FiPhone className="text-xl" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800">Call Us</h4>
                        <p className="text-slate-500 text-sm">+1 (800) 123-4567</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex justify-center items-center text-emerald-600 shrink-0">
                        <FiMapPin className="text-xl" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800">Visit Us</h4>
                        <p className="text-slate-500 text-sm">123 Market Street, Food City</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Side: Form Container */}
        <div className="lg:w-1/2 w-full max-w-xl">
          <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-800 mb-8">Send us a Message</h3>
            
            <form className="flex flex-col gap-5" onSubmit={submitHandler}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Full Name *</label>
                      <input
                        type="text" name="fullName" placeholder="John Doe" required
                        value={formData.fullName} onChange={changeHandler}
                        className="bg-slate-50 border-2 border-transparent p-3.5 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-slate-700"
                      />
                  </div>
                  <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Email Space *</label>
                      <input
                        type="email" name="email" placeholder="john@example.com" required
                        value={formData.email} onChange={changeHandler}
                        className="bg-slate-50 border-2 border-transparent p-3.5 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-slate-700"
                      />
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Phone Number</label>
                      <input
                        type="text" name="phoneNo" placeholder="+1 (555) 000-0000"
                        value={formData.phoneNo} onChange={changeHandler}
                        className="bg-slate-50 border-2 border-transparent p-3.5 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-slate-700"
                      />
                  </div>
                  <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Address</label>
                      <input
                        type="text" name="address" placeholder="123 Street, City"
                        value={formData.address} onChange={changeHandler}
                        className="bg-slate-50 border-2 border-transparent p-3.5 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-slate-700"
                      />
                  </div>
              </div>

              <div className="flex flex-col gap-1.5 mt-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">How can we help?</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={changeHandler}
                    className="bg-slate-50 border-2 border-transparent p-3.5 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-slate-700 w-full appearance-none cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Complaint">Order Complaint / Issue</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Other">Other</option>
                  </select>
              </div>

              {formData.subject === "Order Complaint" && (
                <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Order ID *</label>
                    <input
                      type="text" name="orderId" placeholder="#ORD-XXXX-XXXX" required
                      value={formData.orderId} onChange={changeHandler}
                      className="bg-red-50/50 border-2 border-transparent p-3.5 rounded-xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all font-bold text-slate-800"
                    />
                </div>
              )}

              <div className="flex flex-col gap-1.5 mt-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Your Message *</label>
                  <textarea
                    name="message" placeholder="Type your message here..." rows="4" required
                    value={formData.message} onChange={changeHandler}
                    className="bg-slate-50 border-2 border-transparent p-3.5 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-slate-700 resize-none"
                  />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-4 w-full bg-emerald-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:translate-y-0"
              >
                {isLoading ? "Sending..." : "Send Message"} <FiSend />
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
