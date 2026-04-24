import React from "react";
import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiLinkedin, FiFacebook, FiMail, FiMapPin } from "react-icons/fi";

export const Footer = () => {
  return (
    <footer className="hidden lg:block bg-[#fbfcff] border-t border-slate-100 text-slate-600 mt-20 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto py-20 px-6 sm:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
          
          {/* Brand & Description */}
          <div className="lg:col-span-1 space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                <span className="text-white font-black text-sm">FD</span>
              </div>
              <span className="text-xl font-black tracking-tighter text-slate-800">
                Farm<span className="text-emerald-600">Direct</span>
              </span>
            </Link>
            <p className="text-sm font-bold leading-relaxed text-slate-400">
              Transforming your grocery experience with premium, farm-fresh produce delivered directly to your doorstep. Quality and freshness in every bite.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <a href="#" className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center hover:text-emerald-600 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100 transition-all"><FiInstagram /></a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center hover:text-emerald-600 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100 transition-all"><FiTwitter /></a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center hover:text-emerald-600 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100 transition-all"><FiFacebook /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 col-span-1 md:col-span-2 lg:col-span-2 gap-8">
            <div>
              <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] mb-8">Shopping</h3>
              <ul className="space-y-4">
                <li><Link to="/allproducts" className="text-sm font-bold text-slate-400 hover:text-emerald-600 transition-all">All Products</Link></li>
                <li><Link to="/bestseller" className="text-sm font-bold text-slate-400 hover:text-emerald-600 transition-all">Bestsellers</Link></li>
                <li><Link to="/hotdeals" className="text-sm font-bold text-slate-400 hover:text-emerald-600 transition-all">Hot Deals</Link></li>
                <li><Link to="/cart" className="text-sm font-bold text-slate-400 hover:text-emerald-600 transition-all">My Cart</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] mb-8">Company</h3>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-sm font-bold text-slate-400 hover:text-emerald-600 transition-all">About Us</Link></li>
                <li><Link to="/contactus" className="text-sm font-bold text-slate-400 hover:text-emerald-600 transition-all">Contact</Link></li>
                <li><Link to="/" className="text-sm font-bold text-slate-400 hover:text-emerald-600 transition-all">Our Farmers</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter/Contact */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] mb-8">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FiMapPin className="text-emerald-600 mt-1" />
                <p className="text-sm font-bold text-slate-400 leading-snug">
                  123 Fresh Lane, Harvest Valley<br/>Green Estate, IN 40001
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-emerald-600" />
                <p className="text-sm font-bold text-slate-400">hello@farmdirect.com</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Credits Bar */}
      <div className="bg-white py-10 border-t border-slate-50 pb-32 lg:pb-10">
        <div className="max-w-7xl mx-auto px-6 text-center lg:flex lg:justify-between lg:items-center">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-6 lg:mb-0">
            © 2026 FarmDirect Grocery. Harvested with love by the DeepMind Team.
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-600 transition-colors cursor-pointer">Privacy</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-600 transition-colors cursor-pointer">Terms</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-600 transition-colors cursor-pointer">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

