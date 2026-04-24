import React from "react";
import { FiX } from "react-icons/fi";
import { ModalField } from "./ModalField";

export const CouponModal = ({ formData, setFormData, onClose, onSave }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fade-in" onClick={onClose}></div>
    <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-slide-up">
      <div className="p-8 sm:p-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">New <span className="text-emerald-600">Promotion</span></h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-all"><FiX size={24} /></button>
        </div>

        <form onSubmit={onSave} className="space-y-6">
          <ModalField label="Promotion Code" value={formData.code} placeholder="SAVE50" onChange={v => setFormData({...formData, code: v.toUpperCase()})} />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Type</label>
              <select 
                value={formData.discountType}
                onChange={(e) => setFormData({...formData, discountType: e.target.value})}
                className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl font-bold text-sm outline-none transition-all focus:border-emerald-500/20"
              >
                <option value="PERCENTAGE">Percentage (%)</option>
                <option value="FIXED">Flat Value (₹)</option>
              </select>
            </div>
            <ModalField label="Value" type="number" value={formData.discountValue} placeholder="20" onChange={v => setFormData({...formData, discountValue: v})} />
          </div>
          <ModalField label="Min Order Logic (₹)" type="number" value={formData.minOrderValue} placeholder="199" onChange={v => setFormData({...formData, minOrderValue: v})} />
          <ModalField label="Display Prompt" value={formData.description} placeholder="e.g. Half off on everything!" onChange={v => setFormData({...formData, description: v})} />
          
          <button 
            type="submit"
            className="w-full h-14 bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 hover:-translate-y-1 transition-all duration-300"
          >
            Create Promotion
          </button>
        </form>
      </div>
    </div>
  </div>
);
