import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getProductByIdAdmin } from "@/lib/adminData";

export async function GET(request, { params }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const product = getProductByIdAdmin(id);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ product });
}

export async function PUT(request, { params }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  // TODO: mongoose: await Product.findByIdAndUpdate(id, body)
  return NextResponse.json({ success: true, product: { id, ...body } });
}

export async function DELETE(request, { params }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  // TODO: mongoose: await Product.findByIdAndDelete(id)
  return NextResponse.json({ success: true, id });
}
