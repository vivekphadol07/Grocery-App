import React from "react";
import { Footer } from "../components/Footer";

export const About = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-center items-center relative mt-10">
        <div className="lg:w-1/2 z-10 p-6 ml-20">
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
          <h2 className="text-2xl font-semibold mb-4">
            Fresh Products Directly To Your Home With Fast Delivery
          </h2>
          <p className="mb-4 text-[20px]">
            At FarmDirect, we bring fresh groceries and daily essentials
            directly to your home with fast and reliable delivery. Our goal is
            to make shopping easy, convenient, and affordable for everyone.
          </p>
          <p className="mb-4 text-[20px]">
            We carefully select high-quality products, from fresh fruits and
            vegetables to snacks, beverages, and household essentials, ensuring
            you get the best every time you shop with us.
          </p>
          <p className="mb-4 text-[20px]">
            Customer satisfaction is our priority, and we strive to provide a
            seamless online shopping experience, so you can spend less time
            shopping and more time enjoying life.
          </p>
          <p className="text-[20px] mb-4">
            Freshness, quality, and convenience — thats what we promise at
            FarmDirect.
          </p>
        </div>

        <div className="lg:w-1/2 relative">
          <img
            src={`${import.meta.env.BASE_URL}/aboutus.png`}
            alt="About Us"
            className="w-full h-auto object-cover -ml-16 lg:ml-0"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};
