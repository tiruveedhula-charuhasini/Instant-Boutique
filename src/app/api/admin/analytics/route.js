import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getAdminStats, getAllProductsAdmin } from "@/lib/adminData";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const stats = getAdminStats();
  const products = getAllProductsAdmin();

  // Build category distribution data
  const categoryData = Object.entries(stats.categories || {}).map(([name, count]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    count,
    value: count,
  }));

  // Build mock time-series (replace with real DB aggregation)
  const months = ["Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May"];
  const revenueData = months.map((month, i) => ({
    month,
    revenue: 42000 + i * 8000 + Math.floor(Math.random() * 15000),
    orders: 38 + i * 8 + Math.floor(Math.random() * 20),
  }));

  return NextResponse.json({
    stats: {
      totalProducts: stats.totalProducts,
      lowStock: stats.lowStock,
      avgPrice: stats.avgPrice,
      totalRevenue: 843250,
      totalOrders: 2501,
      totalCustomers: 1284,
      pendingOrders: 47,
      wishlistCount: 3842,
      conversionRate: 3.8,
    },
    categoryData,
    revenueData,
  });
}
