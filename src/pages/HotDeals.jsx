import React from 'react'
import { items } from '../data';
import { Footer } from '../components/Footer';
import { Card } from '../components/Card';

export const HotDeals = ({isLoggedIn}) => {
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
    <div className="flex flex-col">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl mt-10 text-center lg:text-left lg:mx-[100px] uppercase">
            Hot Deals
          </h1>
          <div className="h-[2px] w-20 bg-emerald-500 mt-1 mx-auto lg:ml-[180px]"></div>
    
          {/* Items */}
          <div className="flex flex-wrap gap-6 mt-10 mx-4 sm:mx-6 justify-center">
            {cheapestItems.map((item) => (
              <Card key={item.id} item={item} isLoggedIn={isLoggedIn}/>
            ))}
          </div>
          <Footer/>
        </div>
  )
}
