import SectionHeading from "@/components/ui/SectionHeading";
import { Star } from "lucide-react";

export const metadata = {
  title: "Testimonials | Instant Boutique",
  description: "Read what our customers have to say about our premium ethnic wear.",
};

export default function TestimonialsPage() {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Bride",
      content: "The custom bridal lehenga they created for my wedding was beyond my wildest dreams. The attention to detail and the quality of zardosi work was exceptional.",
    },
    {
      id: 2,
      name: "Ananya Patel",
      role: "Regular Customer",
      content: "I've bought several Banarasi sarees from Instant Boutique. The authenticity of the weave and the modern color palettes they offer are unmatched.",
    },
    {
      id: 3,
      name: "Meera Reddy",
      role: "Fashion Blogger",
      content: "Their festive kurtis are my absolute favorite. The perfect blend of comfort and luxury. Highly recommend to anyone looking for premium ethnic wear.",
    },
    {
      id: 4,
      name: "Kavya Singh",
      role: "Bride's Sister",
      content: "We got our entire family's outfits custom made here. The team was incredibly patient and delivered everything perfectly on time. The fittings were flawless.",
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-[#FCFAFA] min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          title="Client Diaries" 
          subtitle="Stories from our happy customers"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-sm shadow-sm border border-[#E2C2C6]/20">
              <div className="flex text-[#9C528B] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
              <div>
                <h4 className="font-semibold text-gray-900" style={{ fontFamily: "var(--font-serif)" }}>{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
