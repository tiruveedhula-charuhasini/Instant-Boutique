import { getProductById, getAllProducts, getProductsByCategory } from "@/lib/data";
import ProductGallery from "@/components/products/ProductGallery";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/ui/ProductCard";
import { MessageCircle, Heart, ShieldCheck, RefreshCw, Truck } from "lucide-react";

export function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    category: product.category.toLowerCase(),
    id: product.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | Instant Boutique`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { category, id } = await params;
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center min-h-screen">
        <h1 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-serif)" }}>Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you are looking for does not exist or has been removed.</p>
        <a href="/collections" className="inline-block bg-[#9C528B] text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-[#2F0147]">
          Back to Collections
        </a>
      </div>
    );
  }

  // Get similar products (excluding the current one)
  const allCategoryProducts = getProductsByCategory(category);
  const similarProducts = allCategoryProducts.filter(p => p.id !== id).slice(0, 4);

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-8 uppercase tracking-widest font-medium">
          <a href="/" className="hover:text-[#9C528B] transition-colors">Home</a>
          <span className="mx-2">/</span>
          <a href={`/collections/${category}`} className="hover:text-[#9C528B] transition-colors">{category}</a>
          <span className="mx-2">/</span>
          <span className="text-[#610F7F]">{product.name}</span>
        </nav>

        {/* Product Details Section */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-24">
          {/* Left: Gallery */}
          <div className="w-full lg:w-1/2">
            <ProductGallery images={product.images} altText={product.name} />
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm uppercase tracking-widest text-[#9C528B] font-medium border-b border-[#9C528B] pb-1">
                {product.subcategory || product.category}
              </span>
              <div className="flex gap-2">
                {product.tags?.map(tag => (
                  <span key={tag} className="text-[10px] bg-[#E2C2C6]/20 text-[#610F7F] px-2 py-1 uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="text-2xl text-[#610F7F] font-semibold">
                ₹{product.price.toLocaleString('en-IN')}
              </div>
              <div className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-sm font-medium">
                {product.stockStatus || "In Stock"}
              </div>
            </div>

            <p className="text-gray-600 mb-10 leading-relaxed text-lg">
              {product.description}
            </p>

            {/* Specifications */}
            <div className="bg-[#FCFAFA] border border-gray-100 p-6 mb-10">
              <h3 className="uppercase tracking-widest text-sm font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Product Specifications</h3>
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Fabric</span>
                  <span className="text-sm font-medium text-gray-900">{product.fabric || "Premium Blended"}</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Color Options</span>
                  <span className="text-sm font-medium text-gray-900">{product.colors?.join(", ") || "As shown"}</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Available Sizes</span>
                  <span className="text-sm font-medium text-gray-900">{product.sizes?.join(", ") || "Custom"}</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1">SKU</span>
                  <span className="text-sm font-medium text-gray-900">IB-{product.id.toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 mt-auto">
              <a 
                href={`https://wa.me/+919876543210?text=Hello Instant Boutique! I want to order the ${product.name} (SKU: IB-${product.id.toUpperCase()}) priced at ₹${product.price.toLocaleString()}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#2F0147] text-[#D4AF37] py-5 flex items-center justify-center gap-3 uppercase tracking-widest text-sm font-bold hover:bg-[#610F7F] transition-colors shadow-xl"
              >
                <MessageCircle size={20} />
                Enquire via WhatsApp
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-8">
              <div className="flex flex-col items-center text-center gap-2 text-gray-600">
                <ShieldCheck size={24} className="text-[#9C528B]" />
                <span className="text-xs uppercase tracking-widest">Secure<br/>Payment</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 text-gray-600">
                <Truck size={24} className="text-[#9C528B]" />
                <span className="text-xs uppercase tracking-widest">Global<br/>Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 text-gray-600">
                <RefreshCw size={24} className="text-[#9C528B]" />
                <span className="text-xs uppercase tracking-widest">Easy<br/>Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="border-t border-gray-100 pt-20">
            <SectionHeading title="Similar Styles" subtitle="You might also love these handcrafted pieces" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
