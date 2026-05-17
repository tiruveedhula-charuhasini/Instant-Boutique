import { Suspense } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { getProductsByCategory } from "@/lib/data";
import ClientCategoryPage from "./ClientCategoryPage";

export function generateStaticParams() {
  const categories = ["sarees", "kurtis", "frocks", "dresses", "blouses", "bridal"];
  return categories.map((category) => ({
    category: category,
  }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const title = category.charAt(0).toUpperCase() + category.slice(1);
  return {
    title: `${title} | Instant Boutique`,
    description: `Shop our premium collection of ${title}.`,
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const title = category.charAt(0).toUpperCase() + category.slice(1);

  const displayProducts = getProductsByCategory(category);

  return (
    <div className="pt-32 pb-24 bg-[#FAFAFA] min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          title={`${title} Collection`} 
          subtitle={`Discover elegance with our exclusive ${category}`}
        />
        
        {displayProducts.length > 0 ? (
          <Suspense fallback={<div className="flex justify-center py-20"><div className="w-10 h-10 border-2 border-[#9C528B]/20 border-t-[#610F7F] rounded-full animate-spin"></div></div>}>
            <ClientCategoryPage initialProducts={displayProducts} categoryName={title} />
          </Suspense>
        ) : (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg">New collection dropping soon. Stay tuned!</p>
            <a href="/collections" className="inline-block mt-6 border border-[#9C528B] text-[#9C528B] px-8 py-3 uppercase tracking-widest text-sm font-medium hover:bg-[#9C528B] hover:text-white transition-colors duration-300">
              Browse Other Categories
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
