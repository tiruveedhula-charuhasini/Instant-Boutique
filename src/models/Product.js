import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String },
    shortDescription: { type: String },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number },
    discountPercent: { type: Number, default: 0 },
    category: { type: String, required: true, lowercase: true },
    subcategory: { type: String },
    tags: [{ type: String }],
    sku: { type: String },
    fabric: { type: String },
    colors: [{ type: String }],
    sizes: [{ type: String }],
    stockQuantity: { type: Number, default: 0 },
    availability: { type: String, enum: ["in_stock", "out_of_stock", "pre_order"], default: "in_stock" },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    images: [{ type: String }],
    thumbnail: { type: String },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  { timestamps: true }
);

ProductSchema.index({ name: "text", description: "text", tags: "text" });
ProductSchema.index({ category: 1, price: 1 });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
