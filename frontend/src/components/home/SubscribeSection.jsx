import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { FiCheckCircle, FiZap } from "react-icons/fi";
import toast from "react-hot-toast";

export const SubscribeSection = () => {
  const { isLoggedIn, isSubscribed, subscribeToPass } = useAppContext();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      await subscribeToPass();
      toast.success("Welcome to Grocery Pass!");
    } catch (error) {
      toast.error(error.message || "Failed to subscribe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-10 px-6 sm:py-20 mb-20">
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-white via-emerald-50/20 to-white rounded-[3rem] p-10 sm:p-20 text-center relative overflow-hidden shadow-[0_40px_100px_rgba(16,185,129,0.05)] border border-emerald-100/50">
        
        {/* Decorative Elements */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-100 rounded-full blur-[100px] opacity-40" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-200 rounded-full blur-[100px] opacity-30" />
        
        <div className="relative z-10">
          {isSubscribed ? (
            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-700">
              <div className="mb-8 inline-flex items-center justify-center w-20 h-20 bg-emerald-600 rounded-3xl text-white shadow-xl shadow-emerald-200 rotate-12">
                <FiCheckCircle size={40} />
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-slate-800 mb-6 tracking-tighter">
                Welcome to the <br/> <span className="text-emerald-600">Inner Circle</span>
              </h2>
              <p className="text-slate-500 font-bold text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
                Your Grocery Pass is active. Enjoy unlimited <span className="text-emerald-600">Free Delivery</span> and priority support on every order.
              </p>
            </div>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full mb-8 border border-emerald-100">
                <FiZap size={14} className="fill-emerald-600" />
                <span className="text-[10px] font-black uppercase tracking-widest">Exclusive Offer</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-black text-slate-800 mb-6 tracking-tighter">
                Get <span className="text-emerald-600">Grocery Pass</span>
              </h2>

              <p className="text-slate-500 font-bold text-base sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                Tired of delivery fees? Join Grocery Pass today to unlock unlimited free delivery, exclusive member-only discounts, and much more!
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-xl mx-auto">
                {!isLoggedIn ? (
                  <Link to="/login" className="w-full">
                    <button
                      className="
                        w-full
                        px-10 py-5
                        bg-slate-900
                        text-white
                        rounded-[2rem]
                        font-black
                        text-sm
                        uppercase
                        tracking-widest
                        shadow-2xl shadow-slate-200
                        hover:bg-black
                        hover:-translate-y-1.5
                        active:translate-y-0
                        transition-all duration-300
                      "
                    >
                      Login to Subscribe
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={handleSubscribe}
                    disabled={loading}
                    className="
                      w-full
                      px-10 py-5
                      bg-emerald-600
                      text-white
                      rounded-[2rem]
                      font-black
                      text-sm
                      uppercase
                      tracking-widest
                      shadow-2xl shadow-emerald-200
                      hover:bg-emerald-700
                      hover:-translate-y-1.5
                      active:translate-y-0
                      transition-all duration-300
                      disabled:opacity-70 disabled:cursor-not-allowed
                    "
                  >
                    {loading ? "Activating..." : "Get Pass Now - Free"}
                  </button>
                )}
              </div>
              
              <div className="mt-12 flex flex-col items-center gap-2">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
                  * SIMULATED SUBSCRIPTION FOR DEMONSTRATION PURPOSES
                </p>
                <div className="w-12 h-1 bg-slate-100 rounded-full"></div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
