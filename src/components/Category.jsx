import React from "react";
import { Link } from "react-router-dom";

export const Category = () => {
  return (
    <div className="mt-[30px] w-full max-w-[1250px] mx-auto">
      <Link to="/allproducts">
        <h1 className="text-2xl font-semibold mb-7">Category</h1>
      </Link>

      <div className="flex flex-row gap-x-8 flex-wrap">
        <Link to="/vegitable">
          <div className="w-[150px] h-[180px] bg-[#FFF6E5] rounded-xl shadow-md flex flex-col items-center justify-center p-3">
            <img
              src={`${import.meta.env.BASE_URL}/organic_vegitable_image.png`}
              alt=""
              className="w-[90px] h-[90px] object-contain"
            />

            <p className="mt-3 text-sm font-semibold text-gray-800 text-center">
              Orangic Veggies
            </p>
          </div>
        </Link>

        <Link to="/fruits">
          <div className="w-[150px] h-[180px] bg-[#FEE0E0] rounded-xl shadow-md flex flex-col items-center justify-center p-3">
            <img
              src= {`${import.meta.env.BASE_URL}/fresh_fruits_image.png`}
              alt=""
              className="w-[90px] h-[90px] object-contain"
            />
            <p className="mt-3 text-sm font-semibold text-gray-800 text-center">
              Fresh Fruits
            </p>
          </div>
        </Link>

        <Link to="/drinks">
          <div className="w-[150px] h-[180px] bg-[#F0F5DE] rounded-xl shadow-md flex flex-col items-center justify-center p-3">
            <img
              src={`${import.meta.env.BASE_URL}/bottles_image.png`}
              alt=""
              className="w-[90px] h-[90px] object-contain"
            />
            <p className="mt-3 text-sm font-semibold text-gray-800 text-center">
              Cold Drinks
            </p>
          </div>
        </Link>

        <Link to="/instant">
          <div className="w-[150px] h-[180px] bg-[#E1F5EC] rounded-xl shadow-md flex flex-col items-center justify-center p-3">
            <img
              src={`${import.meta.env.BASE_URL}/maggi_image.png`}
              alt=""
              className="w-[90px] h-[90px] object-contain"
            />
            <p className="mt-3 text-sm font-semibold text-gray-800 text-center">
              Instant Food
            </p>
          </div>
        </Link>

        <Link to="/dairy">
          <div className="w-[150px] h-[180px] bg-[#FEE6CD] rounded-xl shadow-md flex flex-col items-center justify-center p-3">
            <img
              src={`${import.meta.env.BASE_URL}/dairy_product_image.png`}
              alt=""
              className="w-[90px] h-[90px] object-contain"
            />
            <p className="mt-3 text-sm font-semibold text-gray-800 text-center">
              Dairy Products
            </p>
          </div>
        </Link>

        <Link to="/bakery">
          <div className="w-[150px] h-[180px] bg-[#E0F6FE] rounded-xl shadow-md flex flex-col items-center justify-center p-3">
            <img
              src={`${import.meta.env.BASE_URL}/bakery_image.png`}
              alt=""
              className="w-[90px] h-[90px] object-contain"
            />
            <p className="mt-3 text-sm font-semibold text-gray-800 text-center">
              Bakery & Breads
            </p>
          </div>
        </Link>

        <Link to="/grains">
          <div className="w-[150px] h-[180px] bg-[#F1E3F9] rounded-xl shadow-md flex flex-col items-center justify-center p-3">
            <img
              src={`${import.meta.env.BASE_URL}/grain_image.png`}
              alt=""
              className="w-[90px] h-[90px] object-contain"
            />
            <p className="mt-3 text-sm font-semibold text-gray-800 text-center">
              Grains
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
