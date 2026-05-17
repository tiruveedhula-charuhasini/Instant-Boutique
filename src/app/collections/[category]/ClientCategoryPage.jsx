"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import SkeletonCard from "@/components/ui/SkeletonCard";
import { Filter, ChevronDown } from "lucide-react";
import { useProductFilters } from "@/hooks/useProductFilters";
import FilterSidebar from "@/components/shared/FilterSidebar";

export default function ClientCategoryPage({ initialProducts, categoryName }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const {
    selectedSubcategories,
    priceRange,
    sortOption,
    availableSubcategories,
    filteredAndSortedProducts,
    toggleSubcategory,
    handlePriceChange,
    handleSortChange,
    clearAllFilters
  } = useProductFilters(initialProducts);

  useEffect(() => {
    // Simulate network delay for premium feel
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Action Bar */}
      {initialProducts.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 py-4 border-b border-gray-200 gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 uppercase tracking-widest">{filteredAndSortedProducts.length} Products</span>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <select 
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full sm:w-auto appearance-none bg-transparent border border-gray-300 text-sm text-gray-700 py-3 pl-4 pr-10 focus:outline-none focus:border-[#9C528B] transition-colors rounded-sm cursor-pointer"
              >
                <option value="featured">Sort by Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
                <option value="trending">Trending Now</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
            </div>
            
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center justify-center gap-2 border px-6 py-3 text-sm uppercase tracking-widest transition-colors rounded-sm flex-1 sm:flex-none ${
                isFilterOpen ? "bg-[#9C528B] text-white border-[#9C528B]" : "border-gray-300 text-gray-700 hover:bg-[#FCFAFA]"
              }`}
            >
              <Filter size={16} />
              Filters
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-10">
        <FilterSidebar 
          isOpen={isFilterOpen}
          availableSubcategories={availableSubcategories}
          selectedSubcategories={selectedSubcategories}
          toggleSubcategory={toggleSubcategory}
          priceRange={priceRange}
          handlePriceChange={handlePriceChange}
          clearAllFilters={clearAllFilters}
        />

        {/* Product Grid */}
        <div className="flex-1 transition-all duration-300">
          {isLoading ? (
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${isFilterOpen ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-8`}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : filteredAndSortedProducts.length > 0 ? (
            <motion.div 
              layout
              className={`grid grid-cols-1 sm:grid-cols-2 ${isFilterOpen ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-8`}
            >
              <AnimatePresence>
                {filteredAndSortedProducts.map((product) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={product.id}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-center py-32 bg-[#FCFAFA] rounded-sm"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-serif)" }}>No results found</h3>
              <p className="text-gray-500 mb-6 text-lg">We couldn't find any products matching your selected filters.</p>
              <button 
                onClick={clearAllFilters}
                className="bg-[#9C528B] text-white px-8 py-3 uppercase tracking-widest text-sm font-medium hover:bg-[#2F0147] transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
