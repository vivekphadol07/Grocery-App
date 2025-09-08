import React from "react";
import { Card } from "../components/Card";
import { items } from "../data";
import { Footer } from "../components/Footer";

export const Vegitable = ({isLoggedIn}) => {
  const veggieItems = items.filter(
    (item) => item.category === "Organic Veggies"
  );
  return (
    <div className="flex flex-col">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl mt-10 text-center lg:text-left lg:mx-[100px] uppercase">
        Organic Veggies
      </h1>
      <div className="h-[2px] w-20 bg-emerald-500 mt-1 mx-auto lg:ml-[280px]"></div>

      {/* Items */}
      <div className="flex flex-wrap gap-6 mt-10 mx-4 sm:mx-6 justify-center">
        {veggieItems.map((item) => (
          <Card key={item.id} item={item} isLoggedIn={isLoggedIn}/>
        ))}
      </div>
      <Footer/>
    </div>
  );
};
