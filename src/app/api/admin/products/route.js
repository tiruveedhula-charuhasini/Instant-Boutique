import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getAllProductsAdmin } from "@/lib/adminData";

// GET — list all products
export async function GET(request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");

  let products = getAllProductsAdmin();

  if (category) products = products.filter(p => (p.category || p._category || "").toLowerCase() === category.toLowerCase());
  if (search) products = products.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));

  const total = products.length;
  const paginated = products.slice((page - 1) * limit, page * limit);

  return NextResponse.json({ products: paginated, total, page, limit });
}

// POST — create a new product (writes to JSON files for now)
export async function POST(request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    // TODO: Replace with Mongoose: await dbConnect(); await Product.create(body);
    // For now, return mock success
    return NextResponse.json({ success: true, product: { ...body, id: Date.now() } }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
