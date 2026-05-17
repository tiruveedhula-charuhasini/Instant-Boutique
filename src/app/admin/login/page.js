"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Eye, EyeOff, Lock, Mail, Sparkles, AlertCircle, Loader2, ShieldCheck } from "lucide-react";

// Fixed particle positions — generated once, not using Math.random() to avoid hydration mismatch
const PARTICLES = [
  { top: "12%", left: "8%", delay: "0s" }, { top: "28%", left: "72%", delay: "1.2s" },
  { top: "55%", left: "15%", delay: "0.4s" }, { top: "70%", left: "88%", delay: "2.1s" },
  { top: "85%", left: "35%", delay: "0.8s" }, { top: "18%", left: "45%", delay: "3.2s" },
  { top: "40%", left: "92%", delay: "1.6s" }, { top: "62%", left: "58%", delay: "0.2s" },
  { top: "5%", left: "78%", delay: "2.8s" }, { top: "92%", left: "10%", delay: "1.4s" },
  { top: "33%", left: "30%", delay: "3.6s" }, { top: "77%", left: "65%", delay: "0.6s" },
  { top: "48%", left: "5%", delay: "2.4s" }, { top: "15%", left: "55%", delay: "4.0s" },
  { top: "90%", left: "50%", delay: "1.0s" }, { top: "25%", left: "18%", delay: "3.0s" },
  { top: "60%", left: "80%", delay: "1.8s" }, { top: "38%", left: "42%", delay: "4.2s" },
  { top: "80%", left: "22%", delay: "0.3s" }, { top: "10%", left: "90%", delay: "2.6s" },
];

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2F0147] via-[#4a0a6e] to-[#1a0030]" />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#9C528B]/20 blur-3xl animate-[float_8s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#D4AF37]/10 blur-3xl animate-[float_10s_ease-in-out_infinite_reverse] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-[#610F7F]/30 blur-2xl pointer-events-none" />

      {/* Fixed particle positions — no Math.random() to avoid hydration mismatch */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#D4AF37]/30 animate-pulse"
          style={{ top: p.top, left: p.left, animationDelay: p.delay }}
        />
      ))}

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md z-10"
      >
        <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-[0_32px_64px_rgba(0,0,0,0.4)]">
          {/* Top accent */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#9C528B] flex items-center justify-center mb-4 shadow-[0_8px_32px_rgba(212,175,55,0.4)]"
            >
              <Crown className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="font-serif text-2xl font-bold text-white mb-1">Instant Boutique</h1>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span className="text-xs text-[#D4AF37] uppercase tracking-[0.2em] font-medium">Admin Portal</span>
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            </div>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-6"
              >
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-300">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="group">
              <label className="block text-xs text-white/50 uppercase tracking-widest mb-2 font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37] transition-colors" />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="admin@instantboutique.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/10 transition-all text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-xs text-white/50 uppercase tracking-widest mb-2 font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37] transition-colors" />
                <input
                  id="admin-password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/10 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37] transition-colors"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              id="admin-login-btn"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#e8c94a] to-[#D4AF37] text-[#2F0147] font-bold text-sm uppercase tracking-widest shadow-[0_8px_32px_rgba(212,175,55,0.4)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.6)] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing In…</>
                : "Sign In to Admin"
              }
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-white/20" />
            <p className="text-xs text-white/30">Secured with end-to-end encryption</p>
          </div>

          {/* Bottom accent */}
          <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#9C528B] to-transparent" />
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-sm text-white/30 hover:text-white/60 transition-colors">
            ← Back to Instant Boutique
          </a>
        </div>
      </motion.div>
    </div>
  );
}
