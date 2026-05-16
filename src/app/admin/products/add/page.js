import ProductFormClient from "@/components/admin/ProductFormClient";

export const metadata = { title: "Add Product — Instant Boutique Admin" };

export default function AddProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl lg:text-3xl font-bold text-[#2F0147] dark:text-white">
          Add New Product
        </h1>
        <p className="text-sm text-[#9C528B]/60 dark:text-white/40 mt-1">
          Fill in all product details below
        </p>
      </div>
      <ProductFormClient mode="add" />
    </div>
  );
}
