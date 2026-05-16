"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_image_1778907115558.png"
          alt="Premium Traditional Fashion – Instant Boutique"
          fill
          unoptimized
          className="object-cover object-center"
          priority
        />
        {/* Rich layered gradient overlay */}
      </div>

      {/* Floating orbs for depth */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#610F7F]/20 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-[#9C528B]/20 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        {/* Pre-heading pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse" />
          <span className="text-[#D4AF37] uppercase tracking-[0.25em] text-xs font-medium">
            Premium Indian Ethnic Wear
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.05] tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Where Tradition
          <br />
          <span className="text-gradient-gold">Meets Elegance</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-white/75 text-base md:text-lg max-w-xl mb-12 leading-relaxed"
        >
          Handcrafted luxury for the modern Indian woman — sarees, bridal wear & designer ensembles woven with heritage.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/collections"
            className="btn-gold rounded-sm shadow-[0_8px_30px_rgba(212,175,55,0.35)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.5)] hover:-translate-y-1 transition-all duration-300"
          >
            Explore Collections
          </Link>
          <Link
            href="/custom-orders"
            className="btn-ghost rounded-sm"
          >
            Book Consultation
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
