"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle2, Trash2, Filter, AlertCircle } from "lucide-react";

const MOCK_REVIEWS = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  product: ["Banarasi Silk Saree","Bridal Lehenga","Anarkali Dress","Cotton Kurti","Silk Blouse"][i % 5],
  customer: ["Priya S.","Meera P.","Ananya R.","Kavya N.","Sneha I.","Pooja S.","Divya M.","Ritu K."][i % 8],
  rating: [5, 4, 5, 3, 4, 5, 4, 5, 3, 4, 5, 4, 5, 4, 3][i],
  review: [
    "Absolutely beautiful saree! The fabric quality is amazing.",
    "Perfect for weddings. Very elegant design.",
    "Great product, loved the color.",
    "Average quality for the price.",
    "Wonderful! Will buy again.",
  ][i % 5],
  approved: i % 3 !== 0,
  date: `${16 - i} May 2026`,
}));

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [filter, setFilter] = useState("All");

  const filtered = reviews.filter(r => {
    if (filter === "Pending") return !r.approved;
    if (filter === "Approved") return r.approved;
    return true;
  });

  const approve = (id) => setReviews(r => r.map(x => x.id === id ? { ...x, approved: true } : x));
  const remove = (id) => setReviews(r => r.filter(x => x.id !== id));

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl lg:text-3xl font-bold text-[#2F0147] dark:text-white">Reviews</h1>
        <p className="text-sm text-[#9C528B]/60 dark:text-white/40 mt-1">Manage and moderate customer reviews</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Reviews", value: reviews.length },
          { label: "Avg Rating", value: `${avgRating} ★` },
          { label: "Pending Approval", value: reviews.filter(r => !r.approved).length },
        ].map(item => (
          <div key={item.label} className="bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 p-4">
            <p className="text-xs text-[#9C528B]/50 dark:text-white/30 uppercase tracking-widest">{item.label}</p>
            <p className="text-2xl font-bold text-[#2F0147] dark:text-white font-serif mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {["All","Pending","Approved"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === f ? "bg-[#610F7F] text-white" : "bg-[#F5E6FF] dark:bg-white/10 text-[#9C528B] dark:text-white/60"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Reviews */}
      <div className="space-y-3">
        {filtered.map((review, i) => (
          <motion.div key={review.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#610F7F] to-[#9C528B] flex items-center justify-center text-white font-bold text-sm">
                    {review.customer[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#2F0147] dark:text-white">{review.customer}</p>
                    <p className="text-xs text-[#9C528B]/50 dark:text-white/30">{review.product} · {review.date}</p>
                  </div>
                  <div className="flex gap-0.5 ml-2">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-[#E2C2C6] dark:text-white/20"}`} />
                    ))}
                  </div>
                  {!review.approved && (
                    <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 font-medium">Pending</span>
                  )}
                  {review.approved && (
                    <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 font-medium">Approved</span>
                  )}
                </div>
                <p className="text-sm text-[#9C528B]/70 dark:text-white/50 pl-11">{review.review}</p>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                {!review.approved && (
                  <button onClick={() => approve(review.id)}
                    className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 hover:bg-emerald-100 transition-colors" title="Approve">
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
                <button onClick={() => remove(review.id)}
                  className="p-2 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 transition-colors" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Star className="w-12 h-12 text-[#9C528B]/20 mx-auto mb-3" />
            <p className="text-sm text-[#9C528B]/40 dark:text-white/30">No reviews to show</p>
          </div>
        )}
      </div>
    </div>
  );
}
