import React from "react";
import { FiX, FiImage, FiLoader, FiUpload, FiChevronDown, FiPlus } from "react-icons/fi";
import { ModalField } from "./ModalField";

export const ProductModal = ({ product, formData, setFormData, isUploading, onClose, onSave, onUpload, availableFilters }) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fade-in" onClick={onClose}></div>
      <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-3xl relative z-10 overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
        <div className="p-8 sm:p-12 flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-none">
                {product ? "Edit" : "New"} <span className="text-emerald-600">Product</span>
              </h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">Inventory item details</p>
            </div>
            <button onClick={onClose} className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-slate-800 rounded-2xl transition-all">
              <FiX size={24} />
            </button>
          </div>

          <form onSubmit={onSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <ModalField label="Product Name" value={formData.name} placeholder="e.g. Organic Gala Apples" onChange={v => setFormData({...formData, name: v})} />
              <div className="grid grid-cols-2 gap-4">
                <ModalField label="Base Price (₹)" type="number" value={formData.price} placeholder="0.00" onChange={v => setFormData({...formData, price: v})} />
                <ModalField label="Unit" value={formData.unit} placeholder="e.g. 500g" onChange={v => setFormData({...formData, unit: v})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Category</label>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl font-bold text-sm outline-none transition-all flex items-center justify-between hover:border-emerald-500/20 focus:border-emerald-500/20"
                  >
                    <span className={formData.category ? "text-slate-700" : "text-slate-400"}>
                      {formData.category || "Select Category"}
                    </span>
                    <FiChevronDown className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div 
                      className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl z-[110] overflow-hidden animate-in fade-in slide-in-from-top-2"
                    >
                      <div className="max-h-64 overflow-y-auto custom-scrollbar">
                        <div className="px-5 py-3 text-xs font-bold text-slate-400 border-b border-slate-50">Select Category</div>
                        {availableFilters.slice(1).map(cat => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => {
                              setFormData({...formData, category: cat});
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors hover:bg-emerald-600 hover:text-white ${formData.category === cat ? 'bg-emerald-600 text-white' : 'text-slate-700'}`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({...formData, category: ""});
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-5 py-4 text-sm font-bold text-emerald-600 border-t border-slate-100 hover:bg-emerald-50 flex items-center gap-2 transition-colors"
                      >
                        + Add New Category...
                      </button>
                    </div>
                  )}
                </div>
                
                {(!availableFilters.slice(1).includes(formData.category) || !formData.category) && (
                    <input 
                      required
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      placeholder="Type new category name..."
                      className="w-full bg-white border border-emerald-500/20 p-4 rounded-xl font-bold text-sm outline-none shadow-lg shadow-emerald-500/5 animate-in fade-in slide-in-from-top-2 mt-2 focus:ring-4 focus:ring-emerald-500/5"
                    />
                )}
              </div>
              <ModalField label="Stock Count" type="number" value={formData.stock} placeholder="0" onChange={v => setFormData({...formData, stock: v})} />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Gallery Image</label>
                <div className="aspect-square w-full bg-slate-50 rounded-[2rem] border-4 border-dashed border-slate-100 flex items-center justify-center overflow-hidden group relative">
                  {formData.image ? (
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  ) : (
                    <FiImage className="text-5xl text-slate-200" />
                  )}
                  <div className={`absolute inset-0 bg-emerald-500/80 flex flex-col items-center justify-center text-white p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isUploading ? 'opacity-100' : ''}`}>
                    {isUploading ? (
                      <>
                        <FiLoader className="text-4xl animate-spin mb-3" />
                        <p className="text-[10px] font-black uppercase tracking-widest">Optimizing Media...</p>
                      </>
                    ) : (
                      <>
                          <FiUpload className="text-4xl mb-3" />
                          <p className="text-[10px] font-black uppercase tracking-widest">Select Product Media</p>
                      </>
                    )}
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={onUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        disabled={isUploading}
                      />
                  </div>
                </div>
                <input 
                  type="text" 
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500/10 p-3 rounded-xl outline-none text-[10px] font-medium text-slate-400 transition-all italic text-center"
                  placeholder="Or paste direct image URL here..."
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Description</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full h-32 bg-slate-50 border border-slate-100 focus:border-emerald-500/20 focus:ring-4 focus:ring-emerald-500/5 p-4 rounded-[1.5rem] outline-none text-sm font-medium text-slate-600 transition-all resize-none"
                placeholder="Brief product story or health benefits..."
              />
            </div>

            <div className="md:col-span-2 pt-4">
              <button 
                type="submit"
                className="w-full h-16 bg-emerald-600 text-white font-black text-lg rounded-[1.5rem] shadow-2xl shadow-emerald-500/20 hover:bg-emerald-700 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
              >
                {product ? "Confirm Edits" : "Launch Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
