import { getProductByIdAdmin } from "@/lib/adminData";
import ProductFormClient from "@/components/admin/ProductFormClient";
import { notFound } from "next/navigation";

export const metadata = { title: "Edit Product — Instant Boutique Admin" };

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const product = getProductByIdAdmin(id);
  if (!product) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl lg:text-3xl font-bold text-[#2F0147] dark:text-white">
          Edit Product
        </h1>
        <p className="text-sm text-[#9C528B]/60 dark:text-white/40 mt-1">
          Editing: {product.name}
        </p>
      </div>
      <ProductFormClient mode="edit" product={product} />
    </div>
  );
}
