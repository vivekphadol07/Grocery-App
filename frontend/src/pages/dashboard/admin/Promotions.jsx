import React from "react";
import { CouponTable } from "../../../components/admin/CouponTable";
import { FiLoader, FiSearch } from "react-icons/fi";

const Promotions = ({ items, loading, onToggle }) => {
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-premium overflow-hidden min-h-[500px] flex flex-col animate-fade-in">
      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center p-20 text-slate-300">
          <FiLoader className="text-4xl animate-spin mb-4 text-emerald-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Syncing promotions...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-20 text-center animate-fade-in">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
            <FiSearch className="text-4xl text-slate-200" />
          </div>
          <h4 className="text-lg font-black text-slate-800 tracking-tight">No Promotions Found</h4>
          <p className="text-sm text-slate-400 font-medium max-w-xs mx-auto mt-2">Create your first discount coupon to boost sales.</p>
        </div>
      ) : (
        <div className="overflow-x-auto custom-scrollbar">
          <CouponTable items={items} onToggle={onToggle} />
        </div>
      )}
    </div>
  );
};

export default Promotions;
