"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const DATA = [
  { month: "Jul", revenue: 42000, orders: 38 },
  { month: "Aug", revenue: 58000, orders: 52 },
  { month: "Sep", revenue: 51000, orders: 45 },
  { month: "Oct", revenue: 75000, orders: 68 },
  { month: "Nov", revenue: 94000, orders: 87 },
  { month: "Dec", revenue: 132000, orders: 120 },
  { month: "Jan", revenue: 88000, orders: 79 },
  { month: "Feb", revenue: 102000, orders: 94 },
  { month: "Mar", revenue: 118000, orders: 108 },
  { month: "Apr", revenue: 95000, orders: 86 },
  { month: "May", revenue: 143000, orders: 131 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-[#1a0030] border border-[#E2C2C6]/30 dark:border-white/10 rounded-xl p-3 shadow-xl text-xs">
      <p className="font-semibold text-[#2F0147] dark:text-white mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-medium">
          {p.name}: {p.name === "Revenue" ? `₹${p.value.toLocaleString("en-IN")}` : p.value}
        </p>
      ))}
    </div>
  );
};

export default function SalesChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-[#1a0030]/60 rounded-2xl p-5 border border-[#E2C2C6]/20 dark:border-white/10 col-span-2"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#2F0147] dark:text-white">
            Revenue & Orders
          </h3>
          <p className="text-xs text-[#9C528B]/60 dark:text-white/40 mt-0.5">
            Last 11 months performance
          </p>
        </div>
        <div className="flex gap-2">
          <span className="flex items-center gap-1.5 text-xs text-[#9C528B]/60 dark:text-white/40">
            <span className="w-3 h-3 rounded-full bg-[#610F7F]" /> Revenue
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#9C528B]/60 dark:text-white/40">
            <span className="w-3 h-3 rounded-full bg-[#D4AF37]" /> Orders
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#610F7F" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#610F7F" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2C2C6" opacity={0.2} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9C528B" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#9C528B" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke="#610F7F"
            strokeWidth={2.5}
            fill="url(#gradRevenue)"
            dot={false}
            activeDot={{ r: 5, fill: "#610F7F" }}
          />
          <Area
            type="monotone"
            dataKey="orders"
            name="Orders"
            stroke="#D4AF37"
            strokeWidth={2.5}
            fill="url(#gradOrders)"
            dot={false}
            activeDot={{ r: 5, fill: "#D4AF37" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
