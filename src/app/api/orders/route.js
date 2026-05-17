import { NextResponse } from "next/server";
import { saveOrder } from "@/lib/adminData";

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.customer || !body.phone || !body.amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const order = {
      ...body,
      id: `ORD-${Date.now()}`,
      status: "Pending",
      createdAt: new Date().toISOString(),
      date: body.date || new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
    };
    const saved = saveOrder(order);
    return NextResponse.json({ success: true, order: saved }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
