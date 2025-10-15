import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, decrement, increment } from "../redux/slices/CartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export const Card = ({ item, isLoggedIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItem = useSelector((state) =>
    state.cart.find((cartProduct) => cartProduct.id === item.id)
  );
  const quantity = cartItem ? cartItem.quantity : 0;

  const addToCart = () => {
    if (!isLoggedIn) {
      navigate("/Grocery-App/login");
      return;
    }
    dispatch(add(item));
    toast.success("Item Added to Cart");
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-emerald-500" />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-emerald-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-emerald-500" />);
      }
    }
    return stars;
  };

  return (
    <div>
      <div
        key={item.id}
        className="
          w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px]
          bg-white/40 rounded-xl shadow-md shadow-black/50
          p-3 flex flex-col justify-between
          border-black/5 border
        "
      >
        <img
          src={item.image}
          alt={item.name}
          className="h-[100px] sm:h-[110px] md:h-[120px] lg:h-[140px] object-contain mx-auto"
        />

        <h2 className="text-xs sm:text-sm font-semibold mt-1 truncate">
          {item.name}
        </h2>

        <p className="text-[10px] sm:text-xs text-gray-600">{item.unit}</p>

        <div className="flex items-center mt-1">{renderStars(item.rating)}</div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs sm:text-sm font-bold text-gray-800">
            ₹{item.price}
          </span>

          {quantity > 0 ? (
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => dispatch(decrement(item.id))}
                className="px-2 py-1 text-gray-500 text-xs hover:text-green-600 focus:outline-none"
              >
                -
              </button>

              <span className="px-3 py-1 text-xs bg-white text-gray-700">{quantity}</span>

              <button
                onClick={() => dispatch(increment(item.id))}
                className="px-2 py-1 text-gray-500 hover:text-green-600 focus:outline-none text-xs"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={addToCart}
              className="px-3 sm:px-4 py-1 text-xs sm:text-sm font-semibold text-green-600 border border-green-600 rounded-lg hover:bg-green-50"
            >
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
