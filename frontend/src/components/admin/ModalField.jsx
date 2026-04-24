import React from "react";

export const ModalField = ({ label, value, placeholder, type = "text", onChange, required = true }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{label}</label>
    <input 
      required={required}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-slate-50 border border-slate-100 focus:border-emerald-500/20 focus:ring-4 focus:ring-emerald-500/5 p-4 rounded-xl outline-none font-bold text-sm text-slate-700 transition-all"
    />
  </div>
);
