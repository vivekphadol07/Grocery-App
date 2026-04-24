import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export const ProductTable = ({ items, onEdit, onDelete }) => (
  <table className="w-full text-left min-w-[800px]">
    <thead className="bg-slate-50/50 text-[10px] uppercase text-slate-400 font-black tracking-widest border-b border-slate-100">
      <tr>
        <th className="px-8 py-5">Product Info</th>
        <th className="px-8 py-5">Category</th>
        <th className="px-8 py-5">Pricing</th>
        <th className="px-8 py-5 text-center">StockStatus</th>
        <th className="px-8 py-5 text-right">Settings</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-slate-50">
      {items.map(p => (
        <tr key={p._id} className="group hover:bg-slate-50/30 transition-colors">
          <td className="px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-sm text-slate-800 leading-none">{p.name}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">{p.unit}</span>
              </div>
            </div>
          </td>
          <td className="px-8 py-6">
            <span className="px-3 py-1.5 bg-slate-50 text-slate-500 border border-slate-100 rounded-lg text-[10px] font-black tracking-widest">
              {p.category}
            </span>
          </td>
          <td className="px-8 py-6 font-black text-emerald-600 italic">₹{p.price}</td>
          <td className="px-8 py-6 text-center">
            <div className="flex flex-col items-center gap-1.5">
              <span className={`text-sm font-black ${p.stock <= 20 ? 'text-rose-600' : 'text-slate-800'}`}>{p.stock}</span>
              <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${p.stock <= 20 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                  style={{ width: `${Math.min((p.stock/100)*100, 100)}%` }}
                ></div>
              </div>
            </div>
          </td>
          <td className="px-8 py-6 text-right">
            <div className="flex items-center justify-end gap-2 text-slate-300">
              <button onClick={() => onEdit(p)} className="p-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-all"><FiEdit size={16} /></button>
              <button onClick={() => onDelete(p._id)} className="p-2.5 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-all"><FiTrash2 size={16} /></button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
