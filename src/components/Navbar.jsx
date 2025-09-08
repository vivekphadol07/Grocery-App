import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

export const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div
      className="
  flex flex-col sm:flex-row justify-between items-center 
  w-full h-auto sm:h-[70px] 
  text-[14px] sm:text-[16px] 
  bg-slate-50 shadow-md shadow-black/10 
  px-4 sm:px-8 lg:px-16 gap-y-3
"
    >
      {/* Logo */}
      <div className="flex-shrink-0">
        <img
          src={`${import.meta.env.BASE_URL}/logo.png`}
          alt="Logo"
          className="w-[140px] sm:w-[180px] lg:w-[200px] object-contain"
        />
      </div>

      {/* Nav Links + Search + Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-x-5 mt-2 sm:mt-0">
        <Link to="/">
          <p className="hover:text-green-600">Home</p>
        </Link>

        <Link to="/about">
          <p className="hover:text-green-600">About</p>
        </Link>

        <Link to="/contactus">
          <p className="hover:text-green-600">Contact</p>
        </Link>

        {/* Search Box */}
        <div className="relative">
          <input
            type="text"
            name="search"
            placeholder="Search products"
            className="pl-10 pr-4 py-1 border border-gray-300 rounded-[50px] text-sm sm:text-base w-[180px] sm:w-[220px] lg:w-[260px]"
          />
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
        </div>

        {/* Cart */}
        <Link to="/cart" className="flex justify-center">
          <FiShoppingCart
            size={25}
            className="text-black hover:text-green-600"
          />
        </Link>

        {/* Login Button */}

        {
          isLoggedIn ? (<button onClick={() => setIsLoggedIn(false)} className="rounded-[50px] bg-[#16A34A] px-4 py-1 text-white text-sm sm:text-base hover:bg-green-700 transition">
            Logout
          </button>) :
            (<Link to="/login">
              <button className="rounded-[50px] bg-[#16A34A] px-4 py-1 text-white text-sm sm:text-base hover:bg-green-700 transition">
                Login
              </button>
            </Link>)
        }

      </div>
    </div>
  );
};
