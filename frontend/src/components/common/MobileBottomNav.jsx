import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  FiHome, FiShoppingCart, FiHeart, FiUser, FiInfo 
} from "react-icons/fi";

const MobileBottomNav = () => {
  const location = useLocation();
  const cart = useSelector((state) => state.cart || []);
  const cartItemCount = cart.length;
  
  // Helper to check active state including query params for wishlist
  const isActive = (path, search = "") => {
    if (search) {
        return location.pathname === path && location.search === search;
    }
    return location.pathname === path;
  };

  const navItems = [
    { to: "/", icon: FiHome, label: "Home" },
    { to: "/dashboard", search: "?tab=wishlist", icon: FiHeart, label: "Wishlist" },
    { to: "/cart", icon: FiShoppingCart, label: "Cart" },
    { to: "/dashboard", icon: FiUser, label: "Profile" },
    { to: "/about", icon: FiInfo, label: "About" },
  ];

  return (
    <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[999] animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/20 px-4 py-3">
        <div className="flex justify-between items-center gap-1">
          {navItems.map((item) => {
            const active = isActive(item.to, item.search);
            return (
              <Link
                key={item.label}
                to={item.to + (item.search || "")}
                className={`
                  relative flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded-2xl
                  transition-all duration-500 ease-out
                  ${active 
                    ? "text-emerald-600 after:content-[''] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-emerald-600 after:rounded-full" 
                    : "text-slate-400 hover:text-slate-600"}
                `}
              >
                <div className={`
                    p-2.5 rounded-xl transition-all duration-500 relative
                    ${active ? "bg-emerald-50 scale-110" : "bg-transparent"}
                `}>
                    <item.icon size={20} className={active ? "stroke-[2.5px]" : "stroke-2"} />
                    {item.label === "Cart" && cartItemCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 bg-emerald-600 text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full border border-white shadow-lg">
                            {cartItemCount}
                        </span>
                    )}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-tighter transition-all duration-300 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                    {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileBottomNav;
