import React, { useRef } from "react";
import { Card } from "../common/Card";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { FiChevronRight, FiChevronLeft, FiPlusSquare } from "react-icons/fi";

export const NewArrivalsSection = ({ isLoggedIn }) => {
  const { products } = useAppContext();
  const scrollRef = useRef(null);

  // Get the latest 8 products added to the system
  const newItems = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  if (newItems.length === 0) return null;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full relative mt-16 mb-20 px-4 group/section z-10">
      <div className="max-w-7xl mx-auto relative">
        
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 px-2">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-[0.2em]">
                <div className="w-8 h-px bg-emerald-600"></div>
                <FiPlusSquare /> Freshly Added
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight leading-tight">
                New <span className="text-emerald-600">Arrivals</span>
            </h2>
            <p className="text-slate-400 font-bold text-sm max-w-md leading-relaxed">
                Be the first to try our latest additions to the inventory.
            </p>
          </div>

          <Link
            to="/allproducts"
            className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-600 hover:translate-x-1 transition-all"
          >
            See What's New <FiChevronRight />
          </Link>
        </div>

        <div className="relative group/slider mt-4">
          {/* Navigation Buttons */}
          <button 
              onClick={() => scroll('left')}
              className="hidden md:flex absolute left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-slate-100 items-center justify-center text-slate-500 hover:text-emerald-600 transition-all duration-300 opacity-100 hover:scale-110"
          >
              <FiChevronLeft size={24} />
          </button>
          <button 
              onClick={() => scroll('right')}
              className="hidden md:flex absolute right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-slate-100 items-center justify-center text-slate-500 hover:text-emerald-600 transition-all duration-300 opacity-100 hover:scale-110"
          >
              <FiChevronRight size={24} />
          </button>

          <div 
            ref={scrollRef}
            className="flex flex-nowrap overflow-x-auto pb-8 -mx-4 px-4 gap-6 scroll-smooth scrollbar-hide snap-x snap-mandatory"
          >
            {newItems.map(item => (
              <div key={item.id || item._id} className="shrink-0 min-w-[200px] sm:min-w-[240px] md:min-w-[280px] snap-start">
                  <Card item={item} isLoggedIn={isLoggedIn} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
