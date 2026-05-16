import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getAllOrders, updateOrderStatus } from "@/lib/adminData";

export async function GET(request, { params }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const orders = getAllOrders();
  const order = orders.find(o => o.id === id);
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ order });
}

export async function PUT(request, { params }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { status } = await request.json();
  const updated = updateOrderStatus(id, status);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ success: true, order: updated });
}
