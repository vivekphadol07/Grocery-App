import React, { useRef } from "react";
import { Card } from "../common/Card";

export const HomeCardSection = ({ title, items, isLoggedIn }) => {
  const scrollRef = useRef(null);

  return (
    <section className="mt-8">

      {/* CATEGORY TITLE */}
      <div className="px-3 sm:px-0 mb-3">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold uppercase text-gray-800">
          {title}
        </h2>
        <div className="h-[2px] w-12 bg-emerald-500 mt-1"></div>
      </div>

      {/* HORIZONTAL SCROLL */}
      <div
        ref={scrollRef}
        className="
          flex gap-3
          overflow-x-auto
          scroll-smooth
          snap-x snap-mandatory
          py-2
          px-1
          scrollbar-hide
          touch-pan-x
        "
      >
        {(items || []).map((item) => (
          <div
            key={item.id}
            className="
              snap-start shrink-0
              w-[48%]
              sm:w-[32%]
              md:w-[24%]
              lg:w-[19%]
              xl:w-[16%]
            "
          >
            <Card item={item} isLoggedIn={isLoggedIn} />
          </div>
        ))}
      </div>
    </section>
  );
};
