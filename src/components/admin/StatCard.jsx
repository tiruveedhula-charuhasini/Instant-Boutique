"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Package, AlertTriangle, Heart, Clock, BarChart3 } from "lucide-react";

// Icon registry — add more as needed. Allows passing icon by string name from Server Components.
const ICON_MAP = {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  AlertTriangle,
  Heart,
  TrendingUp,
  Clock,
  BarChart3,
};

const COLORS = {
  purple: { icon: "bg-[#610F7F]" },
  gold:   { icon: "bg-amber-500" },
  rose:   { icon: "bg-rose-500" },
  green:  { icon: "bg-emerald-500" },
  blue:   { icon: "bg-blue-500" },
  orange: { icon: "bg-orange-500" },
};

/**
 * StatCard — supports both:
 *  - icon={SomeComponent}     (direct component — only works from Client Components)
 *  - iconName="DollarSign"    (string name — safe from Server Components)
 */
export default function StatCard({
  title,
  value,
  change,
  changeType = "up",
  icon,          // React component (legacy / from client)
  iconName,      // string key (from server components)
  color = "purple",
  prefix = "",
  suffix = "",
  index = 0,
}) {
  const c = COLORS[color] ?? COLORS.purple;
  const Icon = icon ?? ICON_MAP[iconName];
  const isUp = changeType === "up";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-[#1a0030]/60 rounded-2xl p-5 border border-[#E2C2C6]/20 dark:border-white/10 shadow-sm hover:shadow-lg transition-all cursor-default group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl ${c.icon} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
          {Icon && <Icon className="w-5 h-5 text-white" />}
        </div>

        {change !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${
            isUp
              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
              : "bg-red-50 text-red-600 dark:bg-red-500/20 dark:text-red-400"
          }`}>
            {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {change}
          </div>
        )}
      </div>

      <div>
        <p className="text-xs text-[#9C528B]/60 dark:text-white/40 uppercase tracking-widest font-medium mb-1">
          {title}
        </p>
        <p className="text-2xl font-bold text-[#2F0147] dark:text-white font-serif">
          {prefix}
          {typeof value === "number" ? value.toLocaleString("en-IN") : value}
          {suffix}
        </p>
      </div>
    </motion.div>
  );
}
