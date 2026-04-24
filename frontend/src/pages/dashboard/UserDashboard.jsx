import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { orderApi, authApi, feedbackApi } from "../../services/api";
import { Link, useLocation } from "react-router-dom";
import { 
  FiPackage, FiUser, FiShoppingBag, FiClock, 
  FiMapPin, FiHeart, FiSettings, FiEdit2, 
  FiTrash2, FiPlus, FiChevronRight, FiMessageSquare, FiCheckCircle, FiLogOut
} from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { toggle } from "../../redux/slices/WishlistSlice";
import { add } from "../../redux/slices/CartSlice";

export const UserDashboard = () => {
  const { user, token, logout, login } = useAppContext();
  const dispatch = useDispatch();
  const location = useLocation();
  const wishlist = useSelector((state) => state.wishlist);
  
  // Handle tab from URL query
  const queryParams = new URLSearchParams(location.search);
  const tabFromUrl = queryParams.get("tab");
  
  const [activeTab, setActiveTab] = useState(tabFromUrl || "profile");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userMessages, setUserMessages] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Sync tab with URL
  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Profile Form State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || ""
  });

  // Address Form State
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: ""
  });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await authApi.updateProfile(profileForm, token);
      if (res.success) {
        toast.success("Profile updated!");
        setIsEditingProfile(false);
        window.location.reload(); 
      }
    } catch (err) {
      toast.error(err.message || "Update failed");
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const newAddresses = [...(user?.addresses || []), addressForm];
      const res = await authApi.updateProfile({ addresses: newAddresses }, token);
      if (res.success) {
        toast.success("Address added!");
        setShowAddressForm(false);
        setAddressForm({ fullName: "", phone: "", addressLine: "", city: "", state: "", pincode: "" });
        window.location.reload();
      }
    } catch (err) {
      toast.error(err.message || "Failed to add address");
    }
  };

  const handleDeleteAddress = async (index) => {
    if (!window.confirm("Delete this address?")) return;
    try {
      const newAddresses = user.addresses.filter((_, i) => i !== index);
      const res = await authApi.updateProfile({ addresses: newAddresses }, token);
      if (res.success) {
        toast.success("Address removed");
        window.location.reload();
      }
    } catch (err) {
      toast.error("Failed to delete address");
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      const res = await orderApi.cancel(orderId, token);
      if (res.success) {
        toast.success("Order cancelled successfully");
        setOrders(orders.map(o => o._id === orderId ? { ...o, status: "CANCELLED" } : o));
      }
    } catch (err) {
      toast.error(err.message || "Failed to cancel order");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED": return "text-emerald-600 bg-emerald-50";
      case "CANCELLED": return "text-red-600 bg-red-50";
      case "SHIPPED": return "text-blue-600 bg-blue-50";
      default: return "text-orange-600 bg-orange-50";
    }
  };

  const tabs = [
    { id: "profile", name: "My Profile", icon: <FiUser /> },
    { id: "orders", name: "Orders", icon: <FiPackage /> },
    { id: "addresses", name: "Addresses", icon: <FiMapPin /> },
    { id: "wishlist", name: "Wishlist", icon: <FiHeart /> },
    { id: "support", name: "Support", icon: <FiMessageSquare /> },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const [orderRes, msgRes] = await Promise.all([
          orderApi.mine(token),
          feedbackApi.mine(token)
        ]);
        setOrders(orderRes.orders || []);
        setUserMessages(msgRes.feedbacks || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 pb-32 pt-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Sidebar Navigation - Desktop Only */}
          {!isMobile && (
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </div>
                  <div className="overflow-hidden">
                    <h2 className="font-bold text-gray-800 truncate">{user?.firstName} {user?.lastName}</h2>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                        ${activeTab === tab.id 
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-100" 
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
                      `}
                    >
                      {tab.icon}
                      {tab.name}
                      <FiChevronRight className={`ml-auto opacity-50 ${activeTab === tab.id ? 'block' : 'hidden'}`} />
                    </button>
                  ))}
                  <button 
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 font-medium hover:bg-red-50 transition-all mt-4"
                  >
                    <FiLogOut />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-3'} space-y-4`}>
            
            {/* Mobile Header */}
            {isMobile && (
               <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-800 text-sm">{user?.firstName} {user?.lastName}</h2>
                      <p className="text-[10px] text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <button onClick={logout} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <FiLogOut />
                  </button>
               </div>
            )}

            <div className={`space-y-3 ${!isMobile ? 'bg-white rounded-xl p-8 shadow-sm border border-gray-100' : ''}`}>
              
              {/* Profile Section */}
              <div className={`${isMobile ? 'bg-white rounded-xl border border-gray-100 overflow-hidden' : ''}`}>
                {isMobile && (
                  <button 
                    onClick={() => setActiveTab(activeTab === "profile" ? null : "profile")}
                    className="w-full flex items-center justify-between p-5 text-gray-800 font-semibold text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <FiUser className="text-emerald-600" />
                      <span>My Profile</span>
                    </div>
                    <FiChevronRight className={`transition-transform ${activeTab === "profile" ? 'rotate-90' : ''}`} />
                  </button>
                )}
                
                {(activeTab === "profile" || !isMobile) && (
                  <div className={`${isMobile ? 'px-5 pt-2 pb-8 border-t border-gray-50 bg-white' : ''}`}>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-800">Profile Information</h2>
                      {!isEditingProfile && (
                        <button onClick={() => setIsEditingProfile(true)} className="text-emerald-600 text-sm font-semibold flex items-center gap-1">
                          <FiEdit2 size={14} /> Edit
                        </button>
                      )}
                    </div>

                    {isEditingProfile ? (
                      <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs text-gray-500">First Name</label>
                            <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" value={profileForm.firstName} onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs text-gray-500">Last Name</label>
                            <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" value={profileForm.lastName} onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})} />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-gray-500">Phone Number</label>
                          <input type="tel" className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" value={profileForm.phone} onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})} />
                        </div>
                        <div className="flex gap-3 pt-2">
                          <button type="submit" className="px-6 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg">Save Changes</button>
                          <button type="button" onClick={() => setIsEditingProfile(false)} className="px-6 py-2 bg-gray-100 text-gray-600 text-sm font-semibold rounded-lg">Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12">
                        <div>
                          <label className="text-xs text-gray-400 block mb-0.5">Email Address</label>
                          <p className="text-sm font-medium text-gray-800">{user?.email}</p>
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 block mb-0.5">Phone Number</label>
                          <p className="text-sm font-medium text-gray-800">{user?.phone || "Not provided"}</p>
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 block mb-0.5">Joined On</label>
                          <p className="text-sm font-medium text-gray-800">{new Date(user?.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 block mb-0.5">Account Status</label>
                          <p className="text-xs font-bold text-emerald-600 uppercase">Active</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Orders Section */}
              <div className={`${isMobile ? 'bg-white rounded-xl border border-gray-100 overflow-hidden' : ''}`}>
                {isMobile && (
                  <button 
                    onClick={() => setActiveTab(activeTab === "orders" ? null : "orders")}
                    className="w-full flex items-center justify-between p-5 text-gray-800 font-semibold text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <FiShoppingBag className="text-emerald-600" />
                      <span>My Orders</span>
                    </div>
                    <FiChevronRight className={`transition-transform ${activeTab === "orders" ? 'rotate-90' : ''}`} />
                  </button>
                )}
                
                {(activeTab === "orders" || !isMobile) && (
                  <div className={`${isMobile ? 'px-5 pt-2 pb-8 border-t border-gray-50 bg-white' : ''}`}>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Order History</h2>

                    {loading ? (
                      <div className="py-10 flex justify-center"><div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div></div>
                    ) : orders.length === 0 ? (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-500 text-sm mb-3">You haven't placed any orders yet.</p>
                        <Link to="/allproducts" className="text-emerald-600 font-bold text-sm">Start Shopping</Link>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {orders.map(order => (
                          <div key={order._id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-all">
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Order #{order._id.slice(-8)}</span>
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${getStatusColor(order.status)}`}>{order.status}</span>
                            </div>
                            <div className="flex justify-between items-end">
                              <div className="flex -space-x-1.5">
                                {order.orderItems.slice(0, 3).map((item, i) => (
                                  <img key={i} src={item.image} className="w-8 h-8 rounded-full border-2 border-white bg-white object-contain shadow-sm" alt="" />
                                ))}
                                {order.orderItems.length > 3 && <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-[10px] border-2 border-white">+ {order.orderItems.length - 3}</div>}
                              </div>
                              <span className="font-bold text-gray-900">₹{order.totalPrice}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Addresses Section */}
              <div className={`${isMobile ? 'bg-white rounded-xl border border-gray-100 overflow-hidden' : ''}`}>
                {isMobile && (
                  <button 
                    onClick={() => setActiveTab(activeTab === "addresses" ? null : "addresses")}
                    className="w-full flex items-center justify-between p-5 text-gray-800 font-semibold text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <FiMapPin className="text-emerald-600" />
                      <span>Saved Addresses</span>
                    </div>
                    <FiChevronRight className={`transition-transform ${activeTab === "addresses" ? 'rotate-90' : ''}`} />
                  </button>
                )}
                
                {(activeTab === "addresses" || !isMobile) && (
                  <div className={`${isMobile ? 'px-5 pt-2 pb-8 border-t border-gray-50 bg-white' : ''}`}>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-800">Addresses</h2>
                      <button onClick={() => setShowAddressForm(!showAddressForm)} className="text-emerald-600 text-sm font-semibold flex items-center gap-1">
                        <FiPlus /> New
                      </button>
                    </div>

                    {showAddressForm ? (
                      <form onSubmit={handleAddAddress} className="space-y-3 bg-gray-50 p-4 rounded-xl">
                        <input required placeholder="Full Name" className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" value={addressForm.fullName} onChange={(e) => setAddressForm({...addressForm, fullName: e.target.value})} />
                        <input required placeholder="Phone Number" className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" value={addressForm.phone} onChange={(e) => setAddressForm({...addressForm, phone: e.target.value})} />
                        <input required placeholder="Street Address" className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" value={addressForm.addressLine} onChange={(e) => setAddressForm({...addressForm, addressLine: e.target.value})} />
                        <div className="grid grid-cols-2 gap-3">
                          <input required placeholder="City" className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" value={addressForm.city} onChange={(e) => setAddressForm({...addressForm, city: e.target.value})} />
                          <input required placeholder="Pincode" className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" value={addressForm.pincode} onChange={(e) => setAddressForm({...addressForm, pincode: e.target.value})} />
                        </div>
                        <div className="flex gap-2">
                          <button type="submit" className="flex-1 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg">Add Address</button>
                          <button type="button" onClick={() => setShowAddressForm(false)} className="px-4 py-2 bg-gray-200 text-gray-600 text-sm font-semibold rounded-lg">Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {user?.addresses?.length > 0 ? (
                          user.addresses.map((addr, i) => (
                            <div key={i} className="border border-gray-100 p-4 rounded-xl relative group">
                              <button onClick={() => handleDeleteAddress(i)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"><FiTrash2 /></button>
                              <h3 className="font-bold text-gray-800 text-sm mb-1">{addr.fullName}</h3>
                              <p className="text-xs text-gray-500 leading-relaxed">{addr.addressLine}, {addr.city} - {addr.pincode}</p>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-full text-center py-8 bg-gray-50 rounded-lg"><p className="text-gray-400 text-xs">No saved addresses</p></div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist Section */}
              <div className={`${isMobile ? 'bg-white rounded-xl border border-gray-100 overflow-hidden' : ''}`}>
                {isMobile && (
                  <button 
                    onClick={() => setActiveTab(activeTab === "wishlist" ? null : "wishlist")}
                    className="w-full flex items-center justify-between p-5 text-gray-800 font-semibold text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <FiHeart className="text-emerald-600" />
                      <span>My Wishlist</span>
                    </div>
                    <FiChevronRight className={`transition-transform ${activeTab === "wishlist" ? 'rotate-90' : ''}`} />
                  </button>
                )}
                
                {(activeTab === "wishlist" || !isMobile) && (
                  <div className={`${isMobile ? 'px-5 pt-2 pb-8 border-t border-gray-50 bg-white' : ''}`}>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Saved Items</h2>
                    {wishlist.length === 0 ? (
                      <div className="text-center py-10 bg-gray-50 rounded-lg"><p className="text-gray-500 text-xs">Your wishlist is empty</p></div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {wishlist.map(item => (
                          <div key={item._id} className="border border-gray-100 p-3 rounded-xl flex flex-col items-center text-center bg-white hover:shadow-sm transition-all">
                            <img src={item.image} className="w-20 h-20 object-contain mb-2" alt="" />
                            <h3 className="font-bold text-gray-800 text-[11px] mb-2 line-clamp-1">{item.name}</h3>
                            <button onClick={() => dispatch(add(item))} className="w-full py-1.5 bg-emerald-600 text-white text-[10px] font-bold rounded-lg uppercase">Add to Cart</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Support Section */}
              <div className={`${isMobile ? 'bg-white rounded-xl border border-gray-100 overflow-hidden' : ''}`}>
                {isMobile && (
                  <button 
                    onClick={() => setActiveTab(activeTab === "support" ? null : "support")}
                    className="w-full flex items-center justify-between p-5 text-gray-800 font-semibold text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <FiMessageSquare className="text-emerald-600" />
                      <span>Customer Support</span>
                    </div>
                    <FiChevronRight className={`transition-transform ${activeTab === "support" ? 'rotate-90' : ''}`} />
                  </button>
                )}
                
                {(activeTab === "support" || !isMobile) && (
                  <div className={`${isMobile ? 'px-5 pt-2 pb-8 border-t border-gray-50 bg-white' : ''}`}>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-800">Support Tickets</h2>
                      <Link to="/contactus" className="text-emerald-600 text-sm font-semibold">New Ticket</Link>
                    </div>

                    {userMessages.length === 0 ? (
                      <div className="text-center py-8 bg-gray-50 rounded-lg"><p className="text-gray-400 text-xs">No active support tickets</p></div>
                    ) : (
                      <div className="space-y-3">
                        {userMessages.map(msg => (
                          <div key={msg._id} className="border border-gray-100 p-4 rounded-xl">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[10px] font-bold uppercase text-emerald-600">{msg.subject}</span>
                              <span className="text-[10px] text-gray-400">{new Date(msg.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-2">{msg.message}</p>
                            {msg.adminResponse && (
                              <div className="mt-3 bg-gray-50 p-3 rounded-lg border-l-2 border-emerald-500">
                                <p className="text-[11px] font-medium text-gray-700">{msg.adminResponse}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
