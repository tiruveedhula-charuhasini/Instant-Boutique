/**
 * adminData.js — Reads/writes product data from JSON files.
 * This is the "no-DB" layer that works immediately.
 * When MongoDB is ready, replace these functions with Mongoose queries.
 */

import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src/data/categories");

// ─── Read all products from all category JSON files ──────────────────────────
export function getAllProductsAdmin() {
  try {
    const files = fs.readdirSync(DATA_DIR);
    let all = [];
    for (const file of files) {
      if (file.endsWith(".json")) {
        const raw = fs.readFileSync(path.join(DATA_DIR, file), "utf8");
        const products = JSON.parse(raw);
        all = [...all, ...products.map((p) => ({ ...p, _category: file.replace(".json", "") }))];
      }
    }
    return all;
  } catch {
    return [];
  }
}

// ─── Get one product by ID ────────────────────────────────────────────────────
export function getProductByIdAdmin(id) {
  const all = getAllProductsAdmin();
  return all.find((p) => String(p.id) === String(id)) ?? null;
}

// ─── Get products by category ─────────────────────────────────────────────────
export function getProductsByCategoryAdmin(category) {
  try {
    const filePath = path.join(DATA_DIR, `${category.toLowerCase()}.json`);
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveProductAdmin(product) {
  const cat = product.category || "sarees";
  const filePath = path.join(DATA_DIR, `${cat.toLowerCase()}.json`);
  let products = [];
  try {
    if (fs.existsSync(filePath)) {
      products = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
  } catch {}
  products.unshift(product);
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  return product;
}

export function updateProductAdmin(id, updates) {
  try {
    const files = fs.readdirSync(DATA_DIR);
    for (const file of files) {
      if (file.endsWith(".json")) {
        const filePath = path.join(DATA_DIR, file);
        let products = JSON.parse(fs.readFileSync(filePath, "utf8"));
        const idx = products.findIndex((p) => String(p.id) === String(id));
        if (idx !== -1) {
          products[idx] = { ...products[idx], ...updates };
          fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
          return products[idx];
        }
      }
    }
  } catch {}
  return null;
}

export function deleteProductAdmin(id) {
  try {
    const files = fs.readdirSync(DATA_DIR);
    for (const file of files) {
      if (file.endsWith(".json")) {
        const filePath = path.join(DATA_DIR, file);
        let products = JSON.parse(fs.readFileSync(filePath, "utf8"));
        const initialLength = products.length;
        products = products.filter((p) => String(p.id) !== String(id));
        if (products.length !== initialLength) {
          fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
          return true;
        }
      }
    }
  } catch {}
  return false;
}

// ─── Summary stats derived from JSON data ─────────────────────────────────────
export function getAdminStats() {
  const products = getAllProductsAdmin();
  const totalProducts = products.length;
  const lowStock = products.filter(
    (p) => p.stockQuantity !== undefined && p.stockQuantity < 5
  ).length;

  const categories = {};
  for (const p of products) {
    const cat = p.category || p._category || "Other";
    categories[cat] = (categories[cat] || 0) + 1;
  }

  return {
    totalProducts,
    lowStock,
    categories,
    avgPrice:
      products.length > 0
        ? Math.round(
            products.reduce((s, p) => s + (p.price ?? 0), 0) / products.length
          )
        : 0,
  };
}

// ─── Orders stored in a local JSON (mock persistence) ────────────────────────
const ORDERS_FILE = path.join(process.cwd(), "src/data/orders.json");

export function getAllOrders() {
  try {
    if (!fs.existsSync(ORDERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(ORDERS_FILE, "utf8"));
  } catch {
    return [];
  }
}

export function saveOrder(order) {
  const orders = getAllOrders();
  orders.unshift(order);
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  return order;
}

export function updateOrderStatus(orderId, status) {
  const orders = getAllOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx === -1) return null;
  orders[idx].status = status;
  orders[idx].updatedAt = new Date().toISOString();
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  return orders[idx];
}

// ─── Reviews stored locally ───────────────────────────────────────────────────
const REVIEWS_FILE = path.join(process.cwd(), "src/data/reviews.json");

export function getAllReviews() {
  try {
    if (!fs.existsSync(REVIEWS_FILE)) return [];
    return JSON.parse(fs.readFileSync(REVIEWS_FILE, "utf8"));
  } catch {
    return [];
  }
}

// ─── Coupons stored locally ───────────────────────────────────────────────────
const COUPONS_FILE = path.join(process.cwd(), "src/data/coupons.json");

export function getAllCoupons() {
  try {
    if (!fs.existsSync(COUPONS_FILE)) return [];
    return JSON.parse(fs.readFileSync(COUPONS_FILE, "utf8"));
  } catch {
    return [];
  }
}

export function saveCoupon(coupon) {
  const coupons = getAllCoupons();
  coupons.unshift(coupon);
  fs.writeFileSync(COUPONS_FILE, JSON.stringify(coupons, null, 2));
  return coupon;
}

export function deleteCoupon(code) {
  const coupons = getAllCoupons().filter((c) => c.code !== code);
  fs.writeFileSync(COUPONS_FILE, JSON.stringify(coupons, null, 2));
}
