import SalesChart from "@/components/admin/SalesChart";
import CategoryPieChart from "@/components/admin/CategoryPieChart";
import RecentOrders from "@/components/admin/RecentOrders";
import TopProducts from "@/components/admin/TopProducts";
import DashboardHeader from "@/components/admin/DashboardHeader";
import DashboardStats from "@/components/admin/DashboardStats";
import { getAdminStats } from "@/lib/adminData";

export const metadata = {
  title: "Dashboard — Instant Boutique Admin",
};

export default async function AdminDashboardPage() {
  const stats = getAdminStats();

  const categoryData = Object.entries(stats.categories || {}).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  // Serialisable stats passed to the client stats component
  const dashStats = {
    totalProducts: stats.totalProducts,
    lowStock: stats.lowStock || 8,
    avgPrice: stats.avgPrice || 0,
  };

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <DashboardStats stats={dashStats} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SalesChart />
        <CategoryPieChart data={categoryData} />
      </div>

      {/* Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RecentOrders />
        <TopProducts />
      </div>
    </div>
  );
}