import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getAllOrders, saveOrder, updateOrderStatus } from "@/lib/adminData";

export async function GET(request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  let orders = getAllOrders();
  if (status) orders = orders.filter(o => o.status === status);

  return NextResponse.json({ orders, total: orders.length });
}

export async function POST(request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const order = {
    ...body,
    id: `ORD-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "Pending",
  };

  try {
    const saved = saveOrder(order);
    return NextResponse.json({ success: true, order: saved }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
