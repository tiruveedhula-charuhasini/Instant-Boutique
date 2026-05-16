"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CategoryCard({ title, image, href, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative group overflow-hidden rounded-sm h-[450px] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      <Link href={href} className="block w-full h-full relative z-10">
        <Image
          src={image}
          alt={title}
          fill
          unoptimized
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        {/* Gradient Overlay for Glossy Look */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-premium opacity-0 group-hover:opacity-40 transition-opacity duration-500 mix-blend-overlay" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <h3 
            className="text-white text-3xl md:text-4xl font-medium tracking-wide mb-3 drop-shadow-md"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {title}
          </h3>
          
          <div className="flex items-center text-[#E2C2C6] text-sm uppercase tracking-[0.2em] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <span>Explore</span>
            <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform duration-500" />
          </div>
          
          {/* Animated line */}
          <div className="w-12 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#E2C2C6] mt-4 transition-all duration-700 group-hover:w-full opacity-50 group-hover:opacity-100" />
        </div>
      </Link>
    </motion.div>
  );
}
