import React, { useEffect, useState } from "react";
import { 
  FiTrendingUp, FiShoppingBag, FiBox, FiUsers, 
  FiLogOut, FiMenu, FiSearch, FiFilter, FiPlus, FiChevronDown, FiUser
} from "react-icons/fi";
import { useAppContext } from "../../context/AppContext";
import { adminApi, orderApi, productApi, apiRequest, uploadApi, feedbackApi } from "../../services/api";
import toast from "react-hot-toast";

// Modular Admin UI Components
import { ProductModal } from "../../components/admin/ProductModal";
import { CouponModal } from "../../components/admin/CouponModal";
import Sidebar from "../../components/admin/Sidebar";

// Admin Sub-Pages
import Overview from "./admin/Overview";
import Orders from "./admin/Orders";
import Inventory from "./admin/Inventory";
import Customers from "./admin/Customers";
import Promotions from "./admin/Promotions";
import Feedbacks from "./admin/Feedbacks";

export const AdminDashboard = () => {
  const { token, logout } = useAppContext();
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Universal Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "", category: "", price: "", unit: "", image: "", stock: "", rating: "", description: "",
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [couponFormData, setCouponFormData] = useState({ 
    code: "", discountType: "PERCENTAGE", discountValue: "", minOrderValue: "", description: "" 
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminApi.dashboard(token);
      setStats(response.stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchData = async (tab) => {
    setLoading(true);
    try {
      if (tab === "overview") {
        await fetchStats();
      } else if (tab === "orders") {
        const res = await orderApi.list(token);
        setItems(res.orders || []);
      } else if (tab === "products") {
        const res = await productApi.list("?limit=100");
        setItems(res.products || []);
      } else if (tab === "users") {
        const res = await apiRequest("/admin/users", { token });
        setItems(res.users || []);
      } else if (tab === "coupons") {
        const res = await adminApi.getCoupons(token);
        setItems(res.coupons || []);
      } else if (tab === "feedback") {
        const res = await feedbackApi.list(token);
        setItems(res.feedbacks || []);
      }
    } catch (error) {
      console.error(`Error fetching ${tab}:`, error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeTab);
    setIsSidebarOpen(false); 
    setSearchQuery(""); 
    setActiveFilter("All"); 
  }, [activeTab]);

  const updateOrderStatus = async (orderId, status) => {
    try {
      await orderApi.updateStatus(orderId, { status }, token);
      fetchData("orders");
      toast.success("Order status updated");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleToggleCoupon = async (id) => {
    try {
      await adminApi.toggleCoupon(id, token);
      toast.success("Coupon status updated");
      fetchData("coupons");
    } catch (error) {
      toast.error("Failed to toggle coupon");
    }
  };

  const handleSaveCoupon = async (e) => {
    e.preventDefault();
    try {
      await adminApi.createCoupon(couponFormData, token);
      toast.success("Coupon created successfully");
      setIsCouponModalOpen(false);
      fetchData("coupons");
    } catch (error) {
      toast.error(error.message || "Failed to create coupon");
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        unit: product.unit,
        image: product.image,
        stock: product.stock,
        rating: product.rating,
        description: product.description || "",
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "", category: "", price: "", unit: "", image: "", stock: "", rating: "", description: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await productApi.update(editingProduct._id, formData, token);
        toast.success("Product updated successfully");
      } else {
        await productApi.create(formData, token);
        toast.success("Product created successfully");
      }
      setIsModalOpen(false);
      fetchData("products");
    } catch (error) {
      toast.error(error.message || "Failed to save product");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size too large (max 5MB)");
      return;
    }

    const uploadFormData = new FormData();
    uploadFormData.append("image", file);

    setIsUploading(true);
    try {
      const res = await uploadApi.upload(uploadFormData, token);
      setFormData({ ...formData, image: res.imageUrl });
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error(error.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productApi.remove(id, token);
        toast.success("Product deleted");
        fetchData("products");
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  const availableFilters = React.useMemo(() => {
    if (activeTab === "products") {
        const cats = Array.from(new Set(items.map(p => p.category))).filter(Boolean).sort();
        return ["All", ...cats];
    }
    if (activeTab === "orders") {
        return ["All", "PLACED", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];
    }
    return ["All"];
  }, [items, activeTab]);

  const filteredItems = React.useMemo(() => {
    if (activeTab === "overview") return items;
    
    return items.filter(item => {
        const query = searchQuery.toLowerCase().trim();
        
        let matchesSearch = true;
        if (query) {
            if (activeTab === "products") {
                matchesSearch = item.name.toLowerCase().includes(query);
            } else if (activeTab === "orders") {
                const orderId = item._id.toLowerCase();
                const customer = (item.user?.firstName || "").toLowerCase();
                matchesSearch = orderId.includes(query) || customer.includes(query);
            } else if (activeTab === "users") {
                const name = `${item.firstName} ${item.lastName}`.toLowerCase();
                const email = item.email.toLowerCase();
                matchesSearch = name.includes(query) || email.includes(query);
            } else if (activeTab === "coupons") {
                matchesSearch = item.code.toLowerCase().includes(query);
            }
        }

        let matchesFilter = true;
        if (activeFilter !== "All") {
            if (activeTab === "products") {
                matchesFilter = item.category === activeFilter;
            } else if (activeTab === "orders") {
                matchesFilter = item.status === activeFilter;
            }
        }

        return matchesSearch && matchesFilter;
    });
  }, [items, searchQuery, activeFilter, activeTab]);

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex overflow-hidden font-sans text-slate-900">
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        logout={logout} 
      />

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-[#F8FAFC]">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 sm:px-10 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg lg:hidden transition-colors"
            >
              <FiMenu size={24} />
            </button>
            <div>
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-tighter sm:tracking-widest">
                {activeTab === "overview" ? "System Dashboard" : `${activeTab} Management`}
              </h2>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold uppercase hidden sm:flex">
                <span>Admin</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span className="text-emerald-500">Live Services</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 shadow-sm overflow-hidden text-emerald-600 hover:bg-emerald-100 hover:scale-105 transition-all cursor-pointer">
               <FiUser size={20} />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
            
            {activeTab !== "overview" && (
                <div className="bg-white p-3 sm:p-4 rounded-3xl border border-slate-100 shadow-premium flex flex-row items-center gap-2 sm:gap-4">
                    <div className="relative flex-1 w-full">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input 
                            type="text" 
                            placeholder={`Search by ${activeTab === 'orders' ? 'Order ID or Customer' : activeTab === 'users' ? 'Name or Email' : activeTab === 'coupons' ? 'Code' : 'Name'}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-3 text-sm font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/30 transition-all"
                        />
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-4 w-auto">
                        {(activeTab === "products" || activeTab === "orders") && (
                            <div className="relative flex-1 sm:flex-none" ref={filterRef}>
                                <button
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="w-full sm:w-56 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all flex items-center justify-between group"
                                >
                                    <div className="flex items-center gap-2">
                                        <FiFilter className="text-emerald-500" />
                                        <span className="truncate">
                                            {activeFilter === 'All' ? `All ${activeTab}` : activeFilter}
                                        </span>
                                    </div>
                                    <FiChevronDown className={`transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isFilterOpen && (
                                    <div className="absolute top-full right-0 left-0 sm:left-auto sm:w-64 mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2">
                                        <div className="px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">Filter {activeTab}</div>
                                        <div className="max-h-64 overflow-y-auto custom-scrollbar py-2">
                                            {availableFilters.map(f => (
                                                <button
                                                    key={f}
                                                    onClick={() => {
                                                        setActiveFilter(f);
                                                        setIsFilterOpen(false);
                                                    }}
                                                    className={`w-full text-left px-5 py-3 text-sm font-bold transition-all hover:bg-emerald-600 hover:text-white ${activeFilter === f ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600'}`}
                                                >
                                                    {f === 'All' ? `All ${activeTab}` : f}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-2 ml-auto sm:ml-0">
                            {activeTab === "products" && (
                                <button 
                                    onClick={() => handleOpenModal()}
                                    className="bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all flex items-center gap-2 group"
                                    title="Add Product"
                                >
                                    <FiPlus size={20} className="group-hover:rotate-90 transition-transform" />
                                    <span className="text-[11px] font-black uppercase tracking-widest hidden lg:inline">Add Product</span>
                                </button>
                            )}
                            {activeTab === "coupons" && (
                                <button 
                                    onClick={() => {
                                        setCouponFormData({ code: "", discountType: "PERCENTAGE", discountValue: "", minOrderValue: "", description: "" });
                                        setIsCouponModalOpen(true);
                                    }}
                                    className="bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all flex items-center gap-2 group"
                                    title="Add Coupon"
                                >
                                    <FiPlus size={20} className="group-hover:rotate-90 transition-transform" />
                                    <span className="text-[11px] font-black uppercase tracking-widest hidden lg:inline">Add Coupon</span>
                                </button>
                            )}
                            {(searchQuery || activeFilter !== "All") && (
                                <button 
                                    onClick={() => { setSearchQuery(""); setActiveFilter("All"); }}
                                    className="p-3 text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-2xl transition-all font-black text-xs uppercase tracking-widest"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between px-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {activeTab !== 'overview' && `${filteredItems.length} Result${filteredItems.length === 1 ? '' : 's'} Found`}
                </span>
            </div>
            
            {/* Conditional Rendering of Sub-Pages */}
            {activeTab === "overview" && (
              <Overview 
                stats={stats} 
                onRestock={(p) => { setActiveTab("products"); handleOpenModal(p); }} 
              />
            )}

            {activeTab === "orders" && (
              <Orders 
                items={filteredItems} 
                loading={loading} 
                onStatusChange={updateOrderStatus} 
              />
            )}

            {activeTab === "products" && (
              <Inventory 
                items={filteredItems} 
                loading={loading} 
                onEdit={handleOpenModal} 
                onDelete={handleDeleteProduct} 
              />
            )}

            {activeTab === "users" && (
              <Customers 
                items={filteredItems} 
                loading={loading} 
              />
            )}

            {activeTab === "coupons" && (
              <Promotions 
                items={filteredItems} 
                loading={loading} 
                onToggle={handleToggleCoupon} 
              />
            )}

            {activeTab === "feedback" && (
              <Feedbacks />
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      {isModalOpen && (
        <ProductModal 
          product={editingProduct}
          formData={formData}
          setFormData={setFormData}
          isUploading={isUploading}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProduct}
          onUpload={handleImageUpload}
          availableFilters={availableFilters}
        />
      )}

      {isCouponModalOpen && (
        <CouponModal 
          formData={couponFormData}
          setFormData={setCouponFormData}
          onClose={() => setIsCouponModalOpen(false)}
          onSave={handleSaveCoupon}
        />
      )}
    </div>
  );
};

