"use client";

import { useStore } from "@/context/StoreContext";
import { useToast } from "@/context/ToastContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, MessageCircle, ShoppingBag } from "lucide-react";
import ProductGallery from "./ProductGallery";

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView, wishlist, toggleWishlist, addToCart, isInCart } = useStore();
  const { addToast } = useToast();

  if (!quickViewProduct) return null;

  const isWished = wishlist.some((p) => p.id === quickViewProduct.id);
  const inCart   = isInCart(quickViewProduct.id);

  const handleWhatsApp = () => {
    const msg = `Hello Instant Boutique! I'm interested in the ${quickViewProduct.name} (Price: ₹${quickViewProduct.price.toLocaleString()}).`;
    window.open(`https://wa.me/+919876543210?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct);
    addToast({
      message: inCart
        ? `"${quickViewProduct.name}" quantity updated in cart.`
        : `"${quickViewProduct.name}" added to cart! 🛍️`,
      type: "success",
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-md shadow-2xl flex flex-col md:flex-row z-10"
        >
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur rounded-full text-gray-500 hover:text-gray-900 shadow-sm transition-colors"
          >
            <X size={20} />
          </button>

          {/* Gallery */}
          <div className="w-full md:w-1/2 p-6 md:p-8 bg-[#FCFAFA]">
            <ProductGallery images={quickViewProduct.images} altText={quickViewProduct.name} />
          </div>

          {/* Details */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm uppercase tracking-widest text-[#9C528B] font-medium">
                {quickViewProduct.subcategory || quickViewProduct.category}
              </span>
              <div className="flex gap-2">
                {quickViewProduct.tags?.map((tag) => (
                  <span key={tag} className="text-xs bg-[#E2C2C6]/30 text-[#610F7F] px-2 py-1 rounded-sm uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              {quickViewProduct.name}
            </h2>

            <div className="text-2xl text-[#610F7F] mb-6 font-bold">
              ₹{quickViewProduct.price.toLocaleString()}
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">{quickViewProduct.description}</p>

            <div className="space-y-3 mb-8">
              {[
                { label: "Fabric", value: quickViewProduct.fabric || "Premium Material" },
                { label: "Colors", value: quickViewProduct.colors?.join(", ") || "As shown" },
                { label: "Status", value: quickViewProduct.stockStatus || "In Stock", green: quickViewProduct.stockStatus === "In Stock" },
              ].map(({ label, value, green }) => (
                <div key={label} className="flex border-b border-gray-100 pb-2">
                  <span className="w-24 text-gray-500 text-sm">{label}</span>
                  <span className={`text-sm font-medium ${green ? "text-green-600" : "text-gray-900"}`}>{value}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-auto flex flex-col gap-3">
              {/* Add to Cart — primary */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 flex items-center justify-center gap-2 uppercase tracking-widest text-sm font-semibold transition-all duration-300 ${
                  inCart
                    ? "bg-[#D4AF37] text-[#2F0147] hover:bg-[#F3E5AB]"
                    : "bg-gradient-premium text-white hover:opacity-90"
                }`}
                style={{ background: inCart ? "#D4AF37" : undefined }}
              >
                <ShoppingBag size={18} />
                {inCart ? "✓ In Cart — Add More" : "Add to Cart"}
              </button>

              <div className="flex gap-3">
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 bg-[#25D366] text-white py-3.5 flex items-center justify-center gap-2 uppercase tracking-widest text-sm font-medium hover:bg-[#22c35e] transition-colors"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </button>
                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className={`px-5 py-3.5 border flex items-center justify-center gap-2 uppercase tracking-widest text-sm font-medium transition-all ${
                    isWished
                      ? "bg-[#E2C2C6]/20 border-[#9C528B] text-[#9C528B]"
                      : "border-gray-300 text-gray-700 hover:border-[#9C528B] hover:text-[#9C528B]"
                  }`}
                >
                  <Heart size={16} className={isWished ? "fill-[#9C528B]" : ""} />
                  {isWished ? "Saved" : "Wishlist"}
                </button>
              </div>
            </div>

            <a
              href={`/collections/${quickViewProduct.category.toLowerCase()}/${quickViewProduct.id}`}
              className="mt-5 text-center text-sm text-[#610F7F] hover:text-[#2F0147] underline underline-offset-4 uppercase tracking-widest"
            >
              View Full Details
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
