import React from "react";
import { FiClock } from "react-icons/fi";

export const OrderTable = ({ items, onStatusChange }) => (
  <table className="w-full text-left min-w-[800px]">
    <thead className="bg-slate-50/50 text-[10px] uppercase text-slate-400 font-black tracking-widest border-b border-slate-100">
      <tr>
        <th className="px-8 py-5">Order Detail</th>
        <th className="px-8 py-5">Customer</th>
        <th className="px-8 py-5">Price</th>
        <th className="px-8 py-5 text-center">Status</th>
        <th className="px-8 py-5 text-right">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-slate-50">
      {items.map(order => (
        <tr key={order._id} className="group hover:bg-slate-50/30 transition-colors">
          <td className="px-8 py-6">
            <div className="flex flex-col">
              <span className="font-black text-xs text-slate-800">#{order._id.substring(order._id.length-6).toUpperCase()}</span>
              <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 mt-1">
                <FiClock /> {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
          </td>
          <td className="px-8 py-6 font-bold text-slate-700 text-sm">{order.user?.firstName || "Guest"}</td>
          <td className="px-8 py-6 font-black text-emerald-600 text-sm italic">₹{order.totalPrice}</td>
          <td className="px-8 py-6 text-center">
            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest border ${
              order.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
              order.status === 'CANCELLED' ? 'bg-rose-50 text-rose-600 border-rose-100' :
              'bg-amber-50 text-amber-600 border-amber-100'
            }`}>
              {order.status}
            </span>
          </td>
          <td className="px-8 py-6 text-right">
            <select 
              className="text-[10px] font-black bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-4 focus:ring-emerald-500/10 text-slate-600 outline-none transition-all"
              value={order.status}
              onChange={(e) => onStatusChange(order._id, e.target.value)}
            >
              <option value="PLACED">Placed</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
