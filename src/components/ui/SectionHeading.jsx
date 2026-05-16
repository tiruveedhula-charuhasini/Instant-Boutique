"use client";

import { motion } from "framer-motion";

export default function SectionHeading({ title, subtitle, align = "center", light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-4 ${align === "left" ? "text-left" : "text-center"}`}
    >
      {/* Gold accent line */}
      <div className={`flex items-center gap-3 mb-5 ${align === "center" ? "justify-center" : ""}`}>
        <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4AF37]" />
        <span className={`text-[10px] uppercase tracking-[0.3em] font-semibold ${light ? "text-[#E2C2C6]" : "text-[#9C528B]"}`}>
          Instant Boutique
        </span>
        <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4AF37]" />
      </div>

      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight ${
          light ? "text-white" : "text-gray-900"
        }`}
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {title}
      </h2>

      {subtitle && (
        <p className={`text-base md:text-lg max-w-2xl leading-relaxed ${
          align === "center" ? "mx-auto" : ""
        } ${light ? "text-white/70" : "text-gray-500"}`}>
          {subtitle}
        </p>
      )}

      {/* Decorative underline */}
      <div className={`mt-6 h-0.5 w-16 bg-gradient-to-r from-[#610F7F] to-[#E2C2C6] ${align === "center" ? "mx-auto" : ""}`} />
    </motion.div>
  );
}
