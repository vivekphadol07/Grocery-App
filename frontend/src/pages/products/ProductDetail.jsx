import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { productApi } from "../../services/api";
import { useAppContext } from "../../context/AppContext";
import { FiStar, FiShoppingBag, FiArrowLeft, FiHeart, FiChevronRight } from "react-icons/fi";
import toast from "react-hot-toast";
import { add } from "../../redux/slices/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../redux/slices/WishlistSlice";
import { Card } from "../../components/common/Card";

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useAppContext();
  const [product, setProduct] = useState(null);
  const wishlist = useSelector((state) => state.wishlist);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const cart = useSelector((state) => state.cart || []);
  
  const itemId = id;
  const cartItem = cart.find(i => String(i.id || i._id) === String(itemId));
  const cartQuantity = cartItem?.quantity || 0;
  const remainingStock = product ? (product.stock ?? 999) - cartQuantity : 0;

  const isInWishlist = wishlist.some(p => (p.id || p._id) === (product?.id || product?._id));

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await productApi.byId(id);
        if (res.success) {
          setProduct(res.product);
        } else {
          toast.error("Product not found");
          navigate("/");
        }
      } catch (error) {
        toast.error("Failed to load product details");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) return null;

  const handleAddToCart = () => {
    if (quantity > remainingStock) {
        toast.error(`Only ${remainingStock} more items available in stock`);
        return;
    }

    for (let i = 0; i < quantity; i++) {
        dispatch(add(product));
    }
    toast.success(`${quantity} x ${product.name} added to cart!`, {
      icon: "🛒",
      style: {
        borderRadius: "1rem",
        background: "#064e3b",
        color: "#fff",
        fontWeight: "bold",
      },
    });
    setQuantity(1);
  };

  const handleToggleWishlist = () => {
    dispatch(toggle(product));
    toast.success(isInWishlist ? "Removed from favorites" : "Saved to favorites", {
        icon: isInWishlist ? "💔" : "❤️"
    });
  };

  // Filter similar products
  const similarProducts = products
    .filter(p => p.category === product.category && (p.id || p._id) !== (product.id || product._id))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 pb-32 lg:pb-10">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Back Button & Breadcrumbs */}
        <div className="flex justify-between items-center mb-8">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold text-sm transition-colors group"
            >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Back to Shop
            </button>
            <button 
                onClick={handleToggleWishlist}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${isInWishlist ? 'bg-rose-50 text-rose-500 shadow-lg shadow-rose-100' : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-rose-500'}`}
            >
                <FiHeart className={isInWishlist ? "fill-rose-500" : ""} />
                {isInWishlist ? "Saved" : "Save for later"}
            </button>
        </div>

        <div className="bg-white rounded-[3.5rem] shadow-sm border border-slate-100 overflow-hidden mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Image Section */}
            <div className="p-8 lg:p-20 bg-slate-50/50 flex items-center justify-center relative border-b lg:border-b-0 lg:border-r border-slate-100">
               {product.stock <= 10 && product.stock > 0 && (
                <span className="absolute top-10 left-10 bg-orange-100 text-orange-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest z-10">
                  Only {product.stock} Left in Stock
                </span>
              )}
               {product.stock === 0 && (
                <span className="absolute top-10 left-10 bg-slate-200 text-slate-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest z-10">
                  Currently Unavailable
                </span>
              )}
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full max-w-md aspect-square object-contain animate-in fade-in zoom-in duration-700"
              />
            </div>

            {/* Info Section */}
            <div className="p-8 lg:p-20 flex flex-col">
              <div className="mb-10">
                <span className="text-emerald-600 text-xs font-black uppercase tracking-[0.25em] mb-4 block">
                  {product.category}
                </span>
                <h1 className="text-4xl lg:text-6xl font-black text-slate-800 tracking-tight mb-6 leading-tight">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100">
                        <FiStar className="fill-emerald-500 text-emerald-500" size={14} />
                        <span className="text-emerald-700 font-extrabold text-sm">Fresh Harvest</span>
                    </div>
                </div>
              </div>

              <div className="mb-12">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-black text-slate-900 tracking-tighter">₹{product.price}</span>
                  <span className="text-slate-400 font-bold text-xl">/ {product.unit}</span>
                </div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Highest quality produce guaranteed</p>
              </div>

              <div className="mb-12 text-slate-600 leading-relaxed font-medium">
                <h3 className="text-slate-800 font-black uppercase text-[10px] tracking-widest mb-4">Description</h3>
                <p className="whitespace-pre-line text-sm text-slate-500">
                    {product.description || "Premium quality, farm-fresh produce delivered directly to your kitchen. Our rigorous selection process ensures only the most nutrient-dense and flavorful items reach your table. Experience the peak of harvest maturity in every bite."}
                </p>
              </div>

              {/* Action Section */}
              <div className="mt-auto pt-10 border-t border-slate-50 flex flex-col sm:flex-row items-center gap-6">
                
                {/* Quantity Selector */}
                <div className="flex items-center bg-slate-50 rounded-[1.5rem] p-1.5 border border-slate-100 shrink-0">
                    <button 
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="w-12 h-12 flex items-center justify-center text-slate-400 font-black hover:bg-white hover:text-emerald-600 hover:rounded-2xl hover:shadow-sm transition-all"
                    >
                        −
                    </button>
                    <span className="w-14 text-center font-black text-slate-800 text-lg">{Math.min(quantity, Math.max(1, remainingStock))}</span>
                    <button 
                        onClick={() => setQuantity(q => Math.min(remainingStock, q + 1))}
                        disabled={quantity >= remainingStock}
                        className={`w-12 h-12 flex items-center justify-center font-black transition-all ${quantity >= remainingStock ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400 hover:bg-white hover:text-emerald-600 hover:rounded-2xl hover:shadow-sm'}`}
                    >
                        +
                    </button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || remainingStock <= 0}
                  className="flex-1 w-full bg-emerald-600 text-white py-5 px-10 rounded-[1.5rem] font-black flex items-center justify-center gap-3 shadow-2xl shadow-emerald-500/30 hover:bg-emerald-700 hover:-translate-y-1.5 active:translate-y-0 transition-all duration-300 disabled:bg-slate-200 disabled:shadow-none disabled:cursor-not-allowed"
                >
                  <FiShoppingBag size={20} />
                  {product.stock === 0 
                    ? "Temporarily Out of Stock" 
                    : remainingStock <= 0 
                      ? "Maximum Stock in Cart" 
                      : "Add to Shopping Cart"}
                </button>
              </div>

            </div>
          </div>
        </div>


        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Similar Products</h2>
                        <div className="h-1 w-12 bg-emerald-500 rounded-full mt-2"></div>
                    </div>
                    <Link to="/allproducts" className="text-emerald-600 font-black text-xs uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-2">
                        View All <FiChevronRight />
                    </Link>
                </div>
                <div className="flex overflow-x-auto pb-8 -mx-4 px-4 gap-6 scroll-smooth scrollbar-hide snap-x snap-mandatory">
                    {similarProducts.map(item => (
                        <div key={item.id || item._id} className="min-w-[200px] sm:min-w-[240px] snap-start">
                            <Card item={item} />
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
