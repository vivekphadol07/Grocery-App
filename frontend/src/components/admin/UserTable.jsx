import React from "react";

export const UserTable = ({ items }) => (
  <table className="w-full text-left min-w-[800px]">
    <thead className="bg-slate-50/50 text-[10px] uppercase text-slate-400 font-black tracking-widest border-b border-slate-100">
      <tr>
        <th className="px-8 py-5">Identity</th>
        <th className="px-8 py-5">Communication</th>
        <th className="px-8 py-5">Date Joined</th>
        <th className="px-8 py-5 text-right">Auth Status</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-slate-50">
      {items.map(user => (
        <tr key={user._id} className="group hover:bg-slate-50/30 transition-colors">
          <td className="px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-black text-xs text-slate-400 border border-slate-200">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div className="flex flex-col">
                <span className="font-black text-sm text-slate-800">{user?.firstName || "Unknown"} {user?.lastName || "User"}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Customer ID: {user._id.substring(user._id.length-6)}</span>
              </div>
            </div>
          </td>
          <td className="px-8 py-6 text-sm text-slate-600 font-medium italic">{user.email}</td>
          <td className="px-8 py-6 text-[10px] text-slate-400 font-black uppercase tracking-widest">
            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB') : "N/A"}
          </td>
          <td className="px-8 py-6 text-right">
            <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest border ${
              user.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
            }`}>
              {user.isActive ? "VERIFIED" : "DISABLED"}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
