import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    productName: { type: String },
    customerId: { type: String },
    customerName: { type: String, required: true },
    customerEmail: { type: String },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    approved: { type: Boolean, default: false },
    helpful: { type: Number, default: 0 },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
