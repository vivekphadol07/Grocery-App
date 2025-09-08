import React from "react";
import { items } from "../data";
import { HomeCardSection } from "./HomeCardSection";
import { Link } from "react-router-dom";

export const BestSellerSection = ({ isLoggedIn }) => {
  const bestSellers = items.filter(item => item.rating > 4.3);

  if (!bestSellers.length) {
    return <p className="text-center mt-5">No best sellers available.</p>;
  }

  return (
    <div className="mt-10 mb-6 w-full max-w-[1250px] mx-auto">
        <Link to="/bestseller">
            <h1 className="text-2xl font-semibold mb-7">Best Sellers</h1>
        </Link>

      <HomeCardSection items={bestSellers} isLoggedIn={isLoggedIn} />
    </div>
  );
};
