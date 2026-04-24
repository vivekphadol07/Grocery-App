import React, { useMemo, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clear } from "../../redux/slices/CartSlice";
import { useAppContext } from "../../context/AppContext";
import { couponApi, apiRequest } from "../../services/api";
import { FiTag, FiMapPin, FiCheck, FiCreditCard, FiTruck } from "react-icons/fi";

export const OrderSummary = ({ cart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, placeOrder, user, isSubscribed, token } = useAppContext();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Address State
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  // Coupon State
  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [showAllCoupons, setShowAllCoupons] = useState(false);
  const [prevCart, setPrevCart] = useState(cart);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await couponApi.listPublic(token);
        setAvailableCoupons(res.coupons || []);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };
    if (token) fetchCoupons();
  }, [token]);

  // Logic to remove coupon if quantity is reduced
  useEffect(() => {
    if (appliedCoupon) {
      const isQuantityReduced = cart.some((item) => {
        const prevItem = prevCart.find(
          (p) => (p.id || p._id) === (item.id || item._id)
        );
        return prevItem && item.quantity < prevItem.quantity;
      });

      const isItemRemoved = prevCart.some(
        (prevItem) =>
          !cart.find((item) => (item.id || item._id) === (prevItem.id || prevItem._id))
      );

      if (isQuantityReduced || isItemRemoved) {
        setAppliedCoupon(null);
        setCouponCodeInput("");
        toast.error("Coupon removed due to cart changes");
      }
    }
    setPrevCart(cart);
  }, [cart, appliedCoupon]);

  const subtotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );
  const delivery = isSubscribed ? 0 : (subtotal >= 499 ? 0 : 40);
  
  const discount = useMemo(() => {
     if (!appliedCoupon) return 0;
     if (appliedCoupon.discountType === "PERCENTAGE") {
         return (subtotal * appliedCoupon.discountValue) / 100;
     }
     return appliedCoupon.discountValue;
  }, [appliedCoupon, subtotal]);

  const total = Math.max(0, subtotal + delivery - discount);

  // Razorpay Script Loading
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleApplyCoupon = async (codeFromCard = null) => {
      const code = codeFromCard || couponCodeInput;
      if (!code.trim()) return;
      if (!isLoggedIn) {
          toast.error("Please login to apply coupons");
          return;
      }
      
      setIsValidatingCoupon(true);
      try {
          const res = await couponApi.validate({ code, subtotal }, token);
          setAppliedCoupon(res.coupon);
          setCouponCodeInput(res.coupon.code);
          toast.success("Coupon applied successfully!");
          setShowAllCoupons(false); 
      } catch (error) {
          toast.error(error.message || "Invalid or expired coupon");
          setAppliedCoupon(null);
      } finally {
          setIsValidatingCoupon(false);
      }
  };

  const handleRazorpayPayment = async (orderData) => {
    const res = await loadRazorpayScript();

    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      // 1. Create Razorpay Order on Backend
      const { order: razorpayOrder } = await apiRequest("/payments/create-order", {
        method: "POST",
        token,
        body: { amount: total }
      });

      // 2. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "FreshGo Grocery",
        description: "Payment for your order",
        order_id: razorpayOrder.id,
        handler: async (response) => {
          try {
            // 3. Verify Payment on Backend
            await apiRequest("/payments/verify", {
              method: "POST",
              token,
              body: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                order_id: orderData._id
              }
            });

            dispatch(clear());
            toast.success("Payment successful and order placed!");
            navigate("/dashboard");
          } catch (error) {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          contact: user.phone || ""
        },
        theme: {
          color: "#10b981"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      toast.error(error.message || "Razorpay integration failed");
    }
  };

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (!cart.length) {
      toast.error("Cart is empty");
      return;
    }

    if (!user?.addresses?.length) {
        toast.error("Please add a delivery address in your profile first.");
        navigate("/dashboard");
        return;
    }

    const finalAddress = user.addresses[selectedAddressIndex];

    try {
      setIsPlacingOrder(true);
      const res = await placeOrder({
        items: cart.map((item) => ({
          productId: item._id || item.id,
          quantity: item.quantity,
        })),
        deliveryAddress: finalAddress,
        couponCode: appliedCoupon ? appliedCoupon.code : "",
        paymentMethod: paymentMethod,
      });

      if (paymentMethod === "ONLINE") {
        await handleRazorpayPayment(res.order);
      } else {
        dispatch(clear());
        toast.success("Order placed successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message || "Could not place order");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 mt-6 lg:mt-0 bg-white">
      <h2 className="text-base sm:text-lg font-semibold border-b pb-2 mb-4">Order Summary</h2>

      {/* Address Section */}
      <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
              <FiMapPin className="text-gray-500 text-sm" />
              <h3 className="font-semibold text-gray-700 text-xs sm:text-sm">Delivery Address</h3>
          </div>
          
          {user?.addresses?.length > 0 ? (
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {user.addresses.map((addr, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setSelectedAddressIndex(idx)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedAddressIndex === idx ? "border-emerald-500 bg-emerald-50" : "border-gray-100 hover:bg-gray-50"}`}
                      >
                          <div className="flex justify-between items-center">
                              <span className="font-medium text-sm">{addr.fullName}</span>
                              {selectedAddressIndex === idx && <FiCheck className="text-emerald-600" />}
                          </div>
                          <p className="text-xs text-gray-500 truncate">
                              {addr.addressLine}, {addr.city}
                          </p>
                      </div>
                  ))}
              </div>
          ) : (
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-gray-500 text-sm mb-2">No addresses found</p>
                  <button onClick={() => navigate("/dashboard")} className="text-emerald-600 font-semibold text-sm hover:underline">Add Address</button>
              </div>
          )}
      </div>

      {/* Payment Method Section */}
      <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
              <FiCreditCard className="text-gray-500 text-sm" />
              <h3 className="font-semibold text-gray-700 text-xs sm:text-sm">Payment Method</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setPaymentMethod("COD")}
                className={`flex items-center justify-center gap-2 p-2 rounded-lg border transition-all ${paymentMethod === "COD" ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-200 text-gray-600"}`}
              >
                  <FiTruck size={14} />
                  <span className="text-xs font-medium">COD</span>
              </button>
              <button 
                onClick={() => setPaymentMethod("ONLINE")}
                className={`flex items-center justify-center gap-2 p-2 rounded-lg border transition-all ${paymentMethod === "ONLINE" ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-200 text-gray-600"}`}
              >
                  <FiCreditCard size={14} />
                  <span className="text-xs font-medium">Online</span>
              </button>
          </div>
      </div>

      {/* Coupon Section */}
      <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FiTag className="text-gray-500 text-sm" />
                <h3 className="font-semibold text-gray-700 text-xs sm:text-sm">Coupon Code</h3>
              </div>
              {!appliedCoupon && availableCoupons.length > 0 && (
                <button onClick={() => setShowAllCoupons(true)} className="text-xs text-emerald-600 font-semibold hover:underline">View Offers</button>
              )}
          </div>
          <div className="flex gap-2">
              <input 
                type="text" 
                value={couponCodeInput} 
                onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())} 
                placeholder="Enter Code" 
                disabled={appliedCoupon} 
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-500 outline-none disabled:bg-gray-50" 
              />
              <button 
                onClick={() => appliedCoupon ? (setAppliedCoupon(null), setCouponCodeInput("")) : handleApplyCoupon()} 
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${appliedCoupon ? "bg-red-50 text-red-600 border border-red-200" : "bg-gray-800 text-white hover:bg-gray-900"}`}
              >
                {appliedCoupon ? "Remove" : "Apply"}
              </button>
          </div>
      </div>

      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between text-sm text-gray-600"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between text-sm text-gray-600"><span>Delivery Fee</span><span>{delivery === 0 ? "FREE" : `₹${delivery.toFixed(2)}`}</span></div>
        {discount > 0 && (<div className="flex justify-between text-sm text-emerald-600 font-medium"><span>Discount</span><span>-₹{discount.toFixed(2)}</span></div>)}
        <div className="flex justify-between text-base sm:text-lg font-bold text-gray-800 border-t pt-2 mt-2">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      <button 
        onClick={handleCheckout} 
        disabled={isPlacingOrder || !user?.addresses?.length} 
        className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold mt-6 hover:bg-emerald-700 transition-all disabled:opacity-50"
      >
        {isPlacingOrder ? "Processing..." : paymentMethod === "ONLINE" ? "Pay & Place Order" : "Place Order"}
      </button>

      {/* Coupon Modal */}
      {showAllCoupons && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAllCoupons(false)}></div>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm relative z-10 overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Available Offers</h3>
              <button onClick={() => setShowAllCoupons(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
              {availableCoupons.map(cpn => (
                <div 
                    key={cpn._id} 
                    className="p-3 rounded-xl border border-gray-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer"
                    onClick={() => handleApplyCoupon(cpn.code)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-emerald-700 uppercase tracking-wider">{cpn.code}</span>
                    <FiTag className="text-emerald-500" size={14} />
                  </div>
                  <p className="text-xs text-gray-600">{cpn.description || `Get ${cpn.discountValue} ${cpn.discountType === "PERCENTAGE" ? '%' : '₹'} off`}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
