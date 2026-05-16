import Link from "next/link";
import { Plus, Package } from "lucide-react";
import { getAllProductsAdmin } from "@/lib/adminData";
import ProductsClient from "@/components/admin/ProductsClient";

export const metadata = { title: "Products — Instant Boutique Admin" };

export default async function ProductsPage() {
  const products = getAllProductsAdmin();
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl lg:text-3xl font-bold text-[#2F0147] dark:text-white">
            Products
          </h1>
          <p className="text-sm text-[#9C528B]/60 dark:text-white/40 mt-1">
            {products.length} total products across all categories
          </p>
        </div>
        <Link
          href="/admin/products/add"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2F0147] to-[#610F7F] text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      <ProductsClient products={products} />
    </div>
  );
}
