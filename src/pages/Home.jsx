import React from "react";
import { Category } from "../components/Category";
import { HotdealsSection } from "../components/HotdealsSection";
import { Footer } from "../components/Footer";
import { BestSellerSection } from "../components/BestSellerSection";
import { SubscribeSection } from "../components/SubscribeSection";


export const Home = ({ isLoggedIn }) => {
  return (
    <div className="flex flex-col items-center mt-8 overflow-hidden">
      {/* Hero Container */}
      <div className="relative w-full max-w-[1250px]">
        <img
          src= {`${import.meta.env.BASE_URL}/homeimage.png`}
          alt="Hero"
          className="w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover rounded-lg"
        />

        {/* Overlay Text */}
        <div className="absolute top-[35%] lg:top-[25%] left-[45%] lg:left-[10px] text-center lg:text-left px-4 w-[650px]">
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold leading-snug text-black/100 drop-shadow-lg">
            The Best in Freshness, The Best in Savings.
          </h1>
          <button className="bg-[#16A34A] mt-6 px-6 py-3 text-white rounded-lg hover:bg-green-700 transition">
            Shop Now
          </button>
        </div>
      </div>

      {/* Sections Below */}

      <Category />
      <HotdealsSection isLoggedIn={isLoggedIn} />
      <BestSellerSection isLoggedIn={isLoggedIn} />

      <div className="w-full max-w-[1250px]">
        <img
         src={`${import.meta.env.BASE_URL}/homeimage2.jpg`}
          alt="Home"
          className="w-11/12 h-[300px] sm:h-[400px] lg:h-[480px] object-contain rounded-xl"
        />
      </div>

      <SubscribeSection />

      <Footer isLoggedIn={isLoggedIn} />
    </div>
  );
};
