import React, { useState } from "react";
import { FiShoppingCart, FiUser, FiHeart, FiLogOut, FiSettings, FiChevronDown } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useSelector } from "react-redux";

export const Navbar = ({ setSearchQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout, isAdmin, user } = useAppContext();
  const cart = useSelector((state) => state.cart);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  React.useEffect(() => {
    setIsAccountOpen(false);
  }, [location.pathname]);
  
  const cartItemCount = cart.length;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    navigate("/allproducts");
  };

  const handleLogout = () => {
    logout();
    setIsAccountOpen(false);
    navigate("/");
  };

  return (
    <header className="w-full bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">

        {/* ===== TOP ROW ===== */}
        <div className="flex items-center justify-between h-[80px] gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-black text-xl">FD</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-800 hidden sm:block">
              Farm<span className="text-emerald-600">Direct</span>
            </span>
          </Link>

          {/* ===== DESKTOP NAV ===== */}
          <div className="hidden lg:flex items-center gap-10 flex-1 justify-center">

            {/* Links */}
            <nav className="flex items-center gap-10 text-[15px] font-bold">
              {[
                { name: "Home", path: "/" },
                { name: "Shop", path: "/allproducts" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contactus" }
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`
                    transition-all duration-300 relative py-1
                    ${location.pathname === link.path ? 'text-emerald-600' : 'text-slate-500 hover:text-emerald-500'}
                  `}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded-full animate-in fade-in slide-in-from-left duration-300"></span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Search */}
            <div className="relative flex-1 max-w-md group/search mx-6">
              <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within/search:text-emerald-600 transition-colors" />
              <input
                type="text"
                placeholder="Search fresh groceries..."
                onChange={handleSearch}
                className="
                  pl-12 pr-4 py-3 w-full
                  bg-slate-50 border border-slate-100
                  rounded-2xl text-sm font-semibold
                  focus:outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500
                  transition-all duration-300
                "
              />
            </div>
          </div>

          {/* ===== ACTIONS ===== */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Wishlist Link */}
            <Link
              to="/dashboard?tab=wishlist" 
              className="p-3 rounded-2xl text-slate-600 hover:bg-rose-50 hover:text-rose-500 transition-all group relative"
              title="My Wishlist"
            >
              <FiHeart size={22} className="group-hover:fill-rose-500 transition-all" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white scale-0 group-hover:scale-100 transition-transform"></span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="p-3 rounded-2xl bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all relative group"
            >
              <FiShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-lg shadow-emerald-500/20">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <div className="h-8 w-[1px] bg-slate-100 mx-2 hidden lg:block"></div>

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  className={`
                    flex items-center gap-2 pl-2 pr-3 py-2 rounded-2xl transition-all
                    ${isAccountOpen ? 'bg-emerald-50 text-emerald-600' : 'hover:bg-slate-50 text-slate-700'}
                  `}
                >
                  <div className="w-9 h-9 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                    <FiUser size={18} />
                  </div>
                  <FiChevronDown className={`transition-transform duration-300 ${isAccountOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Account Dropdown */}
                {isAccountOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-[60]">
                    <div className="p-5 border-b border-slate-50">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
                      <p className="font-bold text-slate-800 truncate">{user?.firstName} {user?.lastName}</p>
                    </div>
                    
                    <div className="p-2">
                      <Link 
                        to={isAdmin ? "/admin/dashboard" : "/dashboard"}
                        onClick={() => setIsAccountOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-all"
                      >
                        <FiUser /> {isAdmin ? "Admin Panel" : "My Account"}
                      </Link>
                      <Link 
                        to="/dashboard" // Default to dashboard for settings
                        onClick={() => setIsAccountOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-all"
                      >
                        <FiSettings /> Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 transition-all"
                      >
                        <FiLogOut /> Logout
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Overlay to close dropdown */}
                {isAccountOpen && (
                  <div 
                    className="fixed inset-0 z-[-1]" 
                    onClick={() => setIsAccountOpen(false)}
                  ></div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="px-6 py-2.5 bg-emerald-600 text-white rounded-2xl text-sm font-bold hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* ===== MOBILE SEARCH ===== */}
        <div className="flex items-center gap-3 pb-5 lg:hidden">
          <div className="relative flex-1 group/search">
            <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
            <input
              type="text"
              placeholder="Search products..."
              onChange={handleSearch}
              className="
                pl-12 pr-4 py-3 w-full
                bg-slate-50 border border-slate-50
                rounded-2xl text-sm font-semibold
                focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/30
                transition-all duration-300
              "
            />
          </div>
        </div>
      </div>
    </header>
  );
};

