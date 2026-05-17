"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Save, ArrowLeft, Loader2, ImagePlus, X, Check, AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useAdminToast } from "@/components/admin/AdminToast";

// ─── Constants ────────────────────────────────────────────────────────────────
const CATEGORIES = ["Sarees", "Kurtis", "Dresses", "Bridal", "Blouses", "Frocks"];
const SIZES      = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"];
const FABRICS    = ["Silk", "Cotton", "Georgette", "Chiffon", "Linen", "Crepe", "Net", "Velvet", "Satin", "Polyester"];

// ─── Zod Schema ───────────────────────────────────────────────────────────────
const schema = z.object({
  name:             z.string().min(2,  "Product name must be at least 2 characters"),
  slug:             z.string().min(2,  "Slug required").regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, hyphens only"),
  description:      z.string().min(10, "Description must be at least 10 characters"),
  shortDescription: z.string().optional(),
  price:            z.coerce.number().min(1, "Price must be greater than 0"),
  originalPrice:    z.coerce.number().optional(),
  category:         z.string().min(1, "Please select a category"),
  subcategory:      z.string().optional(),
  tags:             z.string().optional(),
  sku:              z.string().optional(),
  fabric:           z.string().optional(),
  stockQuantity:    z.coerce.number().min(0).optional(),
  rating:           z.coerce.number().min(0).max(5).optional(),
  seoTitle:         z.string().optional(),
  seoDescription:   z.string().optional(),
  isFeatured:       z.boolean().optional().default(false),
  isTrending:       z.boolean().optional().default(false),
  isBestseller:     z.boolean().optional().default(false),
  isNewArrival:     z.boolean().optional().default(false),
  thumbnail:        z.string().optional().default(""),
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
const toSlug = (name) =>
  name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const inputCls =
  "w-full px-4 py-2.5 bg-[#F8F4FF] dark:bg-white/5 border border-[#E2C2C6]/30 dark:border-white/10 rounded-xl text-sm text-[#2F0147] dark:text-white placeholder:text-[#9C528B]/30 outline-none focus:border-[#9C528B]/60 transition-colors";

// ─── Sub-components ───────────────────────────────────────────────────────────
function FormSection({ title, children }) {
  return (
    <div className="bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 p-5 space-y-4">
      <h3 className="font-serif text-base font-bold text-[#2F0147] dark:text-white border-b border-[#E2C2C6]/20 dark:border-white/10 pb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({ label, error, hint, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 dark:text-white/40 mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
          <AlertCircle className="w-3 h-3 flex-shrink-0" /> {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-[11px] text-[#9C528B]/40 dark:text-white/20 mt-1">{hint}</p>
      )}
    </div>
  );
}

function BadgeToggle({ label, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
        checked
          ? "bg-[#610F7F] text-white border-[#610F7F] shadow-md"
          : "bg-white dark:bg-[#1a0030]/60 text-[#9C528B] border-[#E2C2C6]/40 dark:border-white/10"
      }`}
    >
      {checked && <Check className="w-3 h-3" />}
      {label}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ProductFormClient({ mode = "add", product = null }) {
  const router = useRouter();
  const toast  = useAdminToast();

  const [saving, setSaving]               = useState(false);
  const [saved, setSaved]                 = useState(false);
  const [selectedSizes, setSelectedSizes] = useState(product?.sizes   ?? []);
  const [selectedColors, setSelectedColors] = useState(product?.colors ?? []);
  const [colorInput, setColorInput]       = useState("");
  const [images, setImages]               = useState(product?.images  ?? []);
  const [imageInput, setImageInput]       = useState("");

  const defaultValues = product
    ? {
        name:             product.name             ?? "",
        slug:             product.slug             ?? "",
        description:      product.description      ?? "",
        shortDescription: product.shortDescription ?? "",
        price:            product.price            ?? "",
        originalPrice:    product.originalPrice    ?? "",
        category:         product.category         ?? product._category ?? "",
        subcategory:      product.subcategory       ?? "",
        tags:             Array.isArray(product.tags)
                            ? product.tags.join(", ")
                            : (product.tags ?? ""),
        sku:              product.sku              ?? "",
        fabric:           product.fabric           ?? "",
        stockQuantity:    product.stockQuantity     ?? "",
        rating:           product.rating            ?? "",
        seoTitle:         product.seoTitle          ?? "",
        seoDescription:   product.seoDescription    ?? "",
        isFeatured:       product.isFeatured        ?? false,
        isTrending:       product.isTrending        ?? false,
        isBestseller:     product.isBestseller      ?? false,
        isNewArrival:     product.isNewArrival      ?? false,
        thumbnail:        product.thumbnail         ?? "",
      }
    : {
        isFeatured: false, isTrending: false,
        isBestseller: false, isNewArrival: false,
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ resolver: zodResolver(schema), defaultValues });

  // ─── Persistence ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (mode === "add") {
      try {
        const draft = localStorage.getItem("boutique_product_draft");
        if (draft) {
          const parsed = JSON.parse(draft);
          Object.keys(parsed).forEach(k => setValue(k, parsed[k]));
        }
      } catch {}
    }
  }, [mode, setValue]);

  useEffect(() => {
    if (mode === "add") {
      const subscription = watch((value) => {
        localStorage.setItem("boutique_product_draft", JSON.stringify(value));
      });
      return () => subscription.unsubscribe();
    }
  }, [watch, mode]);
  // ────────────────────────────────────────────────────────────────────────────

  // Slug auto-generation
  const handleNameChange = useCallback(
    (e) => {
      const val = e.target.value;
      setValue("name", val);
      if (mode === "add") setValue("slug", toSlug(val));
    },
    [setValue, mode]
  );

  const toggleSize = (size) =>
    setSelectedSizes((s) =>
      s.includes(size) ? s.filter((x) => x !== size) : [...s, size]
    );

  const addColor = () => {
    const c = colorInput.trim();
    if (c && !selectedColors.includes(c)) {
      setSelectedColors((arr) => [...arr, c]);
      setColorInput("");
    }
  };

  const addImageUrl = () => {
    const url = imageInput.trim();
    if (url) {
      setImages((arr) => [...arr, url]);
      setImageInput("");
    }
  };

  const onSubmit = async (data) => {
    setSaving(true);
    const payload = {
      ...data,
      sizes:  selectedSizes,
      colors: selectedColors,
      images,
      tags: data.tags
        ? data.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
    };

    try {
      const url    = mode === "edit" ? `/api/admin/products/${product.id}` : "/api/admin/products";
      const method = mode === "edit" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSaved(true);
        toast.success(
          mode === "edit"
            ? `"${data.name}" updated successfully!`
            : `"${data.name}" added successfully!`
        );
        if (mode === "add") {
          localStorage.removeItem("boutique_product_draft");
        }
        setTimeout(() => {
          router.push("/admin/products");
          router.refresh();
        }, 1200);
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Failed to save product. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error — please check your connection.");
    } finally {
      setSaving(false);
    }
  };

  // Badge flags
  const flags = [
    { key: "isFeatured",  label: "Featured"    },
    { key: "isTrending",  label: "Trending"    },
    { key: "isBestseller",label: "Bestseller"  },
    { key: "isNewArrival",label: "New Arrival" },
  ];

  const onError = (errors) => {
    const firstError = Object.values(errors)[0];
    if (firstError) {
      toast.error(firstError.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-5" noValidate>
      {/* Status Badges */}
      <div className="flex flex-wrap gap-2">
        {flags.map(({ key, label }) => (
          <BadgeToggle
            key={key}
            label={label}
            checked={!!watch(key)}
            onChange={(val) => setValue(key, val)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ── Left / Main Column ── */}
        <div className="lg:col-span-2 space-y-5">
          <FormSection title="Basic Information">
            <Field label="Product Name *" error={errors.name?.message}>
              <input
                {...register("name")}
                onChange={handleNameChange}
                placeholder="e.g. Banarasi Silk Saree"
                className={inputCls}
              />
            </Field>

            <Field
              label="Slug *"
              error={errors.slug?.message}
              hint="Auto-generated from name — URL-friendly identifier"
            >
              <input
                {...register("slug")}
                placeholder="e.g. banarasi-silk-saree"
                className={inputCls}
              />
            </Field>

            <Field label="Short Description" error={errors.shortDescription?.message}>
              <input
                {...register("shortDescription")}
                placeholder="One-line product summary"
                className={inputCls}
              />
            </Field>

            <Field label="Full Description *" error={errors.description?.message}>
              <textarea
                {...register("description")}
                rows={4}
                placeholder="Detailed product description..."
                className={`${inputCls} resize-none`}
              />
            </Field>
          </FormSection>

          <FormSection title="Pricing & Inventory">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Sale Price (₹) *" error={errors.price?.message}>
                <input {...register("price")} type="number" min="0" placeholder="0" className={inputCls} />
              </Field>
              <Field label="Original Price (₹)" error={errors.originalPrice?.message}>
                <input {...register("originalPrice")} type="number" min="0" placeholder="0" className={inputCls} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Stock Quantity" error={errors.stockQuantity?.message}>
                <input {...register("stockQuantity")} type="number" min="0" placeholder="0" className={inputCls} />
              </Field>
              <Field label="SKU" error={errors.sku?.message}>
                <input {...register("sku")} placeholder="e.g. SAR-001" className={inputCls} />
              </Field>
            </div>
          </FormSection>

          <FormSection title="Variants">
            <Field label="Sizes">
              <div className="flex flex-wrap gap-2 mt-1">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      selectedSizes.includes(size)
                        ? "bg-[#610F7F] text-white border-[#610F7F]"
                        : "bg-[#F8F4FF] dark:bg-white/5 text-[#9C528B] dark:text-white/60 border-[#E2C2C6]/30 dark:border-white/10 hover:border-[#9C528B]/40"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Colors">
              <div className="flex gap-2 mb-2">
                <input
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") { e.preventDefault(); addColor(); }
                  }}
                  placeholder="Type a color and press Enter"
                  className={`${inputCls} flex-1`}
                />
                <button
                  type="button"
                  onClick={addColor}
                  className="px-4 py-2.5 bg-[#610F7F] text-white rounded-xl text-sm font-medium hover:bg-[#2F0147] transition-colors"
                >
                  Add
                </button>
              </div>
              {selectedColors.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedColors.map((c) => (
                    <span
                      key={c}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5E6FF] dark:bg-[#610F7F]/20 text-xs text-[#610F7F] dark:text-purple-300 font-medium"
                    >
                      {c}
                      <button
                        type="button"
                        onClick={() => setSelectedColors((arr) => arr.filter((x) => x !== c))}
                        aria-label={`Remove ${c}`}
                      >
                        <X className="w-3 h-3 hover:text-red-500 transition-colors" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </Field>
          </FormSection>

          <FormSection title="SEO">
            <Field label="SEO Title" error={errors.seoTitle?.message}>
              <input {...register("seoTitle")} placeholder="Search engine title" className={inputCls} />
            </Field>
            <Field label="SEO Description" error={errors.seoDescription?.message}>
              <textarea
                {...register("seoDescription")}
                rows={2}
                placeholder="Search engine description"
                className={`${inputCls} resize-none`}
              />
            </Field>
          </FormSection>
        </div>

        {/* ── Right / Sidebar Column ── */}
        <div className="space-y-5">
          <FormSection title="Organisation">
            <Field label="Category *" error={errors.category?.message}>
              <select {...register("category")} className={inputCls}>
                <option value="">Select Category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c.toLowerCase()}>{c}</option>
                ))}
              </select>
            </Field>

            <Field label="Subcategory">
              <input {...register("subcategory")} placeholder="e.g. Handloom" className={inputCls} />
            </Field>

            <Field label="Fabric">
              <select {...register("fabric")} className={inputCls}>
                <option value="">Select Fabric</option>
                {FABRICS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </Field>

            <Field label="Tags" hint="Comma-separated: trending, new arrival">
              <input
                {...register("tags")}
                placeholder="trending, new arrival, bestseller"
                className={inputCls}
              />
            </Field>

            <Field label="Rating (0–5)" error={errors.rating?.message}>
              <input
                {...register("rating")}
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder="4.5"
                className={inputCls}
              />
            </Field>
          </FormSection>

          <FormSection title="Images">
            <Field label="Thumbnail URL">
              <input
                {...register("thumbnail")}
                placeholder="https://..."
                className={inputCls}
              />
            </Field>

            <Field label="Additional Images">
              <div className="flex gap-2 mb-2">
                <input
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") { e.preventDefault(); addImageUrl(); }
                  }}
                  placeholder="https://..."
                  className={`${inputCls} flex-1`}
                />
                <button
                  type="button"
                  onClick={addImageUrl}
                  className="p-2.5 bg-[#610F7F] text-white rounded-xl hover:bg-[#2F0147] transition-colors"
                  aria-label="Add image URL"
                >
                  <ImagePlus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-[#9C528B]/60 dark:text-white/40 bg-[#F8F4FF] dark:bg-white/5 rounded-lg px-3 py-2"
                  >
                    <span className="flex-1 truncate">{img}</span>
                    <button
                      type="button"
                      onClick={() => setImages((arr) => arr.filter((_, j) => j !== i))}
                      aria-label="Remove image"
                    >
                      <X className="w-3 h-3 hover:text-red-500 transition-colors" />
                    </button>
                  </div>
                ))}
              </div>
            </Field>
          </FormSection>
        </div>
      </div>

      {/* ── Actions ── */}
      <div className="flex items-center gap-3 pt-2">
        <Link
          href="/admin/products"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E2C2C6]/30 dark:border-white/10 text-sm font-medium text-[#9C528B] dark:text-white/60 hover:bg-[#F5E6FF] dark:hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Cancel
        </Link>

        <motion.button
          type="submit"
          id="product-form-submit"
          disabled={saving || saved}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2F0147] to-[#610F7F] text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
        >
          {saving ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
          ) : saved ? (
            <><Check className="w-4 h-4" /> Saved!</>
          ) : (
            <><Save className="w-4 h-4" /> {mode === "edit" ? "Update Product" : "Add Product"}</>
          )}
        </motion.button>
      </div>
    </form>
  );
}
