import React from "react";

export const CouponTable = ({ items, onToggle }) => (
  <table className="w-full text-left min-w-[800px]">
    <thead className="bg-slate-50/50 text-[10px] uppercase text-slate-400 font-black tracking-widest border-b border-slate-100">
      <tr>
        <th className="px-8 py-5">Promo Code</th>
        <th className="px-8 py-5">Offer Detail</th>
        <th className="px-8 py-5 text-center">Eligibility</th>
        <th className="px-8 py-5 text-center">Status</th>
        <th className="px-8 py-5 text-right">Quick Control</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-slate-50">
      {items.map(coupon => (
        <tr key={coupon._id} className="group hover:bg-slate-50/30 transition-colors">
          <td className="px-8 py-6 font-mono font-black text-emerald-600 tracking-tighter sm:tracking-widest text-base">
            {coupon.code}
          </td>
          <td className="px-8 py-6">
            <div className="flex flex-col">
              <span className="font-black text-sm text-slate-800">
                {coupon.discountType === "PERCENTAGE" ? `${coupon.discountValue}% DISCOUNT` : `₹${coupon.discountValue} FLAT OFF`}
              </span>
              <p className="text-[11px] text-slate-400 font-medium italic max-w-xs truncate">{coupon.description}</p>
            </div>
          </td>
          <td className="px-8 py-6 text-center">
            <span className="text-[10px] font-black text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 uppercase tracking-widest">
              ₹{coupon.minOrderValue || 0} Min Order
            </span>
          </td>
          <td className="px-8 py-6 text-center">
            <div className={`w-3 h-3 rounded-full mx-auto ${coupon.isActive ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-slate-300'}`}></div>
          </td>
          <td className="px-8 py-6 text-right">
            <button 
              onClick={() => onToggle(coupon._id)}
              className={`text-[10px] font-black px-6 py-2.5 rounded-xl border-2 transition-all uppercase tracking-widest ${
                coupon.isActive 
                ? 'border-rose-100 text-rose-600 hover:bg-rose-500 hover:text-white hover:border-rose-500' 
                : 'border-emerald-100 text-emerald-600 hover:bg-emerald-500 hover:text-white hover:border-emerald-500'
              }`}
            >
              {coupon.isActive ? "Retire" : "Activate"}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
