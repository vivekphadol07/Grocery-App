import React from "react";
import { Card } from "../../components/common/Card";
import { Footer } from "../../components/common/Footer";
import { useAppContext } from "../../context/AppContext";
import { FiGrid } from "react-icons/fi";

export const Vegitable = ({ isLoggedIn }) => {
  const { products } = useAppContext();

  const veggieItems = products.filter(
    (item) => item.category === "Organic Veggies"
  );

  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="w-full bg-emerald-50/50 py-8 lg:py-12 border-b border-emerald-100 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
            <div className="w-8 h-px bg-emerald-600"></div>
            <FiGrid size={14} /> Shop by Category
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight leading-tight">
            100% <span className="text-emerald-600">Organic Veggies</span>
          </h1>
          <p className="text-slate-500 font-bold text-sm mt-4 max-w-xl leading-relaxed">
            Farm-fresh, pesticide-free, and healthy organic vegetables delivered daily straight to your kitchen.
          </p>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-8">
        <div className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-6
          gap-4
        ">
          {veggieItems.map((item) => (
            <Card
              key={item.id}
              item={item}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};
