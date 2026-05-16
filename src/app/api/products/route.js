import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/data';

export async function GET() {
  const products = getAllProducts();
  return NextResponse.json(products);
}
