"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Tag, Trash2, Copy, CheckCircle2, X, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const couponSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 chars").toUpperCase(),
  type: z.enum(["percentage", "flat"]),
  value: z.coerce.number().min(1, "Value must be > 0"),
  minOrder: z.coerce.number().optional(),
  maxUses: z.coerce.number().optional(),
  expiryDate: z.string().min(1, "Expiry date required"),
});

const INITIAL_COUPONS = [
  { code: "SAVE20", type: "percentage", value: 20, minOrder: 1000, maxUses: 100, used: 47, expiryDate: "2026-06-30", active: true },
  { code: "FLAT500", type: "flat", value: 500, minOrder: 2000, maxUses: 50, used: 23, expiryDate: "2026-07-15", active: true },
  { code: "WELCOME10", type: "percentage", value: 10, minOrder: 500, maxUses: 200, used: 89, expiryDate: "2026-12-31", active: true },
  { code: "BRIDAL15", type: "percentage", value: 15, minOrder: 5000, maxUses: 30, used: 12, expiryDate: "2026-08-01", active: false },
];

const inputCls = "w-full px-4 py-2.5 bg-[#F8F4FF] dark:bg-white/5 border border-[#E2C2C6]/30 dark:border-white/10 rounded-xl text-sm text-[#2F0147] dark:text-white placeholder:text-[#9C528B]/30 outline-none focus:border-[#9C528B]/60 transition-colors";

export default function OffersPage() {
  const [coupons, setCoupons] = useState(INITIAL_COUPONS);
  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState(null);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(couponSchema),
    defaultValues: { type: "percentage" },
  });

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const onSubmit = async (data) => {
    await new Promise(r => setTimeout(r, 600));
    setCoupons(c => [{ ...data, used: 0, active: true }, ...c]);
    reset();
    setShowForm(false);
  };

  const deleteCoupon = (code) => setCoupons(c => c.filter(x => x.code !== code));
  const toggleActive = (code) => setCoupons(c => c.map(x => x.code === code ? { ...x, active: !x.active } : x));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl lg:text-3xl font-bold text-[#2F0147] dark:text-white">Offers & Coupons</h1>
          <p className="text-sm text-[#9C528B]/60 dark:text-white/40 mt-1">Create and manage discount codes</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2F0147] to-[#610F7F] text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active Coupons", value: coupons.filter(c => c.active).length },
          { label: "Total Uses", value: coupons.reduce((s,c)=>s+c.used,0) },
          { label: "Avg Discount", value: `${Math.round(coupons.filter(c=>c.type==="percentage").reduce((s,c)=>s+c.value,0) / (coupons.filter(c=>c.type==="percentage").length || 1))}%` },
        ].map(item => (
          <div key={item.label} className="bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 p-4">
            <p className="text-xs text-[#9C528B]/50 dark:text-white/30 uppercase tracking-widest">{item.label}</p>
            <p className="text-2xl font-bold text-[#2F0147] dark:text-white font-serif mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Create Coupon Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-[#1a0030] rounded-2xl p-6 max-w-lg w-full border border-[#E2C2C6]/30 dark:border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-serif text-xl font-bold text-[#2F0147] dark:text-white">Create Coupon</h3>
                <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-[#F5E6FF] dark:hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4 text-[#9C528B]" />
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 dark:text-white/40 mb-1.5 block">Coupon Code *</label>
                    <input {...register("code")} placeholder="SAVE20" className={`${inputCls} uppercase`} />
                    {errors.code && <p className="text-xs text-red-500 mt-1">{errors.code.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 dark:text-white/40 mb-1.5 block">Type *</label>
                    <select {...register("type")} className={inputCls}>
                      <option value="percentage">Percentage (%)</option>
                      <option value="flat">Flat (₹)</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 dark:text-white/40 mb-1.5 block">Value *</label>
                    <input {...register("value")} type="number" placeholder="20" className={inputCls} />
                    {errors.value && <p className="text-xs text-red-500 mt-1">{errors.value.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 dark:text-white/40 mb-1.5 block">Min Order (₹)</label>
                    <input {...register("minOrder")} type="number" placeholder="500" className={inputCls} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 dark:text-white/40 mb-1.5 block">Max Uses</label>
                    <input {...register("maxUses")} type="number" placeholder="100" className={inputCls} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 dark:text-white/40 mb-1.5 block">Expiry Date *</label>
                    <input {...register("expiryDate")} type="date" className={inputCls} />
                    {errors.expiryDate && <p className="text-xs text-red-500 mt-1">{errors.expiryDate.message}</p>}
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2F0147] to-[#610F7F] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg">
                  {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</> : "Create Coupon"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coupons List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {coupons.map((coupon, i) => (
          <motion.div key={coupon.code} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`bg-white dark:bg-[#1a0030]/60 rounded-2xl border p-5 ${coupon.active ? "border-[#E2C2C6]/20 dark:border-white/10" : "border-dashed border-[#E2C2C6]/30 dark:border-white/5 opacity-60"}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Tag className="w-4 h-4 text-[#D4AF37]" />
                  <span className="font-mono text-lg font-bold text-[#2F0147] dark:text-white">{coupon.code}</span>
                  <button onClick={() => copyCode(coupon.code)} className="text-[#9C528B]/40 hover:text-[#9C528B] transition-colors">
                    {copied === coupon.code ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="flex gap-2">
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${coupon.type === "percentage" ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"}`}>
                    {coupon.type === "percentage" ? `${coupon.value}% OFF` : `₹${coupon.value} OFF`}
                  </span>
                  {coupon.minOrder && (
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#F5E6FF] text-[#610F7F] dark:bg-[#610F7F]/20 dark:text-purple-300">
                      Min ₹{coupon.minOrder}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => toggleActive(coupon.code)}
                  className={`p-1.5 rounded-lg text-xs transition-colors ${coupon.active ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : "bg-amber-50 text-amber-600 hover:bg-amber-100"}`}>
                  {coupon.active ? "Active" : "Disabled"}
                </button>
                <button onClick={() => deleteCoupon(coupon.code)}
                  className="p-1.5 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#9C528B]/60 dark:text-white/30">
              <span>Used: {coupon.used}/{coupon.maxUses ?? "∞"}</span>
              <span>Expires: {coupon.expiryDate}</span>
            </div>
            {coupon.maxUses && (
              <div className="mt-2.5 h-1.5 bg-[#F5E6FF] dark:bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#610F7F] to-[#9C528B] rounded-full transition-all"
                  style={{ width: `${Math.min((coupon.used / coupon.maxUses) * 100, 100)}%` }} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
