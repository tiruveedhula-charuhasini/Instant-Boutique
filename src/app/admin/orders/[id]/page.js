import OrderDetailClient from "@/components/admin/OrderDetailClient";

export const metadata = { title: "Order Detail — Instant Boutique Admin" };

// Server component — safely extracts params then passes to client
export default async function OrderDetailPage({ params }) {
  const { id } = await params;
  return <OrderDetailClient orderId={id} />;
}
