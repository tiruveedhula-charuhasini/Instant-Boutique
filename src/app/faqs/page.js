"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const faqs = [
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship worldwide. International shipping usually takes 7–14 business days depending on the destination. Shipping costs are calculated based on your location and order weight.",
  },
  {
    question: "How long does a custom bridal order take?",
    answer: "We recommend booking your consultation at least 3–4 months before your wedding. The actual creation process takes 8–12 weeks depending on design intricacy and embroidery work. Rush orders are possible — please contact us.",
  },
  {
    question: "Can I customize the color of an existing design?",
    answer: "Absolutely! Most outfits can be customized in different colors and fabrics. Contact our support team or book a consultation to discuss your specific requirements. We love bringing your vision to life.",
  },
  {
    question: "What is your return policy?",
    answer: "Ready-to-wear items can be returned within 7 days of delivery, provided they are unworn with all tags attached. Custom and bridal orders are final sale. We ensure every piece is quality-checked before dispatch.",
  },
  {
    question: "How do I care for my silk sarees?",
    answer: "We highly recommend dry cleaning only for all pure silk and embroidered garments. Store them folded in soft muslin cloth and avoid hanging heavy embellished pieces. Keep away from direct sunlight to preserve color vibrancy.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major UPI apps, net banking, credit/debit cards. For custom bridal orders, we work on a 50% advance payment model. You can also WhatsApp us to discuss installment options.",
  },
  {
    question: "Do you offer WhatsApp ordering?",
    answer: "Yes! You can browse our catalog and place orders directly via WhatsApp. Just click the WhatsApp button on any product page or message us at +91 98765 43210 with the product name and your details.",
  },
];

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`border rounded-sm transition-all duration-300 ${
        open
          ? "border-[#9C528B]/50 bg-[#F9F0FA] shadow-card"
          : "border-[#E2C2C6]/50 bg-white hover:border-[#B9929F]/60"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left group"
        aria-expanded={open}
      >
        <span
          className={`text-lg font-semibold pr-6 transition-colors duration-300 ${
            open ? "text-[#610F7F]" : "text-gray-900 group-hover:text-[#9C528B]"
          }`}
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {faq.question}
        </span>
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            open
              ? "bg-[#610F7F] text-white"
              : "bg-[#E2C2C6]/30 text-[#9C528B] group-hover:bg-[#E2C2C6]/60"
          }`}
        >
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-gray-600 leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQsPage() {
  return (
    <div className="pt-32 pb-24 bg-surface min-h-screen">
      {/* Header banner */}
      <div className="bg-gradient-premium py-16 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 25% 50%, #D4AF37 0%, transparent 60%)" }} />
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-3">Help Center</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-serif)" }}>
            Frequently Asked Questions
          </h1>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">Everything you need to know about our boutique, ordering, and care.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-3xl">
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-10 bg-gradient-light rounded-sm border border-[#E2C2C6]/40">
          <p className="text-gray-700 text-lg mb-2" style={{ fontFamily: "var(--font-serif)" }}>Still have questions?</p>
          <p className="text-gray-500 text-sm mb-6">Our team is ready to help you find the perfect outfit.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary rounded-sm">
              Contact Us
            </a>
            <a
              href="https://wa.me/+919876543210?text=Hello Instant Boutique, I have a question!"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline rounded-sm"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
