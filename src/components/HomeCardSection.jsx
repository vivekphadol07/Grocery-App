import React, { useRef } from "react";
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";
import { Card } from "./Card";
import { Link } from "react-router-dom";

export const HomeCardSection = ({ title, items, isLoggedIn }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mt-10 mb-6 w-full max-w-[1250px] mx-auto">
      {/* <Link to={`/Grocery-App/${title}`}>
        <h1 className="text-xl font-semibold mb-5">{title}</h1>
      </Link> */}

      <h1 className="text-xl font-semibold mb-5">{title}</h1>

      <div className="relative">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
                 bg-white rounded-full shadow-md p-2 hover:scale-110 transition"
        >
          <FaLessThan size={12} />
        </button>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
                 bg-white rounded-full shadow-md p-2 hover:scale-110 transition"
        >
          <FaGreaterThan size={12} />
        </button>

        {/* Scrollable Cards */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-hidden gap-8 py-2 "
        >
          {(items || []).map((item) => (
            <Card key={item.id} item={item} isLoggedIn={isLoggedIn} />
          ))}
        </div>
      </div>
    </div>
  );
};
