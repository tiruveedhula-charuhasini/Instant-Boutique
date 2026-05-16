"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import SkeletonCard from "@/components/ui/SkeletonCard";
import { Filter, X, ChevronDown } from "lucide-react";

export default function ClientCategoryPage({ initialProducts, categoryName }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter States
  const [sortOption, setSortOption] = useState("featured");
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [priceRange, setPriceRange] = useState(50000);

  // Extract unique subcategories
  const subcategories = useMemo(() => {
    return [...new Set(initialProducts.map(p => p.subcategory))];
  }, [initialProducts]);

  useEffect(() => {
    // Simulate network delay for premium feel
    const timer = setTimeout(() => {
      setProducts(initialProducts);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [initialProducts]);

  const toggleSubcategory = (sub) => {
    setSelectedSubcategories(prev => 
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // 1. Filter by subcategory
    if (selectedSubcategories.length > 0) {
      result = result.filter(p => selectedSubcategories.includes(p.subcategory));
    }

    // 2. Filter by price
    result = result.filter(p => p.price <= priceRange);

    // 3. Sort
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result = result.filter(p => p.tags?.includes("new arrival"));
        break;
      case "trending":
        result = result.filter(p => p.tags?.includes("trending"));
        break;
      default:
        // featured: let's just show top rated first
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [products, sortOption, selectedSubcategories, priceRange]);

  return (
    <div>
      {/* Action Bar */}
      {products.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 py-4 border-b border-gray-200 gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 uppercase tracking-widest">{filteredAndSortedProducts.length} Products</span>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
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
        {/* Filter Sidebar */}
        <AnimatePresence>
          {isFilterOpen && (
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
                    {subcategories.map(sub => (
                      <label key={sub} className="flex items-center gap-3 cursor-pointer group">
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
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-[#9C528B]"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>₹1,000</span>
                    <span>₹50,000</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setSelectedSubcategories([]);
                    setPriceRange(50000);
                    setSortOption("featured");
                  }}
                  className="w-full py-3 border border-[#E2C2C6] text-[#9C528B] text-sm uppercase tracking-widest font-medium hover:bg-[#E2C2C6]/20 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
                onClick={() => { setSelectedSubcategories([]); setPriceRange(50000); setSortOption("featured"); }}
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
