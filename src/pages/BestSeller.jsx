import React from "react";
import { items } from "../data";
import { Footer } from "../components/Footer";
import { Card } from "../components/Card";

export const BestSeller = ({isLoggedIn}) => {
  const bestSellers = items.filter((item) => item.rating > 4.3);

  if (!bestSellers.length) {
    return <p className="text-center mt-5">No best sellers available.</p>;
  }

  return (
    <div className="flex flex-col">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl mt-10 text-center lg:text-left lg:mx-[100px] uppercase">
        Best Seller
      </h1>
      <div className="h-[2px] w-20 bg-emerald-500 mt-1 mx-auto lg:ml-[200px]"></div>

      {/* Items */}
      <div className="flex flex-wrap gap-6 mt-10 mx-4 sm:mx-6 justify-center">
        {bestSellers.map( (item) => (
            <Card key={item.id} item={item} isLoggedIn={isLoggedIn}/>
        ))}
      </div>
      <Footer />
    </div>
  );
};
