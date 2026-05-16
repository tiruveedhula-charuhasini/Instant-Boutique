"use client";

import StatCard from "@/components/admin/StatCard";

const STAT_CARDS = [
  { title: "Total Revenue",   value: 843250,  prefix: "₹", change: "+18.4%", changeType: "up",   iconName: "DollarSign",    color: "purple" },
  { title: "Total Orders",    value: 2501,                  change: "+12.1%", changeType: "up",   iconName: "ShoppingBag",   color: "gold"   },
  { title: "Total Customers", value: 1284,                  change: "+8.7%",  changeType: "up",   iconName: "Users",         color: "rose"   },
  { title: "Pending Orders",  value: 47,                    change: "-3",     changeType: "down", iconName: "Clock",         color: "orange" },
  { title: "Wishlist Items",  value: 3842,                  change: "+22%",   changeType: "up",   iconName: "Heart",         color: "purple" },
  { title: "Conversion Rate", value: "3.8",  suffix: "%",  change: "+0.4%",  changeType: "up",   iconName: "TrendingUp",    color: "gold"   },
];

export default function DashboardStats({ stats }) {
  const cards = [
    ...STAT_CARDS.slice(0, 3),
    {
      title: "Total Products",
      value: stats?.totalProducts ?? 0,
      change: "+5",
      changeType: "up",
      iconName: "Package",
      color: "green",
    },
    {
      title: "Low Stock",
      value: stats?.lowStock ?? 8,
      change: "+2",
      changeType: "down",
      iconName: "AlertTriangle",
      color: "rose",
    },
    ...STAT_CARDS.slice(3),
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <StatCard key={card.title} {...card} index={i} />
      ))}
    </div>
  );
}
