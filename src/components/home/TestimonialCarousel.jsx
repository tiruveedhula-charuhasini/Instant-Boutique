"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    text: "The Banarasi saree I ordered for my sister's wedding was absolutely breathtaking. The quality of the silk and the intricate zari work exceeded all my expectations.",
    rating: 5,
  },
  {
    id: 2,
    name: "Ananya Patel",
    location: "London",
    text: "I was hesitant to order bridal wear online, but Instant Boutique made the custom order process seamless. My lehenga fit perfectly and looked like a million dollars.",
    rating: 5,
  },
  {
    id: 3,
    name: "Meera Reddy",
    location: "Hyderabad",
    text: "Their kurtis are my go-to for festive wear. The fabric is premium, the cuts are modern yet traditional, and they always deliver on time. Highly recommended!",
    rating: 4,
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  return (
    <section className="py-24 bg-gradient-light relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#E2C2C6]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#EBD9F2]/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <SectionHeading 
          title="Client Diaries" 
          subtitle="What our beautiful brides and clients have to say about their Instant Boutique experience."
        />

        <div className="relative mt-16 px-8 md:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="flex text-[#D4AF37] mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={24} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-xl md:text-3xl text-gray-800 leading-relaxed font-medium mb-8" style={{ fontFamily: "var(--font-serif)" }}>
                "{testimonials[currentIndex].text}"
              </p>
              
              <div className="flex flex-col items-center">
                <span className="text-sm uppercase tracking-widest font-bold text-[#610F7F]">
                  {testimonials[currentIndex].name}
                </span>
                <span className="text-sm text-gray-500 mt-1">
                  {testimonials[currentIndex].location}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <button 
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white/50 backdrop-blur rounded-full text-[#610F7F] hover:bg-white transition-colors shadow-sm"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-white/50 backdrop-blur rounded-full text-[#610F7F] hover:bg-white transition-colors shadow-sm"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-12 gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-8 bg-[#9C528B]" : "bg-[#E2C2C6]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
