"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, Package, User, MapPin, CreditCard,
  Truck, MessageCircle, Printer, Clock, CheckCircle2,
  XCircle, Loader2, Check,
} from "lucide-react";

const STATUSES = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled"];

const STATUS_COLORS = {
  Pending:   "bg-amber-500",
  Confirmed: "bg-blue-500",
  Packed:    "bg-indigo-500",
  Shipped:   "bg-purple-500",
  Delivered: "bg-emerald-500",
  Cancelled: "bg-red-500",
};

// Mock order factory — replace with API call: useSWR(`/api/admin/orders/${orderId}`)
function getMockOrder(orderId) {
  return {
    id: orderId,
    customer: { name: "Priya Sharma", email: "priya@example.com", phone: "+91 9876543210" },
    address: "12, Rose Garden Apartments, MG Road, Bengaluru – 560001",
    items: [
      { name: "Banarasi Silk Saree", quantity: 1, price: 8999, size: "Free Size", color: "Red" },
      { name: "Matching Blouse",     quantity: 1, price: 1299, size: "M",         color: "Red" },
    ],
    subtotal: 10298,
    discount: 500,
    shipping: 0,
    total: 9798,
    paymentMethod: "UPI",
    status: "Shipped",
    date: "16 May 2026, 11:42 AM",
    estimatedDelivery: "19 May 2026",
    notes: "Please pack carefully.",
  };
}

