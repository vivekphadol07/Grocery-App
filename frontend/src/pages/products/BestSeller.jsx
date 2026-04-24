import React from "react";
import { Footer } from "../../components/common/Footer";
import { Card } from "../../components/common/Card";
import { useAppContext } from "../../context/AppContext";
import { FiAward } from "react-icons/fi";

export const BestSeller = ({ isLoggedIn }) => {
  const { products } = useAppContext();
  const bestSellers = products.filter((item) => item.rating > 4.3);

  if (!bestSellers.length) {
    return (
      <p className="text-center mt-6 text-gray-500">
        No best sellers available.
      </p>
    );
  }

  return (
    <div className="min-h-screen pb-32 lg:pb-10">

      {/* HEADER */}
      <div className="w-full bg-emerald-50/50 py-8 lg:py-12 border-b border-emerald-100 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
            <div className="w-8 h-px bg-emerald-600"></div>
            <FiAward size={14} /> Customer Favorites
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight leading-tight">
            Our <span className="text-emerald-600">Best</span> Sellers
          </h1>
          <p className="text-slate-500 font-bold text-sm mt-4 max-w-xl leading-relaxed">
            The most loved products by our community, known for uncompromised quality and absolute freshness.
          </p>
        </div>
      </div>

      {/* GRID */}
      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          mt-5
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-6
          gap-4
        "
      >
        {bestSellers.map((item) => (
          <Card
            key={item.id}
            item={item}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};
