import React from "react";
import { items } from "../data";
import { HomeCardSection } from "./HomeCardSection";
import { Link } from "react-router-dom";

export const HotdealsSection = ({ isLoggedIn }) => {
  
  const getCheapestItems = (items) => {
    const grouped = items.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});

    
    let result = [];
    for (const category in grouped) {
      const cheapest = grouped[category]
        .sort((a, b) => a.price - b.price)
        .slice(0, 2);
      result = result.concat(cheapest);
    }
    return result;
  };

  const cheapestItems = getCheapestItems(items);

  return (
    < div className="mt-10 mb-6 w-full max-w-[1250px] mx-auto">
      <Link to="/hotdeals">
          <h1 className="text-2xl font-semibold mb-7">Hot Deals</h1>
      </Link>
      <HomeCardSection items={cheapestItems} isLoggedIn={isLoggedIn} />
    </div>
  );
};
