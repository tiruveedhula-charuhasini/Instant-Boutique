"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { useToast } from "@/context/ToastContext";

const BADGE_STYLES = {
  "trending":    "bg-[#610F7F] text-white",
  "bestseller":  "bg-[#D4AF37] text-[#2F0147]",
  "new arrival": "bg-[#9C528B] text-white",
  "premium":     "bg-[#2F0147] text-[#D4AF37]",
  "festive":     "bg-[#B9929F] text-white",
};

export default function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist, openQuickView, addToCart, isInCart } = useStore();
  const { addToast } = useToast();
  const isWished  = isInWishlist(product.id);
  const inCart    = isInCart(product.id);
  const displayImage = Array.isArray(product.images) ? product.images[0] : product.image;
  const displayBadge = product.tags?.[0];

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
    addToast({
      message: isWished ? `"${product.name}" removed from wishlist.` : `"${product.name}" added to wishlist! ♥`,
      type: isWished ? "info" : "success",
    });
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    openQuickView(product);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    addToast({
      message: inCart ? `"${product.name}" quantity updated in cart.` : `"${product.name}" added to cart! 🛍️`,
      type: "success",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col"
    >
      <div className="relative overflow-hidden rounded-sm bg-[#F5EEF0] aspect-[3/4] mb-4 shadow-card">
        {displayBadge && (
          <div className="absolute top-3 left-3 z-10">
            <span className={`text-[10px] uppercase tracking-widest px-2.5 py-1 font-semibold ${BADGE_STYLES[displayBadge] || "bg-gray-700 text-white"}`}>
              {displayBadge}
            </span>
          </div>
        )}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-red-500 text-white text-[10px] px-2 py-1 font-bold">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          </div>
        )}
        <Image src={displayImage} alt={product.name} fill unoptimized className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-500" />

        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleWishlist} title={isWished ? "Remove from Wishlist" : "Add to Wishlist"} className="bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-luxury text-gray-900 hover:text-[#9C528B] hover:bg-[#FFF8F0] transition-all duration-300">
            <Heart size={18} className={isWished ? "fill-[#9C528B] text-[#9C528B]" : ""} />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleQuickView} title="Quick View" className="bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-luxury text-gray-900 hover:text-[#610F7F] hover:bg-[#FFF8F0] transition-all duration-300">
            <Eye size={18} />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleAddToCart} title="Add to Cart" className={`p-3 rounded-full shadow-luxury transition-all duration-300 backdrop-blur-sm ${inCart ? "bg-[#D4AF37] text-[#2F0147]" : "bg-white/95 text-gray-900 hover:text-[#D4AF37] hover:bg-[#FFF8F0]"}`}>
            <ShoppingBag size={18} />
          </motion.button>
        </div>
      </div>

      <div className="text-center px-1">
        <p className="text-[10px] text-[#B9929F] uppercase tracking-[0.2em] mb-1.5 font-medium">{product.subcategory || product.category}</p>
        <Link href={`/collections/${product.category.toLowerCase()}/${product.id}`}>
          <h3 className="text-base font-semibold text-gray-900 mb-2 hover:text-[#9C528B] transition-colors duration-300 line-clamp-2 leading-snug" style={{ fontFamily: "var(--font-serif)" }}>
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-center gap-2">
          <p className="text-[#610F7F] font-bold text-sm">₹{product.price.toLocaleString("en-IN")}</p>
          {product.originalPrice && product.originalPrice > product.price && (
            <p className="text-gray-400 text-xs line-through">₹{product.originalPrice.toLocaleString("en-IN")}</p>
          )}
        </div>
        {product.rating && (
          <div className="flex items-center justify-center gap-1 mt-1.5">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map((star) => (
                <svg key={star} className={`w-3 h-3 ${star <= Math.round(product.rating) ? "text-[#D4AF37]" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
            <span className="text-[10px] text-gray-400">({product.reviews})</span>
          </div>
        )}
        <button onClick={handleAddToCart} className={`mt-4 w-full py-2.5 text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${inCart ? "bg-[#D4AF37] text-[#2F0147]" : "bg-[#2F0147]/90 text-white hover:bg-[#610F7F]"}`}>
          {inCart ? "✓ In Cart" : "Add to Cart"}
        </button>
      </div>
    </motion.div>
  );
}
