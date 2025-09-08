import React from "react";
import { items } from "../data";
import { HomeCardSection } from "../components/HomeCardSection";
import { Footer } from "../components/Footer";

export const AllProducts = ({ isLoggedIn }) => {
  // Group and sort items by category
  const groupItemsByCategory = (items) => {
    return items.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});
  };

  const groupedItems = groupItemsByCategory(items);

  // Sort each category once
  const sortedGroupedItems = {};
  for (const category in groupedItems) {
    sortedGroupedItems[category] = groupedItems[category].sort(
      (a, b) => a.price - b.price
    );
  }

  return (
    <div className="mt-10  w-full  mx-auto overflow-hidden">
      <h1 className="text-2xl sm:text-3xl mt-10 text-center sm:text-left sm:mx-[100px] uppercase">
        All Products
      </h1>

      <div className="h-[2px] w-20 bg-emerald-500 mt-1 mx-auto sm:mx-[230px]"></div>

      {Object.keys(sortedGroupedItems).map((category) => (
        <div key={category} className="mt-8">
          <HomeCardSection
            title={category}
            items={sortedGroupedItems[category]}
            isLoggedIn={isLoggedIn}
          />
        </div>
      ))}

      <Footer/>
    </div>
  );
};
