"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Users, ShoppingBag, Heart, ChevronRight } from "lucide-react";

const MOCK_CUSTOMERS = Array.from({ length: 20 }, (_, i) => ({
  id: `CUST-${1000 + i}`,
  name: ["Priya Sharma","Ananya Reddy","Meera Patel","Sneha Iyer","Kavya Nair","Divya Menon","Ritu Kapoor","Pooja Singh","Nisha Jain","Sunita Rao"][i % 10],
  email: `customer${i + 1}@example.com`,
  phone: "+91 98765 4321" + i,
  totalOrders: Math.floor(Math.random() * 15) + 1,
  totalSpent: Math.floor(Math.random() * 50000) + 5000,
  wishlistCount: Math.floor(Math.random() * 20),
  joinDate: `${Math.floor(Math.random() * 28) + 1} Jan 2026`,
  lastOrder: `${Math.floor(Math.random() * 16) + 1} May 2026`,
}));

export default function CustomersPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() =>
    MOCK_CUSTOMERS.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.includes(search.toLowerCase())
    ), [search]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl lg:text-3xl font-bold text-[#2F0147] dark:text-white">Customers</h1>
        <p className="text-sm text-[#9C528B]/60 dark:text-white/40 mt-1">{MOCK_CUSTOMERS.length} registered customers</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Customers", value: MOCK_CUSTOMERS.length, icon: Users, color: "bg-[#610F7F]" },
          { label: "Avg Spent", value: `₹${Math.round(MOCK_CUSTOMERS.reduce((s,c)=>s+c.totalSpent,0)/MOCK_CUSTOMERS.length).toLocaleString("en-IN")}`, icon: ShoppingBag, color: "bg-amber-500" },
          { label: "Avg Wishlist", value: Math.round(MOCK_CUSTOMERS.reduce((s,c)=>s+c.wishlistCount,0)/MOCK_CUSTOMERS.length), icon: Heart, color: "bg-rose-500" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-[#9C528B]/50 dark:text-white/30">{item.label}</p>
                <p className="text-xl font-bold text-[#2F0147] dark:text-white font-serif">{item.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C528B]/40" />
          <input type="text" placeholder="Search customers..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#F8F4FF] dark:bg-white/5 border border-[#E2C2C6]/30 dark:border-white/10 rounded-xl text-sm outline-none focus:border-[#9C528B]/50 text-[#2F0147] dark:text-white placeholder:text-[#9C528B]/40 transition-colors" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2C2C6]/20 dark:border-white/10">
                {["Customer","Orders","Total Spent","Wishlist","Joined","Last Order"].map(h => (
                  <th key={h} className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-widest text-[#9C528B]/50 dark:text-white/30">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-b border-[#E2C2C6]/10 dark:border-white/5 hover:bg-[#F8F4FF] dark:hover:bg-white/5 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#610F7F] to-[#9C528B] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {c.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#2F0147] dark:text-white">{c.name}</p>
                        <p className="text-[11px] text-[#9C528B]/50 dark:text-white/30">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-[#2F0147] dark:text-white">{c.totalOrders}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-bold text-[#2F0147] dark:text-white">₹{c.totalSpent.toLocaleString("en-IN")}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 text-sm text-[#9C528B]/70 dark:text-white/50">
                      <Heart className="w-3.5 h-3.5" />{c.wishlistCount}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#9C528B]/60 dark:text-white/40">{c.joinDate}</td>
                  <td className="px-5 py-4 text-sm text-[#9C528B]/60 dark:text-white/40">{c.lastOrder}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
