"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search, Edit2, Trash2, ChevronLeft, ChevronRight,
  Package, Star, Loader2, Plus,
} from "lucide-react";
import { useAdminToast } from "@/components/admin/AdminToast";

const CATEGORIES = ["All", "Sarees", "Kurtis", "Dresses", "Bridal", "Blouses", "Frocks"];
const PER_PAGE = 10;

export default function ProductsClient({ products: initialProducts }) {
  const router = useRouter();
  const toast  = useAdminToast();
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [sortBy, setSortBy] = useState("name");


  const filtered = useMemo(() => {
    let p = [...products];
    if (search) p = p.filter(pr => pr.name?.toLowerCase().includes(search.toLowerCase()) || pr.id?.toString().includes(search));
    if (category !== "All") p = p.filter(pr => (pr.category || pr._category || "").toLowerCase() === category.toLowerCase());
    p.sort((a, b) => {
      if (sortBy === "price-low") return (a.price ?? 0) - (b.price ?? 0);
      if (sortBy === "price-high") return (b.price ?? 0) - (a.price ?? 0);
      if (sortBy === "stock") return (a.stockQuantity ?? 999) - (b.stockQuantity ?? 999);
      return (a.name ?? "").localeCompare(b.name ?? "");
    });
    return p;
  }, [products, search, category, sortBy]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleSelect = (id) =>
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const toggleSelectAll = () =>
    setSelected(s => s.length === paginated.length ? [] : paginated.map(p => p.id));

  const stockStatus = (qty) => {
    if (qty === undefined) return null;
    if (qty === 0) return { label: "Out of Stock", cls: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400" };
    if (qty < 5) return { label: "Low Stock", cls: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400" };
    return { label: "In Stock", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" };
  };

  return (
    <>
      {/* Filters */}
      <div className="bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C528B]/40" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F8F4FF] dark:bg-white/5 border border-[#E2C2C6]/30 dark:border-white/10 rounded-xl text-sm text-[#2F0147] dark:text-white placeholder:text-[#9C528B]/40 outline-none focus:border-[#9C528B]/50 transition-colors"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-3 py-2.5 bg-[#F8F4FF] dark:bg-white/5 border border-[#E2C2C6]/30 dark:border-white/10 rounded-xl text-sm text-[#2F0147] dark:text-white outline-none"
          >
            <option value="name">Sort: Name</option>
            <option value="price-low">Sort: Price (Low to High)</option>
            <option value="price-high">Sort: Price (High to Low)</option>
            <option value="stock">Sort: Stock (Low)</option>
          </select>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setPage(1); }}
              className={`flex-shrink-0 px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                category === cat
                  ? "bg-[#610F7F] text-white shadow-md"
                  : "bg-[#F5E6FF] dark:bg-white/10 text-[#9C528B] dark:text-white/60 hover:bg-[#E8D0F5] dark:hover:bg-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bulk actions */}
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-3 bg-[#F5E6FF] dark:bg-[#610F7F]/20 rounded-xl border border-[#9C528B]/20"
          >
            <span className="text-sm font-medium text-[#610F7F]">
              {selected.length} selected
            </span>
            <button 
              onClick={async () => {
                if (!window.confirm(`Are you sure you want to delete ${selected.length} products?`)) return;
                setBulkDeleting(true);
                let successCount = 0;
                await Promise.all(selected.map(async (id) => {
                  try {
                    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
                    if (res.ok) successCount++;
                  } catch (err) {}
                }));
                setProducts(p => p.filter(x => !selected.includes(x.id)));
                setSelected([]);
                setBulkDeleting(false);
                toast.success(`Successfully deleted ${successCount} product(s).`);
                router.refresh();
              }}
              disabled={bulkDeleting}
              className="ml-auto text-xs text-red-600 hover:underline font-medium disabled:opacity-50"
            >
              {bulkDeleting ? "Deleting..." : "Delete Selected"}
            </button>
            <button
              onClick={() => setSelected([])}
              className="text-xs text-[#9C528B]/60 hover:text-[#9C528B]"
            >
              Clear
            </button>
          </motion.div>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2C2C6]/20 dark:border-white/10">
                <th className="text-left px-5 py-4 w-10">
                  <input
                    type="checkbox"
                    checked={selected.length === paginated.length && paginated.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-[#9C528B]/30 accent-[#610F7F]"
                  />
                </th>
                <th className="text-left px-4 py-4 text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 dark:text-white/30">Product</th>
                <th className="text-left px-4 py-4 text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 dark:text-white/30 hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-4 text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 dark:text-white/30">Price</th>
                <th className="text-left px-4 py-4 text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 dark:text-white/30 hidden lg:table-cell">Stock</th>
                <th className="text-left px-4 py-4 text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 dark:text-white/30 hidden sm:table-cell">Rating</th>
                <th className="text-right px-5 py-4 text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 dark:text-white/30">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16">
                    <Package className="w-12 h-12 text-[#9C528B]/20 mx-auto mb-3" />
                    <p className="text-sm text-[#9C528B]/40 dark:text-white/30">No products found</p>
                  </td>
                </tr>
              ) : (
                paginated.map((product, i) => {
                  const ss = stockStatus(product.stockQuantity);
                  return (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className={`border-b border-[#E2C2C6]/10 dark:border-white/5 hover:bg-[#F8F4FF] dark:hover:bg-white/5 transition-colors ${
                        selected.includes(product.id) ? "bg-[#F5E6FF]/50 dark:bg-[#610F7F]/10" : ""
                      }`}
                    >
                      <td className="px-5 py-4">
                        <input
                          type="checkbox"
                          checked={selected.includes(product.id)}
                          onChange={() => toggleSelect(product.id)}
                          className="rounded border-[#9C528B]/30 accent-[#610F7F]"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F5E6FF] to-[#E2C2C6] dark:from-[#610F7F]/20 dark:to-[#9C528B]/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {product.thumbnail ? (
                              <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover rounded-xl" />
                            ) : (
                              <Package className="w-5 h-5 text-[#610F7F]/40" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#2F0147] dark:text-white line-clamp-1 max-w-[180px]">
                              {product.name}
                            </p>
                            <p className="text-[11px] text-[#9C528B]/50 dark:text-white/30">ID: {product.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="text-xs px-2.5 py-1 rounded-lg bg-[#F5E6FF] dark:bg-[#610F7F]/20 text-[#610F7F] dark:text-purple-300 font-medium capitalize">
                          {product.category || product._category || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="text-sm font-bold text-[#2F0147] dark:text-white">
                            ₹{(product.price ?? 0).toLocaleString("en-IN")}
                          </p>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <p className="text-[11px] text-[#9C528B]/40 line-through">
                              ₹{product.originalPrice.toLocaleString("en-IN")}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        {ss ? (
                          <span className={`text-[11px] font-medium px-2.5 py-1 rounded-lg ${ss.cls}`}>
                            {product.stockQuantity !== undefined ? `${product.stockQuantity} • ` : ""}{ss.label}
                          </span>
                        ) : (
                          <span className="text-[11px] text-[#9C528B]/30">—</span>
                        )}
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        {product.rating ? (
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                            <span className="text-sm font-medium text-[#2F0147] dark:text-white">{product.rating}</span>
                          </div>
                        ) : <span className="text-[11px] text-[#9C528B]/30">—</span>}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 justify-end">
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="p-2 rounded-lg hover:bg-[#F5E6FF] dark:hover:bg-white/10 text-[#9C528B] hover:text-[#610F7F] transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => setDeleteModal(product)}
                            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-[#9C528B] hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-[#E2C2C6]/20 dark:border-white/10">
            <p className="text-sm text-[#9C528B]/60 dark:text-white/40">
              Showing {((page - 1) * PER_PAGE) + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-[#E2C2C6]/30 dark:border-white/10 hover:bg-[#F5E6FF] dark:hover:bg-white/10 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-[#9C528B]" />
              </button>
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const p = i + 1;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                      page === p
                        ? "bg-[#610F7F] text-white shadow-md"
                        : "text-[#9C528B] hover:bg-[#F5E6FF] dark:hover:bg-white/10 dark:text-white/60"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-[#E2C2C6]/30 dark:border-white/10 hover:bg-[#F5E6FF] dark:hover:bg-white/10 disabled:opacity-30 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-[#9C528B]" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !deleting && setDeleteModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-[#1a0030] rounded-2xl p-6 max-w-sm w-full border border-[#E2C2C6]/30 dark:border-white/10 shadow-2xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2F0147] dark:text-white text-center mb-2">
                Delete Product?
              </h3>
              <p className="text-sm text-[#9C528B]/60 dark:text-white/40 text-center mb-6">
                &ldquo;{deleteModal.name}&rdquo; will be permanently deleted.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModal(null)}
                  disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl border border-[#E2C2C6]/30 dark:border-white/10 text-sm font-medium text-[#9C528B] dark:text-white/60 hover:bg-[#F5E6F5] dark:hover:bg-white/10 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    const name = deleteModal.name;
                    setDeleting(true);
                    try {
                      const res = await fetch(`/api/admin/products/${deleteModal.id}`, { method: "DELETE" });
                      if (res.ok) {
                        setProducts(p => p.filter(x => x.id !== deleteModal.id));
                        setDeleteModal(null);
                        toast.success(`"${name}" deleted successfully.`);
                        router.refresh();
                      } else {
                        toast.error("Failed to delete product. Please try again.");
                      }
                    } catch (err) {
                      console.error("Delete failed:", err);
                      toast.error("Network error — could not delete product.");
                    } finally {
                      setDeleting(false);
                    }
                  }}
                  disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {deleting ? <><Loader2 className="w-4 h-4 animate-spin" /> Deleting…</> : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
