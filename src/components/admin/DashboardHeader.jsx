"use client";

import { Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardHeader() {
  const dateStr = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
    >
      <div>
        <h1 className="font-serif text-2xl lg:text-3xl font-bold text-[#2F0147] dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-sm text-[#9C528B]/60 dark:text-white/40 mt-1">
          Welcome back! Here&apos;s what&apos;s happening with Instant Boutique.
        </p>
      </div>

      <div className="inline-flex items-center gap-2 bg-white dark:bg-[#1a0030]/60 border border-[#E2C2C6]/30 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-[#9C528B] dark:text-white/40 self-start sm:self-auto">
        <Clock className="w-4 h-4 flex-shrink-0" />
        <span className="whitespace-nowrap">{dateStr}</span>
      </div>
    </motion.div>
  );
}
