"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

const PHONE = "+919876543210";

// Inline SVG social icons (brand icons not available in lucide-react)
const SocialIcons = {
  Instagram: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  Facebook: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Pinterest: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.03-2.83.19-.77 1.27-5.38 1.27-5.38s-.32-.65-.32-1.61c0-1.51.88-2.64 1.97-2.64.93 0 1.38.7 1.38 1.54 0 .94-.6 2.34-.91 3.64-.26 1.09.54 1.97 1.6 1.97 1.92 0 3.4-2.02 3.4-4.94 0-2.58-1.86-4.39-4.51-4.39-3.07 0-4.87 2.3-4.87 4.68 0 .93.36 1.92.8 2.46.09.11.1.2.07.31-.08.33-.26 1.09-.3 1.24-.05.2-.16.24-.37.14-1.39-.65-2.26-2.68-2.26-4.32 0-3.51 2.55-6.74 7.35-6.74 3.86 0 6.86 2.75 6.86 6.42 0 3.83-2.41 6.91-5.76 6.91-1.13 0-2.19-.59-2.55-1.28l-.69 2.6c-.25.97-.93 2.18-1.39 2.92.9.28 1.87.43 2.87.43 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
    </svg>
  ),
};

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | success | error

  if (pathname?.startsWith("/admin")) return null;

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <footer className="bg-gradient-to-b from-[#1a0029] to-[#2F0147] text-white pt-20 pb-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div>
            <h3
              className="text-3xl font-bold tracking-wider mb-4 text-gradient-gold"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Instant Boutique
            </h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#D4AF37] to-transparent mb-5" />
            <p className="text-white/60 mb-6 leading-relaxed text-sm">
              Premium ethnic wear crafted by master artisans across India. Where tradition meets contemporary elegance.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { Icon: SocialIcons.Instagram, href: "#", label: "Instagram" },
                { Icon: SocialIcons.Facebook, href: "#", label: "Facebook" },
                { Icon: SocialIcons.Pinterest, href: "#", label: "Pinterest" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-[#D4AF37] hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10 transition-all duration-300"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-5 text-white uppercase tracking-widest" style={{ fontFamily: "var(--font-serif)" }}>
              Quick Links
            </h4>
            <div className="w-8 h-px bg-[#D4AF37] mb-5" />
            <ul className="space-y-3">
              {[
                { label: "Collections", href: "/collections" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "FAQs", href: "/faqs" },
                { label: "Testimonials", href: "/testimonials" },
                { label: "Custom Orders", href: "/custom-orders" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/60 hover:text-[#E2C2C6] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-[#D4AF37] group-hover:w-4 transition-all duration-300" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-base font-semibold mb-5 text-white uppercase tracking-widest" style={{ fontFamily: "var(--font-serif)" }}>
              Categories
            </h4>
            <div className="w-8 h-px bg-[#D4AF37] mb-5" />
            <ul className="space-y-3">
              {["Sarees", "Kurtis", "Dresses", "Frocks", "Blouses", "Bridal"].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/collections/${cat.toLowerCase()}`}
                    className="text-white/60 hover:text-[#E2C2C6] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-[#D4AF37] group-hover:w-4 transition-all duration-300" />
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Contact */}
          <div>
            <h4 className="text-base font-semibold mb-5 text-white uppercase tracking-widest" style={{ fontFamily: "var(--font-serif)" }}>
              Stay Connected
            </h4>
            <div className="w-8 h-px bg-[#D4AF37] mb-5" />

            {/* Newsletter */}
            <p className="text-white/60 text-sm mb-4">Get exclusive offers & new arrivals in your inbox.</p>
            <form onSubmit={handleSubscribe} className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                  placeholder="Your email address"
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#D4AF37] text-[#2F0147] px-4 py-3 text-sm font-bold hover:bg-[#F3E5AB] transition-colors flex-shrink-0"
                >
                  →
                </button>
              </div>
              {status === "success" && (
                <p className="text-[#D4AF37] text-xs mt-2 flex items-center gap-1">✓ Subscribed! Welcome to the club.</p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-xs mt-2">Please enter a valid email address.</p>
              )}
            </form>

            {/* Contact info */}
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-white/60">
                <Phone size={14} className="text-[#E2C2C6] flex-shrink-0" />
                <a href={`tel:${PHONE}`} className="hover:text-[#E2C2C6] transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <Mail size={14} className="text-[#E2C2C6] flex-shrink-0" />
                <a href="mailto:hello@instantboutique.com" className="hover:text-[#E2C2C6] transition-colors">hello@instantboutique.com</a>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <MapPin size={14} className="text-[#E2C2C6] flex-shrink-0 mt-1" />
                <span>123 Heritage Lane, Mumbai, MH 400001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs">
          <p>© {new Date().getFullYear()} Instant Boutique. All rights reserved. Made with ♥ in India.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#E2C2C6] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#E2C2C6] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
