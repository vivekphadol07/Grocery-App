import React from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { decrement, increment, remove } from "../redux/slices/CartSlice";

export const CartItems = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div
      key={item.id}
      className="
    flex flex-col sm:flex-row items-center sm:items-start 
    sm:justify-between gap-4 
    border-b pt-4 w-full max-w-[700px] m-4 py-4 border-black/50 mb-2
  "
    >
      
      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="flex-grow text-center sm:text-left">
        <h2 className="text-base sm:text-lg font-semibold">{item.name}</h2>
        <p className="text-xs sm:text-sm text-gray-500">
          Qty: {item.quantity} | {item.unit}
        </p>

        <button
          onClick={() => dispatch(remove(item.id))}
          className="text-xs sm:text-sm text-gray-500 mt-2 hover:text-red-500 flex items-center justify-center sm:justify-start"
        >
          <MdDelete className="mr-1" />
          Remove
        </button>
      </div>

      <div className="flex flex-col items-center sm:items-end">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-center sm:text-right">
          <p className="text-xs sm:text-sm text-gray-400 line-through">
            ₹{(item.price + 10) * item.quantity}.00
          </p>
          <p className="text-base sm:text-lg font-bold text-green-600">
            ₹{item.price * item.quantity}.00
          </p>
        </div>

        <p className="text-xs sm:text-sm text-red-500 mt-1">
          You Save ₹{10 * item.quantity}.00
        </p>

        <div className="flex items-center mt-3 border border-gray-300 rounded-md">
          <button
            onClick={() => dispatch(decrement(item.id))}
            className="px-2 py-1 text-gray-500 hover:text-green-600 focus:outline-none"
          >
            -
          </button>

          <span className="px-3 py-1 bg-white text-gray-700">
            {item.quantity}
          </span>

          <button
            onClick={() => dispatch(increment(item.id))}
            className="px-2 py-1 text-gray-500 hover:text-green-600 focus:outline-none"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
