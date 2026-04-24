import React from "react";
import { Link } from "react-router-dom";
import { resolveImagePath } from "../../utils/productUtils";

export const Category = () => {
  const categories = [
    { name: "Organic Veggies", path: "vegitable", img: "https://res.cloudinary.com/dzczhiz9h/image/upload/v1776622771/grocery_app_products/broccoli.jpg", bg: "from-[#FFF6E5] to-[#FFE8BC]" },
    { name: "Fresh Fruits", path: "fruits", img: "https://res.cloudinary.com/dzczhiz9h/image/upload/v1776622776/grocery_app_products/apple.jpg", bg: "from-[#FEE0E0] to-[#FFC9C9]" },
    { name: "Cold Drinks", path: "beverages", img: "https://res.cloudinary.com/dzczhiz9h/image/upload/v1776622787/grocery_app_products/minute_maid_orange_juice.jpg", bg: "from-[#F0F5DE] to-[#E2EDC1]" },
    { name: "Instant Food", path: "snacks", img: "https://res.cloudinary.com/dzczhiz9h/image/upload/v1776622789/grocery_app_products/maggi_image.png", bg: "from-[#E1F5EC] to-[#C4EBD9]" },
    { name: "Dairy Products", path: "dairy", img: "https://res.cloudinary.com/dzczhiz9h/image/upload/v1776622796/grocery_app_products/amul_butter.jpg", bg: "from-[#FEE6CD] to-[#FFD8B1]" },
    { name: "Bakery & Breads", path: "bakery", img: "https://res.cloudinary.com/dzczhiz9h/image/upload/v1776622799/grocery_app_products/Britannia_Whole_Wheat_Bread.jpg", bg: "from-[#E0F6FE] to-[#C1EDFD]" },
    { name: "Grains", path: "grains", img: "https://res.cloudinary.com/dzczhiz9h/image/upload/v1776622806/grocery_app_products/india_gate_basmati_rice.webp", bg: "from-[#F1E3F9] to-[#E3C9F4]" },
  ];

  return (
    <div className="mt-12 w-full max-w-7xl mx-auto px-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
          Shop by <span className="text-emerald-600">Category</span>
        </h2>
        <Link 
          to="/allproducts" 
          className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1 group"
        >
          View All <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      <div
        className="
          flex flex-nowrap gap-6
          overflow-x-auto
          pb-8
          scrollbar-hide
          snap-x snap-mandatory
          -mx-6 px-6
          scroll-smooth
        "
      >
        {categories.map((cat) => (
          <Link 
            key={cat.path}
            to={`/category/${cat.path}`} 
            className="shrink-0 w-[42%] sm:w-[160px] snap-start group"
          >
            <div className={`
              relative h-[180px] sm:h-[190px] 
              bg-gradient-to-br ${cat.bg}
              rounded-[2rem] shadow-sm 
              flex flex-col items-center justify-center p-4 
              transition-all duration-500 
              group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-emerald-900/10
            `}>
              <div className="bg-white/40 p-3 rounded-full backdrop-blur-sm mb-3 group-hover:scale-110 transition-transform duration-500">
                <img
                  src={resolveImagePath(cat.img)}
                  alt={cat.name}
                  className="w-[80px] sm:w-[90px] h-[80px] sm:h-[90px] object-contain drop-shadow-xl rounded-full"
                />
              </div>
              <p className="text-xs sm:text-[13px] font-black text-slate-800 text-center leading-tight">
                {cat.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
