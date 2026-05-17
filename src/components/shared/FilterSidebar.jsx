"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function FilterSidebar({
  isOpen,
  availableSubcategories,
  selectedSubcategories,
  toggleSubcategory,
  priceRange,
  handlePriceChange,
  clearAllFilters
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 300, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          className="hidden lg:block overflow-hidden flex-shrink-0"
        >
          <div className="pr-8 border-r border-gray-100 min-h-[500px]">
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-serif)" }}>Category</h3>
              <div className="space-y-3">
                {availableSubcategories.map(sub => (
                  <label key={sub} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={selectedSubcategories.includes(sub)}
                      onChange={() => toggleSubcategory(sub)}
                    />
                    <div className={`w-5 h-5 border rounded-sm flex items-center justify-center transition-colors ${
                      selectedSubcategories.includes(sub) ? "bg-[#9C528B] border-[#9C528B]" : "border-gray-300 group-hover:border-[#9C528B]"
                    }`}>
                      {selectedSubcategories.includes(sub) && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2.5 h-2.5 bg-white rounded-sm" />}
                    </div>
                    <span className="text-gray-600 text-sm">{sub}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "var(--font-serif)" }}>Max Price</h3>
                <span className="text-sm text-[#9C528B] font-medium">₹{priceRange.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="50000" 
                step="1000"
                value={priceRange}
                onChange={(e) => handlePriceChange(Number(e.target.value))}
                className="w-full accent-[#9C528B]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>₹1,000</span>
                <span>₹50,000</span>
              </div>
            </div>

            <button 
              onClick={clearAllFilters}
              className="w-full py-3 border border-[#E2C2C6] text-[#9C528B] text-sm uppercase tracking-widest font-medium hover:bg-[#E2C2C6]/20 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
