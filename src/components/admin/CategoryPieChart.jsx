"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#610F7F", "#9C528B", "#D4AF37", "#E2C2C6", "#B9929F", "#2F0147"];

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return percent > 0.05 ? (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-[#1a0030] border border-[#E2C2C6]/30 dark:border-white/10 rounded-xl p-3 shadow-xl text-xs">
      <p className="font-semibold text-[#2F0147] dark:text-white">{payload[0].name}</p>
      <p className="text-[#9C528B] dark:text-white/60">{payload[0].value} products</p>
    </div>
  );
};

export default function CategoryPieChart({ data = [] }) {
  const chartData = data.length > 0 ? data : [
    { name: "Sarees", value: 28 },
    { name: "Kurtis", value: 22 },
    { name: "Dresses", value: 18 },
    { name: "Bridal", value: 15 },
    { name: "Blouses", value: 10 },
    { name: "Frocks", value: 7 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white dark:bg-[#1a0030]/60 rounded-2xl p-5 border border-[#E2C2C6]/20 dark:border-white/10"
    >
      <h3 className="font-serif text-lg font-bold text-[#2F0147] dark:text-white mb-1">
        Category Split
      </h3>
      <p className="text-xs text-[#9C528B]/60 dark:text-white/40 mb-4">Products by category</p>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
            labelLine={false}
            label={renderCustomLabel}
          >
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(v) => <span style={{ fontSize: 11, color: "#9C528B" }}>{v}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
