import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CartItems } from "../components/CartItems";
import { OrderSummary } from "../components/OrderSummary";

export const Cart = () => {
  const { cart } = useSelector((state) => state);

  return (
    <div>
      {cart.length > 0 ? (
        <div className="flex flex-col lg:flex-row justify-center items-start w-11/12 mx-auto gap-10 lg:gap-[130px] bg-cover bg-center">
          {/* Left Side: Cart Items */}
          <div className="w-full lg:w-[600px]">
            <h1 className="text-2xl sm:text-3xl mt-8 uppercase text-center lg:text-left">
              My Cart
            </h1>
            <div className="h-[2px] w-20 bg-emerald-500 mt-1 mx-auto lg:mx-[40px]"></div>

            <p className="text-[#16A34A] text-lg font-semibold text-center lg:text-right lg:mr-5 mt-2">
              <span>Items </span>
              {cart.length}
            </p>

            <div className="mt-6">
              {cart.map((item, index) => (
                <CartItems key={item.id} item={item} itemIndex={index} />
              ))}
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="w-full lg:w-[420px]">
            <OrderSummary cart={cart} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-10">
          
          <h1 className="text-xl font-semibold">Your Cart Is Empty</h1>
          <p className="text-gray-600 mt-2">
            Looks like you haven’t added anything yet.
          </p>

          <Link to="/Grocery-App/">
            <button className="bg-[#4FBF8B] mt-7 px-4 py-3 text-white rounded-lg hover:bg-green-600 transition">
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
