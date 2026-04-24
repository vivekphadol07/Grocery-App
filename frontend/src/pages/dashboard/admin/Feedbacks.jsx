import React, { useEffect, useState } from "react";
import { feedbackApi } from "../../../services/api";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
import { FiMessageSquare, FiUser, FiMail, FiPhone, FiMapPin, FiClock, FiCheckCircle, FiFilter } from "react-icons/fi";

const Feedbacks = () => {
  const { token } = useAppContext();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterSubject, setFilterSubject] = useState("All");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await feedbackApi.list(token);
        setFeedbacks(res.feedbacks || []);
      } catch (error) {
        toast.error("Failed to fetch feedbacks");
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, [token]);

  const handleStatusUpdate = async (id, newStatus, adminResponse = null) => {
    try {
      const payload = { status: newStatus };
      if (adminResponse !== null) payload.adminResponse = adminResponse;
      
      await feedbackApi.updateStatus(id, payload, token);
      setFeedbacks(feedbacks.map(f => f._id === id ? { ...f, status: newStatus, adminResponse: adminResponse || f.adminResponse } : f));
      toast.success("Updated successfully");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "RESOLVED": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "IN_PROGRESS": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default: return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    }
  };

  const filteredFeedbacks = feedbacks.filter(item => 
    filterSubject === "All" || item.subject === filterSubject
  );

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Search & Filter Header - Matching System Style */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-black text-slate-800">Customer Messages</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Manage inquiries, complaints and feedback</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none relative">
            <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
            <select 
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="w-full sm:w-48 bg-slate-50 border border-slate-100 rounded-2xl pl-10 pr-4 py-3 text-xs font-bold text-slate-700 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/30 transition-all appearance-none cursor-pointer uppercase tracking-tight"
            >
              <option value="All">All Types</option>
              <option value="General Inquiry">Inquiries</option>
              <option value="Order Complaint">Complaints</option>
              <option value="Feedback">Feedback</option>
            </select>
          </div>
          <div className="bg-emerald-50 text-emerald-600 px-4 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-emerald-100 min-w-[100px] text-center">
            {filteredFeedbacks.length} Found
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredFeedbacks.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-20 text-center shadow-sm">
            <FiMessageSquare className="mx-auto text-slate-200 text-6xl mb-6" />
            <p className="text-slate-400 font-bold text-lg">No {filterSubject === "All" ? "messages" : filterSubject.toLowerCase()} found</p>
          </div>
        ) : (
          filteredFeedbacks.map((item) => (
            <div key={item._id} className="bg-white border border-slate-100 rounded-[2.5rem] p-6 sm:p-8 hover:shadow-xl hover:shadow-slate-200/50 transition-all group border-l-4 border-l-transparent hover:border-l-emerald-500">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-emerald-600 border border-slate-100 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                    <FiUser size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-800 leading-tight">{item.fullName}</h3>
                    <p className="text-xs font-bold text-slate-400">{item.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full border uppercase tracking-widest ${getStatusStyle(item.status)}`}>
                    {item.status}
                  </span>
                  {item.subject !== "Feedback" && (
                    <select 
                      value={item.status}
                      onChange={(e) => handleStatusUpdate(item._id, e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-slate-400 px-3 py-1 outline-none cursor-pointer hover:bg-white/10 transition-all uppercase tracking-widest"
                    >
                      <option value="NEW">New</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="RESOLVED">Resolved</option>
                    </select>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-400">
                    <FiMessageSquare size={14} className="text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Subject: {item.subject}</span>
                  </div>
                  {item.orderId && (
                    <div className="flex items-center gap-2 text-slate-400">
                      <FiCheckCircle size={14} className="text-rose-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">Order ID: {item.orderId}</span>
                    </div>
                  )}
                  <p className="text-sm font-bold text-slate-500 leading-relaxed bg-slate-50 p-5 rounded-3xl border border-slate-100">
                    {item.message}
                  </p>
                </div>
                
                <div className="bg-slate-50 rounded-[2rem] p-6 space-y-4 border border-slate-100">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-200 pb-2">Contact Details</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-xs text-slate-600">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                        <FiPhone size={14} />
                      </div>
                      <span className="font-bold">{item.phoneNo || "N/A"}</span>
                    </div>
                    <div className="flex items-start gap-4 text-xs text-slate-600">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                        <FiMapPin size={14} />
                      </div>
                      <span className="font-bold">{item.address || "No address provided"}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-600">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                        <FiClock size={14} />
                      </div>
                      <span className="font-bold">{new Date(item.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Section - Only for Complaints and Inquiries */}
              {item.subject !== "Feedback" && (
                <div className="mt-8 pt-8 border-t border-slate-100">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block pl-1">Admin Response</label>
                  <div className="flex flex-col gap-3">
                    <textarea 
                      defaultValue={item.adminResponse}
                      placeholder="Type your official response here..."
                      className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] p-5 text-sm text-emerald-600 font-bold outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all resize-none"
                      rows="3"
                      id={`response-${item._id}`}
                    />
                    <button 
                      onClick={() => {
                        const val = document.getElementById(`response-${item._id}`).value;
                        handleStatusUpdate(item._id, "RESOLVED", val);
                      }}
                      className="self-end bg-emerald-600 text-white text-[11px] font-black px-8 py-3 rounded-2xl uppercase tracking-widest hover:bg-emerald-700 hover:-translate-y-1 shadow-lg shadow-emerald-200 active:translate-y-0 transition-all"
                    >
                      Send Response & Resolve
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feedbacks;
