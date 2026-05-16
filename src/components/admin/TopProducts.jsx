"use client";

import { motion } from "framer-motion";
import { Package, Star, TrendingUp } from "lucide-react";
import Link from "next/link";

const MOCK_PRODUCTS = [
  { id: 1, name: "Banarasi Silk Saree", category: "Sarees", price: 8999, sold: 47, rating: 4.8, image: "/product-placeholder.jpg" },
  { id: 2, name: "Bridal Lehenga", category: "Bridal", price: 24999, sold: 23, rating: 4.9, image: "/product-placeholder.jpg" },
  { id: 3, name: "Anarkali Dress", category: "Dresses", price: 3499, sold: 89, rating: 4.6, image: "/product-placeholder.jpg" },
  { id: 4, name: "Cotton Kurti Set", category: "Kurtis", price: 1299, sold: 134, rating: 4.5, image: "/product-placeholder.jpg" },
  { id: 5, name: "Silk Blouse", category: "Blouses", price: 1899, sold: 62, rating: 4.7, image: "/product-placeholder.jpg" },
];

export default function TopProducts({ products = MOCK_PRODUCTS }) {
  const maxSold = Math.max(...products.map((p) => p.sold));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
      className="bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 overflow-hidden"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2C2C6]/20 dark:border-white/10">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="font-serif text-base font-bold text-[#2F0147] dark:text-white">
            Top Products
          </h3>
        </div>
        <Link href="/admin/products" className="text-xs text-[#9C528B] hover:text-[#610F7F] transition-colors font-medium">
          View all →
        </Link>
      </div>

      <div className="p-4 space-y-3">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55 + i * 0.05 }}
            className="flex items-center gap-3 group"
          >
            <span className="text-xs font-bold text-[#9C528B]/40 dark:text-white/20 w-4 text-center">
              {i + 1}
            </span>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5E6FF] to-[#E2C2C6] dark:from-[#610F7F]/20 dark:to-[#9C528B]/20 flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 text-[#610F7F] dark:text-purple-300" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#2F0147] dark:text-white truncate group-hover:text-[#610F7F] dark:group-hover:text-purple-300 transition-colors">
                {product.name}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="flex-1 h-1.5 bg-[#F5E6FF] dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#610F7F] to-[#9C528B] rounded-full"
                    style={{ width: `${(product.sold / maxSold) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-[#9C528B]/60 dark:text-white/40 whitespace-nowrap">
                  {product.sold} sold
                </span>
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <p className="text-sm font-bold text-[#2F0147] dark:text-white">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
              <div className="flex items-center gap-0.5 justify-end">
                <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                <span className="text-[10px] text-[#9C528B]/60 dark:text-white/40">{product.rating}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
