import React from 'react';
import { FiTruck, FiShield, FiRotateCcw } from 'react-icons/fi';

export const TrustBanner = () => {
  const features = [
    { 
      icon: <FiTruck size={24} />, 
      title: "10-Min Delivery", 
      desc: "Superfast service",
      color: "bg-emerald-50 text-emerald-600" 
    },
    { 
      icon: <FiShield size={24} />, 
      title: "Farm Fresh", 
      desc: "100% Quality",
      color: "bg-blue-50 text-blue-600" 
    },
    { 
      icon: <FiRotateCcw size={24} />, 
      title: "Easy Returns", 
      desc: "No questions asked",
      color: "bg-rose-50 text-rose-600" 
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-8 sm:py-12">
      <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-50 grid grid-cols-3 divide-x divide-slate-50 p-2 sm:p-0">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-2 sm:gap-6 p-3 sm:p-8 group hover:bg-slate-50/50 transition-all duration-500 first:rounded-l-[1.5rem] sm:first:rounded-l-[2.5rem] last:rounded-r-[1.5rem] sm:last:rounded-r-[2.5rem]">
            <div className={`w-10 h-10 sm:w-16 sm:h-16 ${f.color} rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-sm shrink-0`}>
              <div className="scale-75 sm:scale-100">{f.icon}</div>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-black text-slate-800 text-[8px] sm:text-sm uppercase tracking-tighter sm:tracking-wider mb-0.5 sm:mb-1 leading-none">{f.title}</h3>
              <p className="hidden sm:block text-[10px] text-slate-400 font-bold uppercase tracking-tight">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
