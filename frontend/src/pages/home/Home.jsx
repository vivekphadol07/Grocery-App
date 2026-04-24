import React from "react";
import { Category } from "../../components/product/Category";
import { HotdealsSection } from "../../components/home/HotdealsSection";
import { Footer } from "../../components/common/Footer";
import { BestSellerSection } from "../../components/home/BestSellerSection";
import { SubscribeSection } from "../../components/home/SubscribeSection";
import { TrustBanner } from "../../components/home/TrustBanner";
import { SeasonalSection } from "../../components/home/SeasonalSection";
import { NewArrivalsSection } from "../../components/home/NewArrivalsSection";
import AutoSlider from "../../components/home/AutoSlider";

export const Home = ({ isLoggedIn }) => {

  const homeimagestop = [
  { src: "homeimage1.png", category: "vegitable" },
  { src: "homeimage2.png", category: "fruits" },
  { src: "homeimage3.png", category: "beverages" },
  { src: "homeimage4.png", category: "snacks" },
  { src: "homeimage5.png", category: "dairy" },
  { src: "homeimage6.png", category: "bakery" },
  { src: "homeimage7.png", category: "grains" },
  ];

  const homeimagesbottom = [
  { src: "homeimage11.png" },
  { src: "homeimage12.png" },
  { src: "homeimage13.png" },
  { src: "homeimage14.png"},
  { src: "homeimage15.png"},
  
  ];

  return (
    <div className="flex flex-col items-center mt-6 overflow-hidden pb-32 lg:pb-10">

      {/* ================= HERO SECTION ================= */}
      <div className="w-full">
        <AutoSlider
          images={homeimagestop}
          aspect="aspect-[16/6] md:aspect-[16/5]"
        />
      </div>

      <TrustBanner />

      {/* ================= SECTIONS ================= */}
      <Category />
      <HotdealsSection isLoggedIn={isLoggedIn} />
      <BestSellerSection isLoggedIn={isLoggedIn} />
      <SeasonalSection />
      <NewArrivalsSection isLoggedIn={isLoggedIn} />

      {/* ================= BANNER ================= */}
      <div className="w-full pb-10">
        <AutoSlider
          images={homeimagesbottom}
          height="h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px]"
        />
      </div>

      <SubscribeSection />
      <Footer isLoggedIn={isLoggedIn} />
    </div>
  );
};
