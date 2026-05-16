"use client";

import { useState } from "react";
import { useToast } from "@/context/ToastContext";

export default function NewsletterSection() {
  const { addToast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      addToast({ message: "Please enter a valid email address.", type: "error" });
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    addToast({
      message: "Welcome to the Boutique Club! 🎉 Check your inbox for a special gift.",
      type: "success",
      duration: 5000,
    });
    setEmail("");
  };

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-premium">
      {/* Decorative orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#9C528B]/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 text-center max-w-3xl relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 mb-6">
          <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse" />
          <span className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-medium">Exclusive Members</span>
        </div>

        <h2
          className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Join the Boutique Club
        </h2>
        <p className="text-white/60 mb-10 text-base md:text-lg max-w-xl mx-auto">
          Subscribe for exclusive early access to new collections, styling tips, and members-only offers.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-xl mx-auto shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-8 py-5 focus:outline-none bg-white/95 text-gray-900 placeholder:text-gray-400 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-10 py-5 bg-[#D4AF37] text-[#2F0147] uppercase tracking-widest text-sm font-bold hover:bg-[#F3E5AB] transition-colors duration-300 disabled:opacity-60 flex items-center justify-center gap-2 flex-shrink-0"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-[#2F0147]/30 border-t-[#2F0147] rounded-full animate-spin" />
            ) : "Subscribe"}
          </button>
        </form>

        <p className="text-white/30 text-xs mt-4">No spam, ever. Unsubscribe at any time.</p>
      </div>
    </section>
  );
}
