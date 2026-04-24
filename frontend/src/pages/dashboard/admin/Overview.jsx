import React from "react";
import { FiTrendingUp, FiShoppingBag, FiUsers, FiBox, FiAlertCircle } from "react-icons/fi";
import { StatCard } from "../../../components/admin/StatCard";
import { PerformanceMetric } from "../../../components/admin/PerformanceMetric";

const Overview = ({ stats, onRestock }) => {
  if (!stats) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Revenue" 
          value={`₹${stats.totalRevenue.toLocaleString()}`} 
          icon={FiTrendingUp} 
          color="emerald" 
          trend="+12.5%" 
        />
        <StatCard 
          title="Orders" 
          value={stats.orderCount} 
          icon={FiShoppingBag} 
          color="blue" 
          trend="+3.2%" 
        />
        <StatCard 
          title="Customers" 
          value={stats.userCount} 
          icon={FiUsers} 
          color="indigo" 
          trend="+5.4%" 
        />
        <StatCard 
          title="Inventory" 
          value={stats.productCount} 
          icon={FiBox} 
          color="orange" 
          trend="Stable" 
        />
      </div>

      {/* Critical Updates */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-premium p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-800">Inventory Health</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Products needing restocking</p>
            </div>
            <span className="px-4 py-1.5 bg-rose-50 text-rose-600 text-[10px] font-black rounded-full uppercase tracking-widest border border-rose-100">Action Required</span>
          </div>
          
          <div className="overflow-x-auto -mx-8 sm:mx-0">
            <table className="w-full text-left min-w-[500px]">
              <thead className="text-[10px] uppercase text-slate-400 font-black tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-8 py-4">Product</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-center">Stock</th>
                  <th className="px-8 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {stats.lowStockProducts.map(p => (
                  <tr key={p._id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 text-sm leading-tight">{p.name}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{p.category}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-1.5 text-rose-500 font-black text-[10px] uppercase italic">
                        <FiAlertCircle /> Critical
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className="text-sm font-black text-slate-700 bg-rose-50 px-3 py-1 rounded-lg border border-rose-100">{p.stock}</span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={() => onRestock(p)}
                        className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline underline-offset-4"
                      >
                        Restock Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
           {/* Decorative Elements */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/30 transition-all duration-700"></div>
           
           <h3 className="text-lg font-black tracking-tight mb-2">Performance Summary</h3>
           <p className="text-xs text-slate-400 font-bold mb-8">Store statistics for today</p>
           
           <div className="space-y-6">
              <PerformanceMetric label="Avg. Order Value" value="₹1,240" percentage={65} />
              <PerformanceMetric label="New Signups" value="24" percentage={45} />
              <PerformanceMetric label="Successful Deliveries" value="98%" percentage={98} />
              <PerformanceMetric label="Return Rate" value="1.2%" percentage={15} color="bg-rose-500" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
