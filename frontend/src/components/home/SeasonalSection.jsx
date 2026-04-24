import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from "react-router-dom";

export const SeasonalSection = () => {
  const month = new Date().getMonth();
  
  // Seasonal Logic (Changed every 4 months)
  let season = {
    title: "Summer Refresh",
    desc: "Stay cool with juicy mangoes, chilled drinks & ice creams.",
    color: "from-orange-400 to-amber-500",
    icon: "🥭",
    tag: "Summer Special"
  };

  // Winter: Nov, Dec, Jan, Feb (10, 11, 0, 1)
  if (month >= 10 || month <= 1) {
    season = {
        title: "Winter Warmers",
        desc: "Boost immunity with exotic dry fruits, organic honey & healthy soups.",
        color: "from-sky-400 to-blue-500",
        icon: "🥣",
        tag: "Winter Collection"
    };
  } 
  // Monsoon: Jul, Aug, Sep, Oct (6, 7, 8, 9)
  else if (month >= 6 && month <= 9) {
    season = {
        title: "Monsoon Magic",
        desc: "Cozy up with premium teas, pakora mixes & all-weather umbrellas.",
        color: "from-blue-500 to-indigo-600",
        icon: "☔",
        tag: "Monsoon Picks"
    };
  }
  // Summer: Mar, Apr, May, Jun (2, 3, 4, 5) - Handled by default initialization above


  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className={`relative overflow-hidden bg-gradient-to-br ${season.color} rounded-[3.5rem] p-8 sm:p-16 text-white shadow-2xl shadow-emerald-900/10`}>
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-20 -mb-20 blur-2xl"></div>

        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse mr-2"></span>
            {season.tag}
          </span>
          
          <h2 className="text-4xl sm:text-6xl font-black mb-6 leading-tight tracking-tight">
            {season.title} {season.icon}
          </h2>
          
          <p className="text-lg sm:text-xl font-medium opacity-90 mb-10 leading-relaxed">
            {season.desc}
          </p>
          
          <Link 
            to="/allproducts"
            className="group bg-white text-slate-800 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all shadow-2xl flex items-center gap-3 active:scale-95 w-fit"
          >
            Explore Now
            <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>

        {/* Large Decorative Icon */}
        <div className="absolute right-0 bottom-0 text-[180px] sm:text-[320px] opacity-20 translate-x-12 translate-y-24 rotate-12 select-none pointer-events-none transition-transform hover:scale-110 duration-700">
            {season.icon}
        </div>
      </div>
    </div>
  );
};
