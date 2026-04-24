import React from "react";
import { FiShoppingBag, FiLogOut, FiTrendingUp, FiBox, FiUsers, FiMessageSquare } from "react-icons/fi";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, activeTab, setActiveTab, logout }) => {
  const navItems = [
    { id: "overview", label: "Overview", icon: FiTrendingUp },
    { id: "orders", label: "Orders", icon: FiShoppingBag },
    { id: "products", label: "Inventory", icon: FiBox },
    { id: "users", label: "Customers", icon: FiUsers },
    { id: "feedback", label: "Suggestions", icon: FiMessageSquare },
    { id: "coupons", label: "Promotions", icon: FiTrendingUp },
  ];

  return (
    <>
      {/* Mobile Sidebar Toggle Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-slate-900 text-white z-50 transition-all duration-300 transform
        lg:translate-x-0 lg:static lg:inset-0
        ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="h-full flex flex-col p-6">
          {/* Logo Section */}
          <div className="flex items-center gap-4 mb-10 px-2">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <FiShoppingBag className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight leading-none">FreshGo</h1>
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-black">Admin Panel</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 group
                  ${activeTab === item.id 
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <item.icon className={`text-lg transition-transform duration-300 ${activeTab === item.id ? "scale-110" : "group-hover:scale-110"}`} />
                <span className="text-sm font-bold tracking-wide">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Section (Bottom) */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <button 
              onClick={logout}
              className="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-500 transition-all duration-300 group"
            >
              <FiLogOut className="text-lg group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-bold tracking-wide">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
