"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

const stats = [
  { value: "20+", label: "Master Artisans" },
  { value: "5K+", label: "Happy Customers" },
  { value: "500+", label: "Unique Designs" },
  { value: "12+", label: "Years of Heritage" },
];

const values = [
  { title: "Authentic Craftsmanship", desc: "Every stitch is placed by skilled artisans who have inherited their craft across generations." },
  { title: "Sustainable Luxury", desc: "We work directly with weavers, ensuring fair wages and sustainable, eco-friendly practices." },
  { title: "Timeless Elegance", desc: "Our designs bridge the gap between traditional Indian artistry and contemporary fashion sensibilities." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Banner */}
      <div className="bg-gradient-premium py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#9C528B]/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-3">Est. 2012, Mumbai</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            Our Story
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            A passionate celebration of India's rich textile heritage — crafted for the modern woman.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#E2C2C6] translate-x-5 translate-y-5 rounded-sm" />
              <Image
                src="/images/craftsmanship_image_1778907185409.png"
                alt="Master artisans at work"
                width={600}
                height={700}
                unoptimized
                className="relative z-10 w-full rounded-sm shadow-luxury object-cover"
              />
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 z-20 glass-card p-5 rounded-sm text-center shadow-luxury">
                <span className="text-3xl font-bold text-[#610F7F] block" style={{ fontFamily: "var(--font-serif)" }}>12+</span>
                <span className="text-xs text-gray-500 uppercase tracking-widest">Years of Heritage</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="pt-6 lg:pt-0"
            >
              <SectionHeading title="Born from Heritage" subtitle="" align="left" />
              <div className="space-y-6 text-gray-600 leading-relaxed text-base mt-6">
                <p>
                  Founded in 2012, <strong className="text-[#610F7F]">Instant Boutique</strong> was born from a singular vision — to make India's most exquisite handcrafted textiles accessible to the modern woman, without compromising on authenticity or artistry.
                </p>
                <p>
                  Every piece in our collection is thoughtfully curated and crafted by skilled artisans who have inherited their techniques through generations. From the intricate Kanjivaram silk weaves to delicate hand-embroidery on our festive kurtis, each garment tells a story of heritage and passion.
                </p>
                <p>
                  We work directly with weavers across Tamil Nadu, Varanasi, Lucknow, and Rajasthan — preserving traditional art forms while providing our customers with premium, authentic, and timeless fashion.
                </p>
              </div>
              <Link href="/collections" className="btn-primary rounded-sm mt-8 inline-flex">
                Explore Our Collections
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-premium relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, #D4AF37 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient-gold mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                  {value}
                </div>
                <p className="text-white/60 text-sm uppercase tracking-widest">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <SectionHeading title="Our Commitment" subtitle="The principles that guide every stitch and every decision we make." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {values.map(({ title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass-card p-8 rounded-sm hover:shadow-luxury transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-10 h-10 bg-gradient-premium rounded-full flex items-center justify-center mb-5">
                  <span className="text-[#D4AF37] font-bold">{i + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-serif)" }}>{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
