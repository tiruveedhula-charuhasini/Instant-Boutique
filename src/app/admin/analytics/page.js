"use client";

import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, Users, ShoppingBag, Package } from "lucide-react";

const MONTHLY = [
  { month: "Jul", revenue: 42000, orders: 38, customers: 28 },
  { month: "Aug", revenue: 58000, orders: 52, customers: 41 },
  { month: "Sep", revenue: 51000, orders: 45, customers: 36 },
  { month: "Oct", revenue: 75000, orders: 68, customers: 54 },
  { month: "Nov", revenue: 94000, orders: 87, customers: 70 },
  { month: "Dec", revenue: 132000, orders: 120, customers: 98 },
  { month: "Jan", revenue: 88000, orders: 79, customers: 61 },
  { month: "Feb", revenue: 102000, orders: 94, customers: 76 },
  { month: "Mar", revenue: 118000, orders: 108, customers: 88 },
  { month: "Apr", revenue: 95000, orders: 86, customers: 68 },
  { month: "May", revenue: 143000, orders: 131, customers: 105 },
];

const CATEGORY_DATA = [
  { name: "Sarees", revenue: 285000, units: 320 },
  { name: "Kurtis", revenue: 156000, units: 420 },
  { name: "Dresses", revenue: 134000, units: 280 },
  { name: "Bridal", revenue: 298000, units: 89 },
  { name: "Blouses", revenue: 78000, units: 310 },
  { name: "Frocks", revenue: 45000, units: 195 },
];

const TOP_PRODUCTS = [
  { name: "Banarasi Silk Saree", views: 1240, wishlists: 342, sales: 47 },
  { name: "Bridal Lehenga Set", views: 980, wishlists: 289, sales: 23 },
  { name: "Anarkali Dress", views: 876, wishlists: 198, sales: 89 },
  { name: "Cotton Kurti Set", views: 754, wishlists: 167, sales: 134 },
  { name: "Silk Blouse", views: 612, wishlists: 143, sales: 62 },
];

const Tooltip_ = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-[#1a0030] border border-[#E2C2C6]/30 dark:border-white/10 rounded-xl p-3 shadow-xl text-xs">
      <p className="font-semibold text-[#2F0147] dark:text-white mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: {p.name.includes("Revenue") ? `₹${p.value.toLocaleString("en-IN")}` : p.value}
        </p>
      ))}
    </div>
  );
};

function ChartCard({ title, subtitle, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 p-5"
    >
      <div className="mb-4">
        <h3 className="font-serif text-base font-bold text-[#2F0147] dark:text-white">{title}</h3>
        {subtitle && <p className="text-xs text-[#9C528B]/50 dark:text-white/30 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </motion.div>
  );
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl lg:text-3xl font-bold text-[#2F0147] dark:text-white">Analytics</h1>
        <p className="text-sm text-[#9C528B]/60 dark:text-white/40 mt-1">Deep insights into your boutique performance</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "₹8,43,250", change: "+18.4%", icon: TrendingUp, color: "from-[#610F7F] to-[#9C528B]" },
          { label: "Avg Order Value", value: "₹3,372", change: "+5.2%", icon: ShoppingBag, color: "from-amber-500 to-orange-400" },
          { label: "New Customers", value: "1,284", change: "+12.1%", icon: Users, color: "from-rose-500 to-pink-400" },
          { label: "Repeat Rate", value: "34.8%", change: "+2.3%", icon: Package, color: "from-emerald-500 to-teal-400" },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 p-4"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs text-[#9C528B]/50 dark:text-white/30 uppercase tracking-widest">{item.label}</p>
              <p className="text-xl font-bold text-[#2F0147] dark:text-white font-serif mt-1">{item.value}</p>
              <p className="text-xs text-emerald-500 font-medium mt-0.5">{item.change} vs last year</p>
            </motion.div>
          );
        })}
      </div>

      {/* Revenue Trend */}
      <ChartCard title="Monthly Revenue Trend" subtitle="Last 11 months" delay={0.2}>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={MONTHLY}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#610F7F" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#610F7F" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2C2C6" opacity={0.2} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9C528B" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#9C528B" }} axisLine={false} tickLine={false} />
            <Tooltip content={<Tooltip_ />} />
            <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#610F7F" strokeWidth={2.5} fill="url(#revGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Orders + Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard title="Monthly Orders" subtitle="Order volume trend" delay={0.3}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MONTHLY} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2C2C6" opacity={0.2} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9C528B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9C528B" }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tooltip_ />} />
              <Bar dataKey="orders" name="Orders" fill="#9C528B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Customer Growth" subtitle="New customers per month" delay={0.35}>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={MONTHLY}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2C2C6" opacity={0.2} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9C528B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9C528B" }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tooltip_ />} />
              <Line type="monotone" dataKey="customers" name="Customers" stroke="#D4AF37" strokeWidth={2.5} dot={{ fill: "#D4AF37", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Category Revenue */}
      <ChartCard title="Revenue by Category" subtitle="All-time category performance" delay={0.4}>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={CATEGORY_DATA} layout="vertical" barSize={14}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2C2C6" opacity={0.2} horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: "#9C528B" }} axisLine={false} tickLine={false} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: "#9C528B" }} axisLine={false} tickLine={false} width={70} />
            <Tooltip content={<Tooltip_ />} />
            <Bar dataKey="revenue" name="Revenue" fill="#610F7F" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Top Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-[#E2C2C6]/20 dark:border-white/10">
          <h3 className="font-serif text-base font-bold text-[#2F0147] dark:text-white">Top Products Analytics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2C2C6]/10 dark:border-white/5">
                {["Product","Views","Wishlists","Sales","Conversion"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#9C528B]/50 dark:text-white/30">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TOP_PRODUCTS.map((p, i) => (
                <tr key={i} className="border-b border-[#E2C2C6]/10 dark:border-white/5 hover:bg-[#F8F4FF] dark:hover:bg-white/5 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-medium text-[#2F0147] dark:text-white">{p.name}</td>
                  <td className="px-5 py-3.5 text-sm text-[#9C528B]/70 dark:text-white/50">{p.views.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-sm text-[#9C528B]/70 dark:text-white/50">{p.wishlists}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-[#2F0147] dark:text-white">{p.sales}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-[#F5E6FF] dark:bg-white/10 rounded-full overflow-hidden max-w-[80px]">
                        <div className="h-full bg-[#9C528B] rounded-full" style={{ width: `${(p.sales / p.views) * 100 * 10}%` }} />
                      </div>
                      <span className="text-xs text-[#9C528B]/60 dark:text-white/40">
                        {((p.sales / p.views) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
