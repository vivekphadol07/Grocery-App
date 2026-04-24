import React, { useMemo, useState } from "react";
import { HomeCardSection } from "../../components/home/HomeCardSection";
import { Footer } from "../../components/common/Footer";
import { useAppContext } from "../../context/AppContext";
import { FiGrid, FiChevronRight } from "react-icons/fi";

export const AllProducts = ({ isLoggedIn, searchQuery }) => {
  const { products } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ================= DYNAMIC CATEGORIES =================
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category))).filter(Boolean).sort();
    return ["All", ...cats];
  }, [products]);

  // ================= GROUP ITEMS BY CATEGORY =================
  const groupedItems = useMemo(() => {
    return products.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [products]);

  // ================= SORTED CATEGORIES =================
  const sortedCategories = useMemo(() => {
    const catsToDisplay = selectedCategory === "All" 
        ? categories.slice(1) 
        : [selectedCategory];

    return catsToDisplay
      .filter((cat) => groupedItems[cat])
      .map((cat) => [
        cat,
        [...groupedItems[cat]].sort((a, b) => a.price - b.price),
      ]);
  }, [groupedItems, categories, selectedCategory]);

  // ================= SEARCH FILTER =================
  const filteredItems = useMemo(() => {
    return products.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) &&
      (selectedCategory === "All" || item.category === selectedCategory)
    );
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="mt-10 w-full animate-fade-in pb-32 lg:pb-10">

      {/* ================= PAGE TITLE ================= */}
      <div className="w-full bg-emerald-50/50 py-8 lg:py-16 border-b border-emerald-100 mb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-[0.2em] mb-4">
            <FiGrid size={14} /> Marketplace
            <FiChevronRight size={10} className="text-slate-300" />
            <span className="text-slate-400">Inventory</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-800 tracking-tight leading-tight">
            Explore <span className="text-emerald-600">All Products</span>
          </h1>
          <p className="text-slate-500 font-bold text-sm sm:text-base mt-6 max-w-2xl leading-relaxed">
            Discover our complete catalogue of premium groceries, bringing you the best of nature right to your doorstep.
          </p>
        </div>
      </div>

      {/* ================= CATEGORY FILTER PILLS ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-3 overflow-x-auto pb-4 custom-scrollbar lg:flex-wrap">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`
                        px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 border-2
                        ${selectedCategory === cat 
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-500/20 scale-105" 
                            : "bg-white text-slate-400 border-slate-100 hover:border-emerald-500/30 hover:text-emerald-600"
                        }
                    `}
                >
                    {cat}
                </button>
            ))}
        </div>
      </div>

      {/* ================= PRODUCTS SECTION ================= */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pb-20">

        {/* ===== SEARCH RESULTS ===== */}
        {searchQuery && filteredItems.length > 0 && (
          <HomeCardSection
            title={`Search Results in ${selectedCategory}`}
            items={filteredItems}
            isLoggedIn={isLoggedIn}
          />
        )}

        {/* ===== NO PRODUCTS FOUND ===== */}
        {(searchQuery || selectedCategory !== "All") && filteredItems.length === 0 && (
          <div className="py-20 text-center animate-fade-in">
             <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FiGrid className="text-4xl text-slate-200" />
             </div>
             <h3 className="text-xl font-black text-slate-800">No products found</h3>
             <p className="text-slate-400 font-medium mt-2">Try adjusting your search or category filter.</p>
          </div>
        )}

        {/* ===== DYNAMIC CATEGORY VIEW ===== */}
        {!searchQuery && filteredItems.length > 0 &&
          sortedCategories.map(([category, items]) => (
            <div key={category} className="animate-slide-up">
                <HomeCardSection
                  title={category}
                  items={items}
                  isLoggedIn={isLoggedIn}
                />
            </div>
          ))
        }
      </div>

      <Footer />
    </div>
  );
};
