"use client";

import { useStore } from "@/context/StoreContext";
import { useToast } from "@/context/ToastContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, MessageCircle } from "lucide-react";

export default function CartPage() {
  const { cart, cartTotal, cartCount, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useStore();
  const { addToast } = useToast();

  const handleRemove = (item) => {
    removeFromCart(item.id);
    addToast({ message: `"${item.name}" removed from cart.`, type: "info" });
  };

  const handleClear = () => {
    clearCart();
    addToast({ message: "Cart cleared.", type: "info" });
  };

  const handleWhatsAppOrder = () => {
    const lines = cart.map(
      (item) => `• ${item.name} × ${item.quantity} — ₹${(item.price * item.quantity).toLocaleString("en-IN")}`
    );
    const msg = `Hello Instant Boutique! I'd like to place an order:\n\n${lines.join("\n")}\n\nTotal: ₹${cartTotal.toLocaleString("en-IN")}`;
    window.open(`https://wa.me/+919876543210?text=${encodeURIComponent(msg)}`, "_blank");
  };

  /* ── Empty State ─────────────────────────────────────────────────────────── */
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-6 text-center">
        {/* Decorative orb */}
        <div className="w-72 h-72 bg-[#E2C2C6]/20 rounded-full blur-3xl absolute pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div className="w-24 h-24 bg-[#EBD9F2] rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag size={40} className="text-[#9C528B]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2F0147] mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            Your Cart is Empty
          </h1>
          <p className="text-gray-500 mb-10 max-w-md text-base">
            Looks like you haven't added anything yet. Explore our curated collections and find something beautiful.
          </p>
          <Link href="/collections" className="btn-primary rounded-sm inline-flex items-center gap-4">
            
            Explore Collections
          </Link>
        </motion.div>
      </div>
    );
  }

  /* ── Cart with items ─────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-surface pt-28 pb-24">
      {/* Header */}
      <div className="bg-gradient-premium py-12 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #D4AF37 0%, transparent 60%)" }} />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-2">
            {cartCount} {cartCount === 1 ? "item" : "items"} in your bag
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-serif)" }}>
            Shopping Cart
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col xl:flex-row gap-10">

          {/* ── Left: Cart Items ───────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Column headers */}
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 pb-4 border-b border-[#E2C2C6]/40 text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">
              <span>Product</span>
              <span className="text-center">Price</span>
              <span className="text-center">Quantity</span>
              <span className="text-center">Subtotal</span>
              <span />
            </div>

            <AnimatePresence>
              {cart.map((item) => {
                const image = Array.isArray(item.images) ? item.images[0] : item.image;
                const subtotal = item.price * item.quantity;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -40, transition: { duration: 0.25 } }}
                    className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center py-6 border-b border-[#E2C2C6]/30 group"
                  >
                    {/* Product info */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-24 flex-shrink-0 rounded-sm overflow-hidden bg-[#F5EEF0] shadow-card">
                        <Image
                          src={image}
                          alt={item.name}
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#B9929F] uppercase tracking-widest mb-1">
                          {item.subcategory || item.category}
                        </p>
                        <Link href={`/collections/${item.category.toLowerCase()}/${item.id}`}>
                          <h3 className="font-semibold text-gray-900 hover:text-[#9C528B] transition-colors line-clamp-2" style={{ fontFamily: "var(--font-serif)" }}>
                            {item.name}
                          </h3>
                        </Link>
                        {item.fabric && (
                          <p className="text-xs text-gray-400 mt-1">{item.fabric}</p>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-center">
                      <span className="text-[#610F7F] font-bold text-sm">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center gap-2">
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-8 h-8 rounded-full border border-[#E2C2C6] flex items-center justify-center text-[#9C528B] hover:bg-[#E2C2C6]/30 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </motion.button>
                      <span className="w-8 text-center font-semibold text-gray-900 text-sm">
                        {item.quantity}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => increaseQuantity(item.id)}
                        className="w-8 h-8 rounded-full border border-[#E2C2C6] flex items-center justify-center text-[#9C528B] hover:bg-[#E2C2C6]/30 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </motion.button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-center">
                      <span className="font-bold text-gray-900 text-sm">
                        ₹{subtotal.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Remove */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRemove(item)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Clear cart */}
            <div className="mt-6 flex justify-between items-center">
              <Link href="/collections" className="flex items-center gap-2 text-sm text-[#610F7F] hover:text-[#2F0147] transition-colors uppercase tracking-widest font-medium">
                <ArrowLeft size={16} />
                Continue Shopping
              </Link>
              <button
                onClick={handleClear}
                className="text-sm text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* ── Right: Order Summary ───────────────────────────────────────── */}
          <div className="w-full xl:w-96 flex-shrink-0">
            <div className="glass-card rounded-sm p-8 sticky top-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-serif)" }}>
                Order Summary
              </h2>

              {/* Line items summary */}
              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 line-clamp-1 max-w-[200px]">
                      {item.name} <span className="text-gray-400">× {item.quantity}</span>
                    </span>
                    <span className="text-gray-900 font-medium flex-shrink-0 ml-4">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-[#E2C2C6] to-transparent mb-6" />

              {/* Totals */}
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal ({cartCount} items)</span>
                  <span className="font-medium">₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-green-600 font-medium">Calculated at enquiry</span>
                </div>
                <div className="h-px bg-[#E2C2C6]/30" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-[#610F7F]">₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-[#25D366] text-white py-4 flex items-center justify-center gap-2 uppercase tracking-widest text-sm font-semibold hover:bg-[#22c35e] transition-colors shadow-lg"
                >
                  <MessageCircle size={18} />
                  Order via WhatsApp
                </button>
                <Link
                  href="/contact"
                  className="w-full border-2 border-[#9C528B] text-[#9C528B] py-4 flex items-center justify-center uppercase tracking-widest text-sm font-semibold hover:bg-[#9C528B] hover:text-white transition-all duration-300"
                >
                  Contact Boutique
                </Link>
              </div>

              <p className="text-[10px] text-gray-400 text-center mt-4 leading-relaxed">
                All prices in INR. Final pricing confirmed via WhatsApp or in-store.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
