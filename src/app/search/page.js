"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, Search as SearchIcon } from "lucide-react";
import { useProductFilters } from "@/hooks/useProductFilters";
import FilterSidebar from "@/components/shared/FilterSidebar";
import ProductCard from "@/components/ui/ProductCard";
import SkeletonCard from "@/components/ui/SkeletonCard";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        // Filter by search query first
        let matches = data;
        if (query) {
          const q = query.toLowerCase();
          matches = data.filter(product => 
            product.name?.toLowerCase().includes(q) ||
            product.category?.toLowerCase().includes(q) ||
            product.subcategory?.toLowerCase().includes(q) ||
            product.fabric?.toLowerCase().includes(q) ||
            product.colors?.some(color => color.toLowerCase().includes(q)) ||
            product.tags?.some(tag => tag.toLowerCase().includes(q))
          );
        }
        setAllProducts(matches);
      })
      .finally(() => setLoading(false));
  }, [query]);

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
  } = useProductFilters(allProducts);

  return (
    <div className="min-h-screen bg-white px-6 md:px-12 py-28">
      <div className="mb-12">
        <h1
          className="text-4xl md:text-5xl font-bold text-[#2F0147]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Search Results
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          {query ? (
            <>Showing results for "<span className="font-semibold text-gray-900">{query}</span>"</>
          ) : (
            "All Products"
          )}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : allProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 border border-dashed border-gray-200 rounded-xl">
          <SearchIcon size={48} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            No products found
          </h2>
          <p className="text-gray-500 mb-8 text-center max-w-md">
            We couldn't find anything matching "{query}". Try a different search term or browse our collections.
          </p>
          <a
            href="/collections"
            className="bg-[#610F7F] text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-[#2F0147] transition-colors"
          >
            Explore Collections
          </a>
        </div>
      ) : (
        <div>
          {/* Action Bar */}
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

            <div className="flex-1 transition-all duration-300">
              {filteredAndSortedProducts.length > 0 ? (
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
                        className="relative"
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
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-2 border-[#9C528B]/20 border-t-[#610F7F] rounded-full animate-spin"></div></div>}>
      <SearchResults />
    </Suspense>
  );
}
