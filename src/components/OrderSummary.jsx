import React from "react";

export const OrderSummary = ({ cart }) => {
  // Calculate subtotal (price × quantity)
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = 50; // example fixed charge
  const discount = 0; // update logic later
  const total = subtotal + delivery - discount;

  return (
   <div className="
  w-full max-w-[420px] 
  rounded-xl shadow-md p-5 border border-gray-200 
  mt-6 sm:mt-10 py-8 sm:py-10
">
  {/* Title */}
  <h2 className="text-lg sm:text-xl font-semibold border-b pb-2 mb-4">
    Order Summary
  </h2>

  {/* Cart Items List */}
  <div className="space-y-2 mb-4">
    {cart.map((item) => (
      <div key={item.id} className="flex justify-between text-xs sm:text-sm">
        <span className="truncate w-[200px] sm:w-[250px]">
          {item.name}{" "}
          <span className="text-gray-500">x {item.quantity}</span>
        </span>
        <span className="font-medium">
          ₹{(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    ))}
  </div>

  {/* Divider */}
  <div className="border-t my-3"></div>

  {/* Price details */}
  <div className="space-y-2 text-xs sm:text-sm">
    <div className="flex justify-between">
      <span>
        Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)
      </span>
      <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-green-600">Delivery Charges</span>
      <span className="font-semibold">₹{delivery.toFixed(2)}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-green-600">Discount Price</span>
      <span>-₹{discount.toFixed(2)}</span>
    </div>
  </div>

  {/* Divider */}
  <div className="border-t my-3"></div>

  {/* Grand Total */}
  <div className="flex justify-between text-sm sm:text-base font-bold mb-4">
    <span>Total</span>
    <span>₹{total.toFixed(2)}</span>
  </div>

  {/* Checkout Button */}
  <button className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition">
    Proceed to Checkout
  </button>
</div>

  );
};
