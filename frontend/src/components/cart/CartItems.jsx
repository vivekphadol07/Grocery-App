import React from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { decrement, increment, remove } from "../../redux/slices/CartSlice";

export const CartItems = ({ item }) => {
  const dispatch = useDispatch();
  const itemId = item.id || item._id;

  return (
    <div
      className="
        flex flex-row items-center justify-between
        gap-4
        border-b py-4 w-full
        max-w-[700px]
      "
    >
      {/* IMAGE */}
      <div className="w-16 h-16 flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* DETAILS */}
      <div className="flex-1 min-w-0">
        <h2 className="text-sm font-semibold text-gray-900 truncate">
          {item.name}
        </h2>

        <p className="text-xs text-gray-500 mt-0.5">
          Qty: {item.quantity} | {item.unit}
        </p>

        <button
          onClick={() => dispatch(remove(itemId))}
          className="text-xs text-gray-500 mt-1 hover:text-red-500 flex items-center"
        >
          <MdDelete className="mr-1" />
          Remove
        </button>
      </div>

      {/* PRICE + CONTROLS */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <div className="text-right">
          <p className="text-xs text-gray-400 line-through">
            ₹{(item.price + 10) * item.quantity}.00
          </p>
          <p className="text-sm font-semibold text-green-600">
            ₹{item.price * item.quantity}.00
          </p>
          <p className="text-xs text-red-500">
            You Save ₹{10 * item.quantity}.00
          </p>
        </div>

        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <button
            onClick={() => dispatch(decrement(itemId))}
            className="px-2 py-1 text-gray-500 hover:text-green-600"
          >
            −
          </button>

          <span className="px-3 py-1 text-sm">
            {item.quantity}
          </span>

          <button
            onClick={() => {
                if (item.quantity < (item.stock ?? 999)) {
                    dispatch(increment(itemId));
                }
            }}
            disabled={item.quantity >= (item.stock ?? 999)}
            className={`px-2 py-1 text-gray-500 transition-colors ${item.quantity >= (item.stock ?? 999) ? 'opacity-20 cursor-not-allowed' : 'hover:text-green-600'}`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
