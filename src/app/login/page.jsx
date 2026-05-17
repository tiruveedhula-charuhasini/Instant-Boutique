"use client";

import { useState, Suspense } from "react";
import { useStore } from "@/context/StoreContext";
import { useToast } from "@/context/ToastContext";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, User, Phone, Loader2, Sparkles } from "lucide-react";

const inputCls =
  "w-full pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 outline-none focus:border-[#D4AF37]/60 transition-colors";

const USERS_KEY = "boutique_users";
function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); } catch { return []; }
}
function saveUsers(users) {
  try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch {}
}

function LoginForm() {
  const { loginUser } = useStore();
  const { addToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [tab, setTab] = useState("login");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (tab === "signup" && !form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email is required";
    if (!form.password || form.password.length < 4)
      e.password = "Password must be at least 4 characters";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    await new Promise((r) => setTimeout(r, 600));
    const users = getUsers();

    if (tab === "signup") {
      if (users.find((u) => u.email === form.email)) {
        setErrors({ email: "Email already registered. Please sign in." });
        setLoading(false);
        return;
      }
      const newUser = { name: form.name, email: form.email, phone: form.phone };
      saveUsers([...users, { ...newUser, password: form.password }]);
      loginUser(newUser);
      addToast({ message: `Welcome, ${form.name}! 🎉`, type: "success" });
    } else {
      const match = users.find((u) => u.email === form.email && u.password === form.password);
      if (!match) {
        setErrors({ password: "Invalid email or password." });
        setLoading(false);
        return;
      }
      loginUser({ name: match.name, email: match.email, phone: match.phone });
      addToast({ message: `Welcome back, ${match.name}!`, type: "success" });
    }

    setLoading(false);
    router.push(redirectTo);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0030] via-[#2F0147] to-[#610F7F] flex items-center justify-center px-4">
      {/* Decorative orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#9C528B]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#9C528B] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-serif)" }}>
              Instant Boutique
            </h1>
            <p className="text-white/50 text-sm mt-1">
              {tab === "login" ? "Sign in to your account" : "Create your account"}
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-white/10 rounded-xl p-1 mb-7">
            {["login", "signup"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => { setTab(t); setErrors({}); }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                  tab === t ? "bg-white/20 text-white shadow" : "text-white/50 hover:text-white/70"
                }`}
              >
                {t === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name — signup only */}
            {tab === "signup" && (
              <div>
                <div className="relative">
                  <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input value={form.name} onChange={(e) => set("name", e.target.value)}
                    placeholder="Full Name" className={inputCls} />
                </div>
                {errors.name && <p className="text-xs text-red-400 mt-1 pl-1">{errors.name}</p>}
              </div>
            )}

            {/* Email */}
            <div>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
                  placeholder="Email Address" className={inputCls} />
              </div>
              {errors.email && <p className="text-xs text-red-400 mt-1 pl-1">{errors.email}</p>}
            </div>

            {/* Phone — signup only */}
            {tab === "signup" && (
              <div className="relative">
                <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input value={form.phone} onChange={(e) => set("phone", e.target.value)}
                  placeholder="Phone Number (optional)" className={inputCls} />
              </div>
            )}

            {/* Password */}
            <div>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                  placeholder="Password"
                  className={`${inputCls} pr-11`}
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-400 mt-1 pl-1">{errors.password}</p>}
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#9C528B] text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Please wait…</>
              ) : tab === "login" ? "Sign In" : "Create Account"}
            </motion.button>
          </form>

          <p className="text-center text-white/40 text-xs mt-6">
            {tab === "login" ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => { setTab(tab === "login" ? "signup" : "login"); setErrors({}); }}
              className="text-[#D4AF37] hover:underline font-medium">
              {tab === "login" ? "Sign Up" : "Sign In"}
            </button>
          </p>

          <p className="text-center text-white/30 text-[11px] mt-4">
            Demo purposes only — data stored locally in browser.
          </p>
        </div>

        <p className="text-center mt-6">
          <Link href="/" className="text-white/40 text-xs hover:text-white/60 transition-colors">
            ← Back to Boutique
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function UserLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
