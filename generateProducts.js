const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'src/data/categories');

// Image pools
const sareeImages = [
  '/images/saree_image_1778907133649.png',
  '/images/saree_banarasi_1778909373510.png',
  '/images/saree_designer_1778909374137.png',
  '/images/saree_cotton_1778910386572.png'
];

const kurtiImages = [
  '/images/kurti_image_1778907149733.png',
  '/images/kurti_straight_1778909391846.png',
  '/images/kurti_party_1778910403804.png'
];

const dressImages = [
  '/images/dress_image_1778907200388.png',
  '/images/dress_indo_western_1778909421111.png',
  '/images/dress_maxi_1778910421198.png'
];

const frockImages = [
  '/images/dress_image_1778907200388.png',
  '/images/frock_kids_1778910438508.png'
];

const blouseImages = [
  '/images/blouse_puff_1778909439615.png',
  '/images/blouse_embroidered_1778910458302.png'
];

const bridalImages = [
  '/images/bridal_pastel_1778909455805.png',
  '/images/bridal_image_1778907169512.png'
];

const categoriesData = [
  {
    name: 'sarees',
    subcategories: ['Banarasi', 'Kanjivaram', 'Designer Sarees', 'Party Wear', 'Cotton Silk'],
    images: sareeImages,
    basePrice: 5000,
    fabrics: ['Pure Silk', 'Banarasi Silk', 'Georgette', 'Cotton Silk', 'Organza']
  },
  {
    name: 'kurtis',
    subcategories: ['Anarkali', 'Straight Cut', 'Festive Wear', 'Cotton Kurtis'],
    images: kurtiImages,
    basePrice: 1500,
    fabrics: ['Cotton Silk', 'Premium Cotton', 'Rayon', 'Chanderi']
  },
  {
    name: 'dresses',
    subcategories: ['Indo-Western', 'Maxi Dresses', 'Party Dresses'],
    images: dressImages,
    basePrice: 3500,
    fabrics: ['Georgette', 'Silk Blend', 'Crepe', 'Chiffon']
  },
  {
    name: 'frocks',
    subcategories: ['Casual', 'Kids Collection', 'Party Wear'],
    images: frockImages,
    basePrice: 1200,
    fabrics: ['100% Cotton', 'Organza', 'Net', 'Silk Blend']
  },
  {
    name: 'blouses',
    subcategories: ['Bridal Blouses', 'Embroidered', 'Designer', 'Puff Sleeve'],
    images: blouseImages,
    basePrice: 2000,
    fabrics: ['Raw Silk', 'Pure Silk', 'Velvet', 'Brocade']
  },
  {
    name: 'bridal',
    subcategories: ['Lehenga', 'Bridal Gown', 'Reception Wear'],
    images: bridalImages,
    basePrice: 25000,
    fabrics: ['Organza Silk', 'Velvet', 'Raw Silk', 'Heavy Net']
  }
];

const colors = ["Ruby Red", "Emerald Green", "Royal Blue", "Lavender", "Blush Pink", "Mint Green", "Ivory", "Rosy Taupe", "Grape Soda", "Gold"];
const sizesMap = {
  sarees: ["Free Size"],
  bridal: ["Custom Fit"],
  others: ["XS", "S", "M", "L", "XL", "XXL"]
};
const possibleTags = ["bestseller", "new arrival", "trending", "premium", "festive", "traditional", "casual"];
const adjectives = ["Royal", "Elegant", "Premium", "Luxurious", "Handcrafted", "Classic", "Modern", "Vibrant"];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomTags() {
  const numTags = Math.floor(Math.random() * 3) + 1; // 1 to 3 tags
  const tags = new Set();
  while(tags.size < numTags) {
    tags.add(getRandomItem(possibleTags));
  }
  return Array.from(tags);
}

categoriesData.forEach(cat => {
  const products = [];
  
  for (let i = 1; i <= 10; i++) {
    const subcat = getRandomItem(cat.subcategories);
    const fabric = getRandomItem(cat.fabrics);
    const color = getRandomItem(colors);
    const adj = getRandomItem(adjectives);
    const img = getRandomItem(cat.images);
    
    // Dynamic price based on basePrice + random variation
    const price = Math.floor(cat.basePrice + (Math.random() * cat.basePrice * 1.5));
    // Round to nearest 100
    const finalPrice = Math.round(price / 100) * 100;
    
    let sizes = sizesMap.others;
    if (cat.name === 'sarees') sizes = sizesMap.sarees;
    if (cat.name === 'bridal') sizes = sizesMap.bridal;

    const product = {
      id: `${cat.name.substring(0,2)}${i}`,
      slug: `${adj.toLowerCase()}-${color.toLowerCase().replace(' ', '-')}-${subcat.toLowerCase().replace(' ', '-')}`,
      name: `${adj} ${color} ${subcat}`,
      category: cat.name.charAt(0).toUpperCase() + cat.name.slice(1),
      subcategory: subcat,
      price: finalPrice,
      originalPrice: Math.round(finalPrice * 1.2 / 100) * 100,
      description: `Discover the luxury of this ${adj.toLowerCase()} ${cat.name.slice(0,-1)}. Handcrafted with premium ${fabric} in a stunning ${color} hue. Perfect for your most cherished occasions.`,
      fabric: fabric,
      images: [img, img], // Dummy double image for gallery
      colors: [color, getRandomItem(colors)],
      sizes: sizes,
      stockStatus: Math.random() > 0.2 ? "In Stock" : "Low Stock",
      rating: Number((4 + Math.random()).toFixed(1)),
      reviews: Math.floor(Math.random() * 200) + 10,
      tags: getRandomTags()
    };
    
    products.push(product);
  }
  
  fs.writeFileSync(path.join(outputDir, `${cat.name}.json`), JSON.stringify(products, null, 2));
  console.log(`Generated ${cat.name}.json`);
});
