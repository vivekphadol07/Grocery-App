import React from "react";
import { Footer } from "../../components/common/Footer";

export const About = () => {
  return (
    <div className="pb-32 lg:pb-10">
      <div className="flex flex-col lg:flex-row justify-center items-center relative mt-10 px-4 lg:px-10">
        
        {/* Text Section */}
        <div className="lg:w-1/2 z-10 p-4 lg:p-6 text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            About Us
          </h1>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Fresh Products Directly To Your Home With Fast Delivery
          </h2>

          <p className="mb-4 text-base sm:text-lg">
            At FarmDirect, we bring fresh groceries and daily essentials
            directly to your home with fast and reliable delivery. Our goal is
            to make shopping easy, convenient, and affordable for everyone.
          </p>

          <p className="mb-4 text-base sm:text-lg">
            We carefully select high-quality products, from fresh fruits and
            vegetables to snacks, beverages, and household essentials, ensuring
            you get the best every time you shop with us.
          </p>

          <p className="mb-4 text-base sm:text-lg">
            Customer satisfaction is our priority, and we strive to provide a
            seamless online shopping experience, so you can spend less time
            shopping and more time enjoying life.
          </p>

          <p className="text-base sm:text-lg">
            Freshness, quality, and convenience — that’s what we promise at
            FarmDirect.
          </p>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center mt-6 lg:mt-0">
          <img
            src={`${import.meta.env.BASE_URL}/aboutus.png`}
            alt="About Us"
            className="w-full max-w-md lg:max-w-full h-auto object-cover"
          />
        </div>

      </div>

      <Footer />
    </div>
  );
};
