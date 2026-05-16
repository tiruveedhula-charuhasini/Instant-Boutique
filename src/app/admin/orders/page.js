import OrdersClient from "@/components/admin/OrdersClient";

export const metadata = { title: "Orders — Instant Boutique Admin" };

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl lg:text-3xl font-bold text-[#2F0147] dark:text-white">
            Orders
          </h1>
          <p className="text-sm text-[#9C528B]/60 dark:text-white/40 mt-1">
            Track and manage all customer orders
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E2C2C6]/30 dark:border-white/10 text-sm font-medium text-[#9C528B] dark:text-white/60 hover:bg-[#F5E6FF] dark:hover:bg-white/10 transition-colors">
          Export CSV
        </button>
      </div>
      <OrdersClient />
    </div>
  );
}
