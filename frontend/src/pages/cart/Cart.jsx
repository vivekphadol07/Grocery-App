import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CartItems } from "../../components/cart/CartItems";
import { OrderSummary } from "../../components/cart/OrderSummary";

export const Cart = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <div>
      {cart.length > 0 ? (
        <div className="flex flex-col lg:flex-row justify-center items-start w-11/12 mx-auto gap-10 lg:gap-[130px] bg-cover bg-center pb-32 lg:pb-10">
          {/* Left Side: Cart Items */}
          <div className="w-full lg:w-[600px]">
            <div className="mt-12 mb-8 flex flex-col items-center lg:items-start">
              <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight uppercase">
                My <span className="text-emerald-600">Cart</span>
              </h1>
              <div className="flex items-center gap-4 mt-3">
                <div className="h-1 w-12 bg-emerald-500 rounded-full"></div>
                <span className="text-emerald-600 font-black text-xs uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
                  {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
                </span>
              </div>
            </div>

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

          <Link to="/">
            <button className="bg-[#4FBF8B] mt-7 px-4 py-3 text-white rounded-lg hover:bg-green-600 transition">
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
