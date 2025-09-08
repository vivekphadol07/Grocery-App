import React from "react";
import { items } from "../data";
import { Card } from "../components/Card";
import { Footer } from "../components/Footer";

export const Bakery = ({isLoggedIn}) => {
  const bakeryItems = items.filter(
    (item) => item.category === "Bakery & Breads"
  );
  return (
    <div className="flex flex-col">
      {/* Section Title */}
      <h1 className="text-2xl sm:text-3xl mt-10 text-center sm:text-left sm:mx-[100px] uppercase">
        Bakery & Breads
      </h1>

      {/* Underline */}
      <div className="h-[2px] w-20 bg-emerald-500 mt-1 mx-auto sm:mx-[275px]"></div>

      {/* Items Grid */}
      <div className="flex flex-wrap gap-6 mt-10 mx-4 sm:mx-6 justify-center sm:justify-start">
        {bakeryItems.map((item) => (
          <Card key={item.id} item={item} isLoggedIn={isLoggedIn} />
        ))}
      </div>
      <Footer/>
    </div>
  );
};
