import React from "react";
import { items } from "../data";
import { Card } from "../components/Card";
import { Footer } from "../components/Footer";

export const Dairy = (isLoggedIn) => {
  const dairyItems = items.filter((item) => item.category === "Dairy Products");
  return (
    <div className="flex flex-col">
      {/* Section Title */}
      <h1 className="text-2xl sm:text-3xl mt-10 text-center lg:text-left lg:mx-[100px] uppercase">
        Dairy Products
      </h1>
      <div className="h-[2px] w-20 bg-emerald-500 mt-1 mx-auto lg:ml-[265px]"></div>

      {/* Items Grid */}
      <div className="flex flex-wrap gap-6 mt-10 mx-4 sm:mx-6 justify-center">
        {dairyItems.map((item) => (
          <Card key={item.id} item={item} isLoggedIn={isLoggedIn}/>
        ))}
      </div>
      <Footer/>
    </div>
  );
};
