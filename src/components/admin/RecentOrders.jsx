"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Clock, CheckCircle2, XCircle, Truck } from "lucide-react";
import Link from "next/link";

const STATUS_CONFIG = {
  Pending:   { color: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300", dot: "bg-amber-500" },
  Confirmed: { color: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300", dot: "bg-blue-500" },
  Packed:    { color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300", dot: "bg-indigo-500" },
  Shipped:   { color: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300", dot: "bg-purple-500" },
  Delivered: { color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300", dot: "bg-emerald-500" },
  Cancelled: { color: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300", dot: "bg-red-500" },
};

const MOCK_ORDERS = [
  { id: "ORD-2501", customer: "Priya Sharma", amount: 4299, status: "Pending", date: "16 May", items: 2 },
  { id: "ORD-2500", customer: "Ananya Reddy", amount: 8750, status: "Shipped", date: "15 May", items: 1 },
  { id: "ORD-2499", customer: "Meera Patel", amount: 2190, status: "Delivered", date: "14 May", items: 3 },
  { id: "ORD-2498", customer: "Sneha Iyer", amount: 6800, status: "Confirmed", date: "14 May", items: 1 },
  { id: "ORD-2497", customer: "Kavya Nair", amount: 3450, status: "Cancelled", date: "13 May", items: 2 },
];

export default function RecentOrders({ orders = MOCK_ORDERS }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 overflow-hidden col-span-2"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2C2C6]/20 dark:border-white/10">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-[#9C528B]" />
          <h3 className="font-serif text-base font-bold text-[#2F0147] dark:text-white">
            Recent Orders
          </h3>
        </div>
        <Link href="/admin/orders" className="text-xs text-[#9C528B] hover:text-[#610F7F] transition-colors font-medium">
          View all →
        </Link>
      </div>

      <div className="divide-y divide-[#E2C2C6]/10 dark:divide-white/5">
        {orders.map((order, i) => {
          const sc = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.Pending;
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#F8F4FF] dark:hover:bg-white/5 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-[#F5E6FF] dark:bg-[#610F7F]/20 flex items-center justify-center flex-shrink-0">
                <ShoppingBag className="w-4 h-4 text-[#610F7F] dark:text-purple-300" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#2F0147] dark:text-white">{order.id}</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${sc.color}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-[#9C528B]/60 dark:text-white/40 truncate">
                  {order.customer} · {order.items} item{order.items > 1 ? "s" : ""}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-[#2F0147] dark:text-white">
                  ₹{order.amount.toLocaleString("en-IN")}
                </p>
                <p className="text-[11px] text-[#9C528B]/50 dark:text-white/30">{order.date}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
