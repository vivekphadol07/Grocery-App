import React from "react";

export const StatCard = ({ title, value, icon: Icon, color, trend }) => {
  const colorMap = {
    emerald: "bg-emerald-500 shadow-emerald-500/20",
    blue: "bg-blue-500 shadow-blue-500/20",
    indigo: "bg-indigo-500 shadow-indigo-500/20",
    orange: "bg-orange-500 shadow-orange-500/20",
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-premium flex items-center justify-between group hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500">
      <div className="space-y-1">
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
        <p className="text-3xl font-black text-slate-800 tabular-nums">{value}</p>
        <span className={`text-[10px] font-black uppercase tracking-tighter ${trend.startsWith('+') ? 'text-emerald-500' : 'text-slate-400'}`}>
          {trend} <span className="text-slate-300 font-bold ml-1">vs last mo</span>
        </span>
      </div>
      <div className={`w-14 h-14 ${colorMap[color]} rounded-2xl flex items-center justify-center text-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
        <Icon size={24} strokeWidth={2.5} />
      </div>
    </div>
  );
};
