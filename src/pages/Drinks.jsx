import React from "react";
import { items } from "../data";
import { Card } from "../components/Card";
import { Footer } from "../components/Footer";

export const Drinks = ({isLoggedIn}) => {
  const drinkItems = items.filter((item) => item.category === "Cold Drinks");
  return (
    <div className="flex flex-col">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl mt-10 text-center lg:text-left lg:mx-[100px] uppercase">
        Cold Drinks
      </h1>
      <div className="h-[2px] w-20 bg-emerald-500 mt-1 mx-auto lg:ml-[210px]"></div>

      {/* Items Grid */}
      <div className="flex flex-wrap gap-6 mt-10 mx-4 sm:mx-6 justify-center">
        {drinkItems.map((item) => (
          <Card key={item.id} item={item} isLoggedIn={isLoggedIn}/>
        ))}
      </div>
      <Footer/>
    </div>
  );
};
