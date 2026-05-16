import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'src/data/categories');

export function getAllProducts() {
  const files = fs.readdirSync(dataDir);
  let allProducts = [];

  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(dataDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const products = JSON.parse(fileContents);
      allProducts = [...allProducts, ...products];
    }
  }

  return allProducts;
}

export function getProductsByCategory(categorySlug) {
  try {
    const filePath = path.join(dataDir, `${categorySlug.toLowerCase()}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return [];
  }
}

export function getProductById(id) {
  const allProducts = getAllProducts();
  return allProducts.find(product => product.id === id);
}

export function getTrendingProducts() {
  const allProducts = getAllProducts();
  return allProducts.filter(p => p.tags && p.tags.includes('trending')).slice(0, 4);
}

export function getNewArrivals() {
  const allProducts = getAllProducts();
  return allProducts.filter(p => p.tags && p.tags.includes('new arrival')).slice(0, 4);
}

export function getBestsellers() {
  const allProducts = getAllProducts();
  return allProducts.filter(p => p.tags && p.tags.includes('bestseller')).slice(0, 4);
}
