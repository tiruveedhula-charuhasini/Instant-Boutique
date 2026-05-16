"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function AdminError({ error, reset }) {
  useEffect(() => {
    console.error("Admin error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-5"
      >
        <div className="w-20 h-20 rounded-3xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>

        <div>
          <h2 className="font-serif text-2xl font-bold text-[#2F0147] dark:text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-sm text-[#9C528B]/60 dark:text-white/40 max-w-sm">
            {error?.message || "An unexpected error occurred in the admin panel."}
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2F0147] to-[#610F7F] text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E2C2C6]/40 dark:border-white/10 text-sm font-medium text-[#9C528B] dark:text-white/60 hover:bg-[#F5E6FF] dark:hover:bg-white/10 transition-colors"
          >
            <Home className="w-4 h-4" /> Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
