import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getProductByIdAdmin, updateProductAdmin, deleteProductAdmin } from "@/lib/adminData";

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
  const updated = updateProductAdmin(id, body);
  if (!updated) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return NextResponse.json({ success: true, product: updated });
}

export async function DELETE(request, { params }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const deleted = deleteProductAdmin(id);
  if (!deleted) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return NextResponse.json({ success: true, id });
}
