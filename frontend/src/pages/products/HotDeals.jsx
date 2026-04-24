import React from "react";
import { Footer } from "../../components/common/Footer";
import { Card } from "../../components/common/Card";
import { useAppContext } from "../../context/AppContext";
import { FiTrendingUp } from "react-icons/fi";

export const HotDeals = ({ isLoggedIn }) => {
  const { products } = useAppContext();

  const getCheapestItems = (items) => {
    const grouped = items.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});

    let result = [];
    for (const category in grouped) {
      const cheapest = grouped[category]
        .sort((a, b) => a.price - b.price)
        .slice(0, 2);
      result = result.concat(cheapest);
    }
    return result;
  };

  const cheapestItems = getCheapestItems(products);

  return (
    <div className="flex flex-col min-h-screen pb-32 lg:pb-10">

      {/* ===== TITLE ===== */}
      <div className="w-full bg-rose-50/50 py-8 lg:py-12 border-b border-rose-100 mb-8">
        <div className="max-w-[1250px] mx-auto w-full px-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-2 text-rose-500 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
            <div className="w-8 h-px bg-rose-500"></div>
            <FiTrendingUp size={14} /> Trending Now
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight leading-tight">
            Hot <span className="text-emerald-600">Deals</span> of the Week
          </h1>
          <p className="text-slate-500 font-bold text-sm mt-4 max-w-xl leading-relaxed">
            Grab these farm-fresh favorites at their lowest prices before they're gone!
          </p>
        </div>
      </div>

      {/* ===== GRID ===== */}
      <div
        className="
          max-w-[1250px]
          mx-auto
          w-full
          px-4
          mt-8
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-6
          gap-4
        "
      >
        {cheapestItems.map((item) => (
          <Card
            key={item.id}
            item={item}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
};
