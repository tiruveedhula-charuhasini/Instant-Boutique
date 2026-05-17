"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Search, Heart, ShoppingBag, ChevronDown, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { wishlist, cartCount, user, logoutUser } = useStore();
  const router = useRouter();

  if (pathname?.startsWith("/admin")) return null;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const iconColor = isScrolled ? "text-gray-700" : "text-white";

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Collections",
      href: "/collections",
      dropdown: [
        { name: "All Collections", href: "/collections" },
        { name: "Sarees",  href: "/collections/sarees" },
        { name: "Kurtis",  href: "/collections/kurtis" },
        { name: "Dresses", href: "/collections/dresses" },
        { name: "Blouses", href: "/collections/blouses" },
        { name: "Bridal",  href: "/collections/bridal" },
      ],
    },
    { name: "About",   href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-b border-white/20 py-4"
          : "bg-gradient-to-b from-black/50 to-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="relative group flex items-center">
          <span
            className={`text-2xl md:text-3xl font-bold tracking-wider transition-colors duration-300 ${
              isScrolled ? "text-[#2F0147]" : "text-white"
            }`}
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Instant Boutique
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-premium transition-all duration-500 group-hover:w-full" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative"
              onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
              onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className={`flex items-center text-sm uppercase tracking-[0.15em] font-medium transition-colors hover:text-[#9C528B] relative group ${
                  isScrolled ? "text-gray-800" : "text-white/90"
                } ${pathname === link.href ? "text-[#9C528B]" : ""}`}
              >
                {link.name}
                {link.dropdown && <ChevronDown size={14} className="ml-1" />}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#9C528B] transition-all duration-300 group-hover:w-full" />
              </Link>

              <AnimatePresence>
                {link.dropdown && activeDropdown === link.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full -left-4 pt-6"
                  >
                    <div className="bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl rounded-sm p-4 w-56 flex flex-col space-y-2">
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="px-4 py-2 text-sm text-gray-700 hover:text-[#9C528B] hover:bg-[#FCFAFA] rounded-sm transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Desktop Icons */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className={`transition-colors hover:text-[#9C528B] ${iconColor}`}
            aria-label="Open search"
          >
            <Search size={20} />
          </button>

          {/* User */}
          {user ? (
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium ${isScrolled ? "text-gray-700" : "text-white/80"}`}>
                {user.name?.split(" ")[0]}
              </span>
              <button
                onClick={() => { logoutUser(); router.push("/"); }}
                title="Sign Out"
                className={`transition-colors hover:text-red-500 ${iconColor}`}
              >
                <LogOut size={17} />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className={`transition-colors hover:text-[#9C528B] ${iconColor}`}
              aria-label="Sign in"
            >
              <User size={20} />
            </Link>
          )}

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className={`transition-colors hover:text-[#9C528B] relative ${iconColor}`}
            aria-label="Wishlist"
          >
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-premium text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full shadow-md">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className={`transition-colors hover:text-[#9C528B] relative ${iconColor}`}
            aria-label="Shopping cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#2F0147] text-[10px] w-4 h-4 flex items-center justify-center rounded-full shadow-md font-bold"
              >
                {cartCount > 9 ? "9+" : cartCount}
              </motion.span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`lg:hidden transition-colors ${isScrolled ? "text-gray-800" : "text-white"}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-2xl border-t border-gray-100 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col px-6 py-8 space-y-6">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col border-b border-gray-100 pb-4">
                  <Link
                    href={link.href}
                    className="text-gray-900 uppercase tracking-widest text-sm font-medium"
                    onClick={() => !link.dropdown && setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="mt-4 pl-4 flex flex-col space-y-4 border-l-2 border-[#E2C2C6]/30">
                      {link.dropdown.slice(1).map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="text-gray-600 text-sm hover:text-[#9C528B]"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile icon row */}
              <div className="flex space-x-6 pt-4 justify-center">
                <button
                  onClick={() => { setIsMobileMenuOpen(false); setIsSearchOpen(true); }}
                  className="text-gray-700 hover:text-[#9C528B] p-2 bg-[#FCFAFA] rounded-full shadow-sm"
                  aria-label="Search"
                >
                  <Search size={22} />
                </button>
                <Link
                  href="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-[#9C528B] p-2 bg-[#FCFAFA] rounded-full shadow-sm relative"
                  aria-label="Wishlist"
                >
                  <Heart size={22} />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-premium text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-[#9C528B] p-2 bg-[#FCFAFA] rounded-full shadow-sm relative"
                  aria-label="Cart"
                >
                  <ShoppingBag size={22} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#2F0147] text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                      {cartCount > 9 ? "9+" : cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </motion.header>
  );
}
