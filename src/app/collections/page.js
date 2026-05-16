import CategoryCard from "@/components/ui/CategoryCard";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Collections | Instant Boutique",
  description: "Explore our premium ethnic wear collections including Sarees, Kurtis, Frocks, Dresses, and Blouses.",
};

export default function CollectionsPage() {
  const categories = [
    { title: "Sarees", image: "/images/saree_image_1778907133649.png", href: "/collections/sarees" },
    { title: "Kurtis", image: "/images/kurti_image_1778907149733.png", href: "/collections/kurtis" },
    { title: "Frocks", image: "/images/dress_image_1778907200388.png", href: "/collections/frocks" },
    { title: "Dresses", image: "/images/dress_image_1778907200388.png", href: "/collections/dresses" },
    { title: "Blouses", image: "/images/bridal_image_1778907169512.png", href: "/collections/blouses" },
    { title: "Bridal", image: "/images/bridal_image_1778907169512.png", href: "/collections/bridal" },
  ];

  return (
    <div className="pt-32 pb-24 bg-[#FAFAFA]">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          title="Our Collections" 
          subtitle="Discover our handcrafted ranges designed for every occasion"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <CategoryCard 
              key={cat.title} 
              title={cat.title} 
              image={cat.image} 
              href={cat.href}
              delay={idx * 0.1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
