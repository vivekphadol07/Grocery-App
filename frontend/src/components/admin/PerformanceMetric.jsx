import React from "react";

export const PerformanceMetric = ({ label, value, percentage, color = "bg-emerald-500" }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-end">
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
      <span className="text-sm font-black text-white">{value}</span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`} 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);
