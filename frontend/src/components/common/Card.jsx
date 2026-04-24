import React from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { add, decrement, increment } from "../../redux/slices/CartSlice";
import { useAppContext } from "../../context/AppContext";
import { toggle } from "../../redux/slices/WishlistSlice";
import { FiStar, FiHeart } from "react-icons/fi";

export const Card = ({ item, isLoggedIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn: isAuthenticated } = useAppContext();
  const wishlist = useSelector((state) => state.wishlist);

  const canAccessCart = isLoggedIn || isAuthenticated;
  const itemId = item.id || item._id;

  const cartItem = useSelector((state) =>
    state.cart.find((product) => (product.id || product._id) === itemId)
  );
  const quantity = cartItem?.quantity || 0;
  const isInWishlist = wishlist.some((p) => (p.id || p._id) === itemId);

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!canAccessCart) {
      navigate("/login");
      return;
    }

    if (quantity >= (item.stock ?? 999)) {
      toast.error("Maximum stock reached");
      return;
    }
    dispatch(add(item));
    toast.success("Added to cart");
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!canAccessCart) {
      navigate("/login");
      return;
    }
    dispatch(toggle(item));
    toast.success(isInWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  const stopProp = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className="
        group
        bg-white
        border border-slate-100/60
        rounded-[2rem]
        p-4
        flex flex-col
        h-full
        hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]
        hover:-translate-y-1.5
        transition-all duration-500
        cursor-pointer
      "
    >
      <Link to={`/product/${itemId}`} className="flex flex-col h-full relative">
        {/* Wishlist Button */}
        <button 
          onClick={toggleWishlist}
          className={`
            absolute top-2 right-2 z-20 w-10 h-10 rounded-xl flex items-center justify-center 
            transition-all duration-300 backdrop-blur-md border border-white
            ${isInWishlist 
              ? "bg-rose-50 text-rose-500 shadow-lg shadow-rose-100" 
              : "bg-white/60 text-slate-400 hover:bg-white hover:text-rose-400"}
          `}
        >
          <FiHeart size={18} className={isInWishlist ? "fill-rose-500" : ""} />
        </button>

        <div className="relative flex items-center justify-center h-[160px] bg-white rounded-3xl overflow-hidden mb-4 group/img border border-slate-50 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
          <img
            src={item.image}
            alt={item.name}
            className="
              h-[120px]
              w-auto
              object-contain
              transition-transform
              duration-700
              ease-[cubic-bezier(0.34,1.56,0.64,1)]
              group-hover/img:scale-110
            "
          />
          {item.discount && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-sm">
              -{item.discount}%
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 px-1">
          <div className="flex items-center gap-1 mb-2 min-h-[1.5rem]">
             {item.stock <= 5 && item.stock > 0 && (
                <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100/50 uppercase">Low Stock</span>
             )}
          </div>

          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{item.unit}</p>
          <h3 className="text-[15px] font-semibold text-slate-800 leading-tight line-clamp-2 min-h-[2.4rem]">
            {item.name}
          </h3>

          <div className="mt-auto flex items-center justify-between gap-2 pt-4" onClick={stopProp}>
            <div className="flex flex-col">
              <span className="text-[17px] font-extrabold text-slate-900 tracking-tight">₹{item.price}</span>
              {item.oldPrice && (
                <span className="text-[11px] text-slate-400 line-through decoration-red-400/50">₹{item.oldPrice}</span>
              )}
            </div>

            {quantity > 0 ? (
              <div className="flex items-center bg-emerald-600 rounded-2xl p-0.5 shadow-lg shadow-emerald-600/20 border border-emerald-500/50">
                <button
                  onClick={() => dispatch(decrement(itemId))}
                  className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 transition-colors font-bold rounded-xl"
                >
                  -
                </button>
                <span className="px-1 text-sm font-bold text-white min-w-[1.5rem] text-center">{quantity}</span>
                <button
                  onClick={() => {
                    if (quantity < (item.stock ?? 999)) {
                        dispatch(increment(itemId));
                    } else {
                        toast.error("No more stock available");
                    }
                  }}
                  disabled={quantity >= (item.stock ?? 999)}
                  className={`w-8 h-8 flex items-center justify-center text-white transition-colors font-bold rounded-xl ${quantity >= (item.stock ?? 999) ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10'}`}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={addToCart}
                disabled={item.stock === 0}
                className={`
                  group/add
                  relative
                  px-4 py-2
                  flex items-center gap-2
                  text-[12px] font-bold
                  rounded-2xl
                  transition-all duration-300
                  active:scale-95
                  ${item.stock === 0 
                    ? "bg-slate-100 text-slate-400 border-2 border-slate-200 cursor-not-allowed" 
                    : "text-emerald-700 bg-white border-2 border-emerald-600/20 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:shadow-xl hover:shadow-emerald-600/20"}
                `}
              >
                <span>{item.stock === 0 ? "OUT" : "ADD"}</span>
                <span className="text-lg leading-none">{item.stock === 0 ? "" : "+"}</span>
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