export default function OrderDetailClient({ orderId }) {
  const order = getMockOrder(orderId);
  const [currentStatus, setCurrentStatus] = useState(order.status);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const activeStatuses = STATUSES.filter((s) => s !== "Cancelled");
  const activeIdx = activeStatuses.indexOf(currentStatus);

  const updateStatus = async () => {
    setSaving(true);
    try {
      await fetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: currentStatus }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/admin/orders"
          className="p-2 rounded-xl border border-[#E2C2C6]/30 dark:border-white/10 hover:bg-[#F5E6F5] dark:hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#9C528B]" />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="font-serif text-2xl font-bold text-[#2F0147] dark:text-white">{order.id}</h1>
          <p className="text-sm text-[#9C528B]/60 dark:text-white/40">{order.date}</p>
        </div>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E2C2C6]/30 dark:border-white/10 text-sm text-[#9C528B] dark:text-white/60 hover:bg-[#F5E6F5] dark:hover:bg-white/10 transition-colors"
        >
          <Printer className="w-4 h-4" /> Invoice
        </button>
      </div>

      {/* Status Timeline */}
      <div className="bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 p-5">
        <h3 className="font-serif text-base font-bold text-[#2F0147] dark:text-white mb-5">
          Order Status
        </h3>

        {/* Timeline dots */}
        <div className="flex items-center">
          {activeStatuses.map((s, i) => {
            const done = i <= activeIdx;
            const isCurrent = i === activeIdx;
            return (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold transition-all ${
                      done ? (STATUS_COLORS[s] ?? "bg-[#610F7F]") : "bg-[#E2C2C6] dark:bg-white/10"
                    } ${isCurrent ? "ring-4 ring-offset-2 ring-[#610F7F]/30" : ""}`}
                  >
                    {done && i < activeIdx ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span
                    className={`text-[10px] font-medium whitespace-nowrap ${
                      done ? "text-[#610F7F] dark:text-purple-300" : "text-[#9C528B]/40 dark:text-white/20"
                    }`}
                  >
                    {s}
                  </span>
                </div>
                {i < activeStatuses.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mb-5 mx-1 transition-all ${
                      i < activeIdx ? "bg-[#610F7F]" : "bg-[#E2C2C6]/40 dark:bg-white/10"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Update Control */}
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#E2C2C6]/20 dark:border-white/10">
          <select
            value={currentStatus}
            onChange={(e) => setCurrentStatus(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-[#F8F4FF] dark:bg-white/5 border border-[#E2C2C6]/30 dark:border-white/10 rounded-xl text-sm text-[#2F0147] dark:text-white outline-none focus:border-[#9C528B]/50 transition-colors"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button
            onClick={updateStatus}
            disabled={saving || saved}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2F0147] to-[#610F7F] text-white text-sm font-semibold shadow-md hover:shadow-lg disabled:opacity-60 transition-all"
          >
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating…</>
              : saved ? <><Check className="w-4 h-4" /> Updated!</>
              : "Update Status"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Ordered Items */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[#E2C2C6]/20 dark:border-white/10">
            <Package className="w-4 h-4 text-[#9C528B]" />
            <h3 className="font-serif text-base font-bold text-[#2F0147] dark:text-white">
              Ordered Items
            </h3>
          </div>

          <div className="divide-y divide-[#E2C2C6]/10 dark:divide-white/5">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F5E6FF] to-[#E2C2C6] dark:from-[#610F7F]/20 dark:to-[#9C528B]/20 flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-[#610F7F]/50" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#2F0147] dark:text-white">{item.name}</p>
                  <p className="text-[11px] text-[#9C528B]/50 dark:text-white/30 mt-0.5">
                    Size: {item.size} · Color: {item.color} · Qty: {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-bold text-[#2F0147] dark:text-white flex-shrink-0">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="px-5 py-4 bg-[#F8F4FF] dark:bg-white/5 space-y-2">
            {[
              { label: "Subtotal",  value: `₹${order.subtotal.toLocaleString("en-IN")}`, cls: "" },
              { label: "Discount",  value: `−₹${order.discount}`,                        cls: "text-emerald-600 dark:text-emerald-400" },
              { label: "Shipping",  value: "Free",                                        cls: "text-emerald-600" },
            ].map(({ label, value, cls }) => (
              <div key={label} className="flex justify-between text-sm text-[#9C528B]/60 dark:text-white/40">
                <span>{label}</span>
                <span className={cls}>{value}</span>
              </div>
            ))}
            <div className="flex justify-between text-base font-bold text-[#2F0147] dark:text-white border-t border-[#E2C2C6]/20 dark:border-white/10 pt-2 mt-2">
              <span>Total</span>
              <span>₹{order.total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Customer */}
          <div className="bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-4 h-4 text-[#9C528B]" />
              <h3 className="font-serif text-base font-bold text-[#2F0147] dark:text-white">Customer</h3>
            </div>
            <p className="text-sm font-semibold text-[#2F0147] dark:text-white">{order.customer.name}</p>
            <p className="text-xs text-[#9C528B]/60 dark:text-white/40 mt-1">{order.customer.email}</p>
            <p className="text-xs text-[#9C528B]/60 dark:text-white/40">{order.customer.phone}</p>
            <a
              href={`https://wa.me/${order.customer.phone.replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(order.customer.name)}, regarding your order ${orderId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-xs text-green-600 bg-green-50 dark:bg-green-500/10 px-3 py-1.5 rounded-lg hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Customer
            </a>
          </div>

          {/* Address */}
          <div className="bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-[#9C528B]" />
              <h3 className="font-serif text-base font-bold text-[#2F0147] dark:text-white">Delivery Address</h3>
            </div>
            <p className="text-sm text-[#9C528B]/70 dark:text-white/50 leading-relaxed">{order.address}</p>
            <p className="text-xs text-[#9C528B]/40 dark:text-white/30 mt-2 flex items-center gap-1">
              <Truck className="w-3 h-3" /> Est. Delivery: {order.estimatedDelivery}
            </p>
          </div>

          {/* Payment */}
          <div className="bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="w-4 h-4 text-[#9C528B]" />
              <h3 className="font-serif text-base font-bold text-[#2F0147] dark:text-white">Payment</h3>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 font-semibold">
              {order.paymentMethod}
            </span>
            {order.notes && (
              <p className="text-xs text-[#9C528B]/60 dark:text-white/40 mt-3 italic">
                Note: {order.notes}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
