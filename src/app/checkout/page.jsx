"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/context/StoreContext";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, CheckCircle2, Loader2, MapPin, Phone,
  CreditCard, ShoppingBag, User, Wallet
} from "lucide-react";

const PAYMENT_METHODS = ["UPI", "Cash on Delivery", "WhatsApp Pay", "Net Banking"];

const inputCls =
  "w-full px-4 py-3 bg-[#F8F4FF] border border-[#E2C2C6]/50 rounded-xl text-sm text-[#2F0147] placeholder:text-[#9C528B]/40 outline-none focus:border-[#9C528B]/70 transition-colors";

export default function CheckoutPage() {
  const { cart, cartTotal, cartCount, clearCart, user } = useStore();
  const { addToast } = useToast();
  const router = useRouter();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "UPI",
  });
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Auth guard — redirect to login if not signed in
  useEffect(() => {
    if (!user) {
      router.replace("/login?redirect=/checkout");
    }
  }, [user, router]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Full name is required";
    if (!form.phone.trim() || !/^\+?[\d\s-]{8,}$/.test(form.phone))
      e.phone = "Valid phone number is required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim())    e.city    = "City is required";
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode))
      e.pincode = "Valid 6-digit pincode is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setPlacing(true);

    const payload = {
      customer: form.name,
      email:    form.email,
      phone:    form.phone,
      address:  `${form.address}, ${form.city} - ${form.pincode}`,
      paymentMethod: form.paymentMethod,
      items:    cart.length,
      amount:   cartTotal,
      date:     new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      products: cart.map((i) => ({ id: i.id, name: i.name, qty: i.quantity, price: i.price })),
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setOrderId(data.order.id);
        setPlaced(true);
        clearCart();
        addToast({ message: "Order placed successfully! 🎉", type: "success" });
      } else {
        addToast({ message: data.error || "Failed to place order.", type: "error" });
      }
    } catch {
      addToast({ message: "Network error. Please try again.", type: "error" });
    } finally {
      setPlacing(false);
    }
  };

  // ── Empty cart guard ──────────────────────────────────────────────────────
  if (cart.length === 0 && !placed) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-center px-6 text-center">
        <ShoppingBag size={56} className="text-[#9C528B]/30 mb-6" />
        <h1 className="text-2xl font-bold text-[#2F0147] mb-2" style={{ fontFamily: "var(--font-serif)" }}>
          Your cart is empty
        </h1>
        <p className="text-[#9C528B]/60 mb-8">Add items to your cart before checking out.</p>
        <Link href="/collections" className="btn-primary rounded-sm">Browse Collections</Link>
      </div>
    );
  }

  // ── Success state ─────────────────────────────────────────────────────────
  if (placed) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-center px-6 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.6 }}>
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={52} className="text-emerald-600" />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h1 className="text-3xl font-bold text-[#2F0147] mb-2" style={{ fontFamily: "var(--font-serif)" }}>
            Order Placed!
          </h1>
          <p className="text-[#9C528B]/70 mb-2">Your order has been successfully placed.</p>
          <p className="text-lg font-mono font-bold text-[#610F7F] mb-8">{orderId}</p>
          <p className="text-sm text-[#9C528B]/50 mb-8 max-w-sm mx-auto">
            Our team will review your order and contact you on <strong>{form.phone}</strong> to confirm.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/" className="btn-primary rounded-sm text-sm px-8">Back to Home</Link>
            <Link href="/collections" className="btn-outline rounded-sm text-sm px-8">Continue Shopping</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Checkout form ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FFF8F0] pt-28 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2F0147] to-[#610F7F] py-10 mb-12">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-1">Secure Checkout</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-serif)" }}>
            Complete Your Order
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col xl:flex-row gap-10">

          {/* ── Left: Form ── */}
          <div className="flex-1 min-w-0">
            <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-[#610F7F] hover:text-[#2F0147] mb-8 transition-colors uppercase tracking-widest font-medium">
              <ArrowLeft size={16} /> Back to Cart
            </Link>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Info */}
              <div className="bg-white rounded-2xl border border-[#E2C2C6]/30 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-[#F5E6FF] rounded-lg flex items-center justify-center">
                    <User size={16} className="text-[#610F7F]" />
                  </div>
                  <h2 className="text-base font-bold text-[#2F0147]" style={{ fontFamily: "var(--font-serif)" }}>
                    Customer Details
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 mb-1.5">
                      Full Name *
                    </label>
                    <input value={form.name} onChange={(e) => set("name", e.target.value)}
                      placeholder="e.g. Priya Sharma" className={inputCls} />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 mb-1.5">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9C528B]/40" />
                      <input value={form.phone} onChange={(e) => set("phone", e.target.value)}
                        placeholder="+91 98765 43210" className={`${inputCls} pl-9`} />
                    </div>
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 mb-1.5">
                      Email (optional)
                    </label>
                    <input value={form.email} onChange={(e) => set("email", e.target.value)}
                      type="email" placeholder="email@example.com" className={inputCls} />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-2xl border border-[#E2C2C6]/30 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-[#F5E6FF] rounded-lg flex items-center justify-center">
                    <MapPin size={16} className="text-[#610F7F]" />
                  </div>
                  <h2 className="text-base font-bold text-[#2F0147]" style={{ fontFamily: "var(--font-serif)" }}>
                    Delivery Address
                  </h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 mb-1.5">
                      Street Address *
                    </label>
                    <textarea value={form.address} onChange={(e) => set("address", e.target.value)}
                      rows={3} placeholder="House No., Street, Area..."
                      className={`${inputCls} resize-none`} />
                    {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 mb-1.5">
                        City *
                      </label>
                      <input value={form.city} onChange={(e) => set("city", e.target.value)}
                        placeholder="e.g. Hyderabad" className={inputCls} />
                      {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 mb-1.5">
                        Pincode *
                      </label>
                      <input value={form.pincode} onChange={(e) => set("pincode", e.target.value)}
                        placeholder="500001" maxLength={6} className={inputCls} />
                      {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl border border-[#E2C2C6]/30 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-[#F5E6FF] rounded-lg flex items-center justify-center">
                    <Wallet size={16} className="text-[#610F7F]" />
                  </div>
                  <h2 className="text-base font-bold text-[#2F0147]" style={{ fontFamily: "var(--font-serif)" }}>
                    Payment Method
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {PAYMENT_METHODS.map((method) => (
                    <button key={method} type="button" onClick={() => set("paymentMethod", method)}
                      className={`p-3 rounded-xl border-2 text-xs font-semibold transition-all text-center ${
                        form.paymentMethod === method
                          ? "border-[#610F7F] bg-[#F5E6FF] text-[#610F7F]"
                          : "border-[#E2C2C6]/40 text-[#9C528B]/60 hover:border-[#9C528B]/40"
                      }`}>
                      {method}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-[#9C528B]/50 mt-3">
                  * Demo only — no real payment will be processed
                </p>
              </div>

              <motion.button type="submit" disabled={placing}
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                className="w-full bg-gradient-to-r from-[#2F0147] to-[#610F7F] text-white py-4 flex items-center justify-center gap-3 uppercase tracking-widest text-sm font-semibold shadow-lg disabled:opacity-70 rounded-sm"
              >
                {placing ? (
                  <><Loader2 size={18} className="animate-spin" /> Placing Order…</>
                ) : (
                  <><CreditCard size={18} /> Confirm Order</>
                )}
              </motion.button>
            </form>
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="w-full xl:w-96 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-[#E2C2C6]/30 p-6 shadow-sm sticky top-28">
              <h2 className="text-xl font-bold text-[#2F0147] mb-5" style={{ fontFamily: "var(--font-serif)" }}>
                Order Summary
              </h2>

              <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start">
                    <div className="w-12 h-12 rounded-lg bg-[#F5E6FF] flex-shrink-0 overflow-hidden">
                      {item.thumbnail || (Array.isArray(item.images) && item.images[0]) ? (
                        <img
                          src={item.thumbnail || item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag size={16} className="text-[#9C528B]/40" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#2F0147] line-clamp-1">{item.name}</p>
                      <p className="text-xs text-[#9C528B]/50">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-bold text-[#610F7F] flex-shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E2C2C6]/30 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#9C528B]/60">Subtotal ({cartCount} items)</span>
                  <span className="font-medium">₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#9C528B]/60">Shipping</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>
                <div className="h-px bg-[#E2C2C6]/30 my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-[#2F0147]">Total</span>
                  <span className="text-[#610F7F]">₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
