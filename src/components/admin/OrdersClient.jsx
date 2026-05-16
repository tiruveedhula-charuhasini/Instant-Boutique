"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search, Filter, Eye, ChevronLeft, ChevronRight, ShoppingBag,
  Clock, Package, Truck, CheckCircle2, XCircle, MessageCircle
} from "lucide-react";

const STATUS_CONFIG = {
  Pending:   { color: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300", icon: Clock },
  Confirmed: { color: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300", icon: CheckCircle2 },
  Packed:    { color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300", icon: Package },
  Shipped:   { color: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300", icon: Truck },
  Delivered: { color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300", icon: CheckCircle2 },
  Cancelled: { color: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400", icon: XCircle },
};

const MOCK_ORDERS = Array.from({ length: 25 }, (_, i) => ({
  id: `ORD-${2501 - i}`,
  customer: ["Priya Sharma","Ananya Reddy","Meera Patel","Sneha Iyer","Kavya Nair","Divya Menon","Ritu Kapoor","Pooja Singh"][i % 8],
  phone: `+91 9${Math.floor(100000000 + Math.random() * 900000000)}`,
  amount: [2199, 4299, 8750, 13500, 6800, 2990, 18000, 3450][i % 8],
  status: ["Pending","Confirmed","Packed","Shipped","Delivered","Cancelled"][i % 6],
  date: `${16 - Math.floor(i / 3)} May 2026`,
  items: (i % 3) + 1,
  paymentMethod: i % 2 === 0 ? "UPI" : "WhatsApp",
}));

const STATUSES = ["All", "Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled"];
const PER_PAGE = 10;

export default function OrdersClient({ orders = MOCK_ORDERS }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let o = [...orders];
    if (search) o = o.filter(x => x.id.includes(search) || x.customer.toLowerCase().includes(search.toLowerCase()));
    if (status !== "All") o = o.filter(x => x.status === status);
    return o;
  }, [orders, search, status]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C528B]/40" />
          <input
            type="text"
            placeholder="Search by order ID or customer name..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 bg-[#F8F4FF] dark:bg-white/5 border border-[#E2C2C6]/30 dark:border-white/10 rounded-xl text-sm text-[#2F0147] dark:text-white placeholder:text-[#9C528B]/40 outline-none focus:border-[#9C528B]/50 transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => { setStatus(s); setPage(1); }}
              className={`flex-shrink-0 px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                status === s
                  ? "bg-[#610F7F] text-white shadow-md"
                  : "bg-[#F5E6FF] dark:bg-white/10 text-[#9C528B] dark:text-white/60 hover:bg-[#E8D0F5]"
              }`}
            >
              {s} {s !== "All" && `(${orders.filter(o => o.status === s).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2C2C6]/20 dark:border-white/10">
                {["Order ID","Customer","Amount","Status","Date","Payment","Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 dark:text-white/30">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-16">
                  <ShoppingBag className="w-12 h-12 text-[#9C528B]/20 mx-auto mb-3" />
                  <p className="text-sm text-[#9C528B]/40 dark:text-white/30">No orders found</p>
                </td></tr>
              ) : paginated.map((order, i) => {
                const sc = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.Pending;
                const Icon = sc.icon;
                return (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-[#E2C2C6]/10 dark:border-white/5 hover:bg-[#F8F4FF] dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <span className="font-mono text-sm font-bold text-[#610F7F] dark:text-purple-300">
                        {order.id}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-semibold text-[#2F0147] dark:text-white">{order.customer}</p>
                        <p className="text-[11px] text-[#9C528B]/50 dark:text-white/30">{order.items} item{order.items > 1 ? "s" : ""}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-bold text-[#2F0147] dark:text-white">
                        ₹{order.amount.toLocaleString("en-IN")}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full ${sc.color}`}>
                        <Icon className="w-3 h-3" />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-[#9C528B]/60 dark:text-white/40">{order.date}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[11px] px-2.5 py-1 rounded-lg font-medium ${
                        order.paymentMethod === "WhatsApp"
                          ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
                      }`}>
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5E6FF] dark:bg-[#610F7F]/20 text-[#610F7F] dark:text-purple-300 text-xs font-medium hover:bg-[#E8D0F5] dark:hover:bg-[#610F7F]/30 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </Link>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-[#E2C2C6]/20 dark:border-white/10">
            <p className="text-sm text-[#9C528B]/60 dark:text-white/40">
              {filtered.length} orders total
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="p-1.5 rounded-lg border border-[#E2C2C6]/30 dark:border-white/10 hover:bg-[#F5E6FF] disabled:opacity-30 transition-colors">
                <ChevronLeft className="w-4 h-4 text-[#9C528B]" />
              </button>
              <span className="text-sm text-[#9C528B]/60 dark:text-white/40">
                {page} / {totalPages}
              </span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-[#E2C2C6]/30 dark:border-white/10 hover:bg-[#F5E6FF] disabled:opacity-30 transition-colors">
                <ChevronRight className="w-4 h-4 text-[#9C528B]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
