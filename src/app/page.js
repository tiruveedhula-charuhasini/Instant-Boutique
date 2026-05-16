import HeroSection from "@/components/ui/HeroSection";
import SectionHeading from "@/components/ui/SectionHeading";
import CategoryCard from "@/components/ui/CategoryCard";
import ProductCard from "@/components/ui/ProductCard";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import NewsletterSection from "@/components/home/NewsletterSection";
import { getTrendingProducts, getNewArrivals } from "@/lib/data";
import { Sparkles, Award, Truck, RefreshCw } from "lucide-react";

export const metadata = {
  title: "Instant Boutique | Premium Indian Ethnic Wear",
  description: "Discover handcrafted sarees, bridal lehengas, kurtis and dresses. Where tradition meets elegance.",
};

export default function Home() {
  const trendingProducts = getTrendingProducts();
  const newArrivals = getNewArrivals();

  const categories = [
    { title: "Sarees", image: "/images/saree_image_1778907133649.png", href: "/collections/sarees" },
    { title: "Bridal", image: "/images/bridal_image_1778907169512.png", href: "/collections/bridal" },
    { title: "Dresses", image: "/images/dress_indo_western_1778909421111.png", href: "/collections/dresses" },
  ];

  const trustBadges = [
    { icon: Award, title: "Authentic Handcraft", desc: "Each piece made by master artisans" },
    { icon: Truck, title: "Worldwide Shipping", desc: "Delivered to 50+ countries" },
    { icon: Sparkles, title: "Premium Quality", desc: "Finest fabrics, guaranteed" },
    { icon: RefreshCw, title: "Easy Returns", desc: "7-day hassle-free returns" },
  ];

  return (
    <>
      <HeroSection />

      {/* Trust Bar */}
      <section className="bg-white border-b border-[#E2C2C6]/30 py-6">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-light rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-[#610F7F]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">{title}</p>
                  <p className="text-[10px] text-gray-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 bg-surface relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#EBD9F2]/30 -z-10 skew-x-6" />
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeading
            title="Curated Elegance"
            subtitle="Explore our signature collections blending heritage with contemporary luxury"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {categories.map((cat, idx) => (
              <CategoryCard
                key={cat.title}
                title={cat.title}
                image={cat.image}
                href={cat.href}
                delay={idx * 0.2}
              />
            ))}
          </div>
          <div className="text-center mt-14">
            <a href="/collections" className="btn-outline rounded-sm inline-block">
              View All Categories
            </a>
          </div>
        </div>
      </section>

      {/* Trending Now */}
      {trendingProducts.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <SectionHeading
              title="Trending Now"
              subtitle="The most coveted pieces from our latest drop"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Craftsmanship Story */}
      <section className="py-32 bg-surface relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/3 w-[700px] h-[700px] bg-gradient-light rounded-full opacity-60 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full lg:w-5/12 relative flex-shrink-0">
            <div className="absolute inset-0 bg-[#E2C2C6] translate-x-4 translate-y-4 rounded-sm" />
            <img
              src="/images/craftsmanship_image_1778907185409.png"
              alt="Master artisans crafting premium Indian ethnic wear"
              className="w-full relative z-10 rounded-sm shadow-luxury"
            />
            <div className="absolute -bottom-8 -right-8 glass-card p-6 rounded-sm z-20 text-center shadow-luxury">
              <span className="text-3xl font-bold text-[#610F7F] block" style={{ fontFamily: "var(--font-serif)" }}>20+</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 mt-1 block">Master Artisans</span>
            </div>
          </div>

          <div className="w-full lg:w-7/12 mt-12 lg:mt-0">
            <SectionHeading title="The Art of Tradition" subtitle="" align="left" />
            <p className="text-gray-600 mb-8 leading-relaxed text-lg mt-4">
              Every piece at Instant Boutique tells a story of heritage. We collaborate directly with master weavers across India to bring you authentic, handcrafted fashion that celebrates our rich cultural tapestry while embracing modern sensibilities.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { n: "5,000+", l: "Happy Customers" },
                { n: "500+", l: "Unique Designs" },
                { n: "12", l: "States Represented" },
                { n: "100%", l: "Ethically Sourced" },
              ].map(({ n, l }) => (
                <div key={l} className="glass-card p-4 rounded-sm text-center">
                  <p className="text-xl font-bold text-[#610F7F]" style={{ fontFamily: "var(--font-serif)" }}>{n}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">{l}</p>
                </div>
              ))}
            </div>
            <a href="/about" className="btn-primary rounded-sm inline-flex">
              Discover Our Story
            </a>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <SectionHeading
              title="New Arrivals"
              subtitle="Fresh elegance straight from the loom"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* Newsletter */}
      <NewsletterSection />
    </>
  );
}
