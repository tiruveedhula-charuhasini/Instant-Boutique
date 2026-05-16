import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  thumbnail: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  size: { type: String },
  color: { type: String },
});

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    customer: {
      name: { type: String, required: true },
      email: { type: String },
      phone: { type: String, required: true },
    },
    shippingAddress: {
      line1: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
    },
    items: [OrderItemSchema],
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shippingCost: { type: Number, default: 0 },
    total: { type: Number, required: true },
    couponCode: { type: String },
    paymentMethod: { type: String, enum: ["COD", "UPI", "WhatsApp", "Card", "Online"], default: "COD" },
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed", "Refunded"], default: "Pending" },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    estimatedDelivery: { type: Date },
    notes: { type: String },
    whatsappOrderLink: { type: String },
  },
  { timestamps: true }
);

OrderSchema.index({ orderId: 1 });
OrderSchema.index({ "customer.phone": 1 });
OrderSchema.index({ status: 1, createdAt: -1 });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
