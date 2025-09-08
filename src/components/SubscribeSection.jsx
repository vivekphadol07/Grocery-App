import React from "react";

export const SubscribeSection = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-16 bg-white">
      {/* Heading */}
      <h2 className="text-4xl font-bold text-gray-800 mb-2">Never Miss a Deal!</h2>
      <p className="text-gray-500 mb-6 text-lg">
        Subscribe to get the latest offers, new arrivals, and exclusive discounts
      </p>

      {/* Input & Button */}
      <div className="flex w-full max-w-2xl">
        <input
          type="email"
          placeholder="Enter your email id"
          className="flex-1 px-4 py-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button className="bg-green-500 text-white px-6 py-3 rounded-r-md font-medium hover:bg-green-600 transition">
          Subscribe
        </button>
      </div>
    </div>
  );
};


