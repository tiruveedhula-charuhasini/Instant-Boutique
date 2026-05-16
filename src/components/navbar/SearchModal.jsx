"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search as SearchIcon,
  Sparkles,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";

export default function SearchModal({
  isOpen,
  onClose,
}) {
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch products
  useEffect(() => {
    if (isOpen && allProducts.length === 0) {
      setLoading(true);

      fetch("/api/products")
        .then((res) => res.json())
        .then((data) => {
          setAllProducts(data);
        })
        .catch((err) => {
          console.error("Search fetch failed", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isOpen, allProducts.length]);

  // Close on ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  // Filter results
  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();

    return allProducts
      .filter((product) => {
        return (
          product.name?.toLowerCase().includes(q) ||
          product.category?.toLowerCase().includes(q) ||
          product.subcategory?.toLowerCase().includes(q) ||
          product.fabric?.toLowerCase().includes(q) ||
          product.colors?.some((color) =>
            color.toLowerCase().includes(q)
          ) ||
          product.tags?.some((tag) =>
            tag.toLowerCase().includes(q)
          )
        );
      })
      .slice(0, 12);
  }, [query, allProducts]);

  if (!isOpen) return null;

  const trendingSearches = [
    "Banarasi Sarees",
    "Bridal Collection",
    "Pastel Dresses",
    "Party Wear",
    "Silk Sarees",
    "Festive Kurtis",
  ];

  return (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
    >
      {/* Search Box Container */}
      <motion.div
        initial={{ opacity: 0, y: -40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.96 }}
        transition={{
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20"
      >

        {/* Header */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-6 md:px-10 py-6">
          <div className="flex items-center gap-5">

            {/* Search Icon */}
            <SearchIcon
              size={24}
              className="text-[#9C528B]"
            />

            {/* Input */}
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sarees, silk, bridal collections..."
              className="flex-1 bg-transparent outline-none text-xl md:text-2xl text-[#2F0147] placeholder:text-gray-300"
              style={{
                fontFamily: "var(--font-playfair)",
              }}
            />

            {/* Close */}
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-[#F8F3F5] hover:bg-[#EAD7DC] flex items-center justify-center transition-all"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="max-h-[75vh] overflow-y-auto px-6 md:px-10 py-8">

          {/* Trending Searches */}
          {!query && (
            <div className="mb-10">
              <h3 className="text-sm uppercase tracking-[0.25em] text-[#9C528B] mb-5 font-semibold">
                Trending Searches
              </h3>

              <div className="flex flex-wrap gap-3">
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-5 py-2.5 rounded-full bg-[#F8F3F5] hover:bg-[#610F7F] hover:text-white transition-all text-sm"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-2 border-[#9C528B]/20 border-t-[#610F7F] rounded-full animate-spin"></div>
            </div>
          )}

          {/* Results */}
          {!loading && query && (
            <>
              {/* Top */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
                    Search Results
                  </p>

                  <h2
                    className="text-3xl text-[#2F0147] mt-2"
                    style={{
                      fontFamily: "var(--font-playfair)",
                    }}
                  >
                    "{query}"
                  </h2>
                </div>

                <p className="text-sm text-gray-500">
                  {results.length} Products
                </p>
              </div>

              {/* Empty */}
              {results.length === 0 ? (
                <div className="text-center py-20">
                  <h3
                    className="text-3xl text-[#2F0147] mb-3"
                    style={{
                      fontFamily: "var(--font-playfair)",
                    }}
                  >
                    No products found
                  </h3>

                  <p className="text-gray-500">
                    Try searching for Silk, Sarees, Bridal...
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/collections/${product.category.toLowerCase()}/${product.id}`}
                      onClick={onClose}
                      className="group"
                    >

                      {/* Product Image */}
                      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#F5EEF0] mb-4">
                        <Image
                          src={product.images?.[0]}
                          alt={product.name}
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>

                      {/* Info */}
                      <p className="text-[10px] uppercase tracking-[0.25em] text-[#9C528B] mb-1">
                        {product.category}
                      </p>

                      <h3
                        className="text-base text-gray-900 group-hover:text-[#610F7F] transition-colors line-clamp-2"
                        style={{
                          fontFamily: "var(--font-playfair)",
                        }}
                      >
                        {product.name}
                      </h3>

                      <p className="text-[#610F7F] font-bold mt-2">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);
}