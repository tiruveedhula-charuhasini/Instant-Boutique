"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useToast } from "@/context/ToastContext";

export default function ContactPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      addToast({ message: "Please fill in all required fields.", type: "error" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      addToast({ message: "Please enter a valid email address.", type: "error" });
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    addToast({ message: "Message sent! We'll respond within 24 hours. ✨", type: "success", duration: 5000 });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const contactItems = [
    {
      icon: MapPin,
      title: "Visit Our Boutique",
      detail: "123 Heritage Lane, Fashion District\nMumbai, MH 400001, India",
    },
    {
      icon: Phone,
      title: "Call Us",
      detail: "+91 98765 43210\nMon–Sat: 10am – 8pm IST",
      href: "tel:+919876543210",
    },
    {
      icon: Mail,
      title: "Email Us",
      detail: "hello@instantboutique.com\nsupport@instantboutique.com",
      href: "mailto:hello@instantboutique.com",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      detail: "+91 98765 43210\nInstant responses",
      href: "https://wa.me/+919876543210?text=Hello Instant Boutique!",
    },
  ];

  return (
    <div className="min-h-screen bg-surface">
      {/* Header Banner */}
      <div className="bg-gradient-premium py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 75% 50%, #D4AF37 0%, transparent 60%)" }} />
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-3">We're here for you</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-serif)" }}>
            Get In Touch
          </h1>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            Have a question, custom order inquiry, or just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-6xl py-20">
        {/* Contact info cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {contactItems.map(({ icon: Icon, title, detail, href }) => (
            <motion.a
              key={title}
              href={href || "#"}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="glass-card p-5 rounded-sm text-center group cursor-pointer transition-all duration-300 hover:shadow-luxury block"
            >
              <div className="w-12 h-12 bg-gradient-premium rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <Icon size={20} className="text-white" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "var(--font-serif)" }}>{title}</h4>
              <p className="text-xs text-gray-500 whitespace-pre-line leading-relaxed">{detail}</p>
            </motion.a>
          ))}
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <div className="glass-card p-8 md:p-10 rounded-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-serif)" }}>Send a Message</h3>
              <p className="text-gray-500 text-sm mb-8">Fill in the form and we'll respond within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-widest mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 border border-[#E2C2C6]/60 bg-white/70 rounded-sm focus:outline-none focus:border-[#9C528B] focus:ring-1 focus:ring-[#9C528B]/20 transition-all duration-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-widest mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-[#E2C2C6]/60 bg-white/70 rounded-sm focus:outline-none focus:border-[#9C528B] focus:ring-1 focus:ring-[#9C528B]/20 transition-all duration-300 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-widest mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    className="w-full px-4 py-3 border border-[#E2C2C6]/60 bg-white/70 rounded-sm focus:outline-none focus:border-[#9C528B] focus:ring-1 focus:ring-[#9C528B]/20 transition-all duration-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-widest mb-2">Message *</label>
                  <textarea
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help…"
                    className="w-full px-4 py-3 border border-[#E2C2C6]/60 bg-white/70 rounded-sm focus:outline-none focus:border-[#9C528B] focus:ring-1 focus:ring-[#9C528B]/20 transition-all duration-300 text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary rounded-sm flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-gradient-premium p-8 rounded-sm text-white">
              <h4 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-serif)" }}>Prefer WhatsApp?</h4>
              <p className="text-white/70 text-sm mb-6 leading-relaxed">
                Get instant responses from our boutique team. We're available Mon–Sat, 10am to 8pm.
              </p>
              <a
                href="https://wa.me/+919876543210?text=Hello Instant Boutique! I'd like to inquire about your collections."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold rounded-sm inline-flex items-center gap-2 text-sm w-full justify-center"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.8 5.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                Chat on WhatsApp
              </a>
            </div>

            <div className="glass-card p-8 rounded-sm">
              <h4 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-serif)" }}>Store Hours</h4>
              <div className="space-y-3 text-sm">
                {[
                  { day: "Monday – Friday", hours: "10:00 AM – 8:00 PM" },
                  { day: "Saturday", hours: "10:00 AM – 9:00 PM" },
                  { day: "Sunday", hours: "12:00 PM – 6:00 PM" },
                ].map(({ day, hours }) => (
                  <div key={day} className="flex justify-between items-center border-b border-[#E2C2C6]/30 pb-2">
                    <span className="text-gray-500">{day}</span>
                    <span className="text-gray-900 font-medium">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
