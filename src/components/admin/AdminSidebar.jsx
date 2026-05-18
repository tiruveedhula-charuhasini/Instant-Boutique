"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Package, ShoppingBag, Users, BarChart3,
  FileImage, Star, Tag, Settings, ChevronRight, ChevronLeft,
  Crown, Sparkles, TrendingUp, X,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin",            icon: LayoutDashboard, exact: true },
  { label: "Products",  href: "/admin/products",   icon: Package },
  { label: "Orders",    href: "/admin/orders",     icon: ShoppingBag, badge: "5", badgeColor: "bg-amber-500" },
  { label: "Customers", href: "/admin/customers",  icon: Users },
  { label: "Analytics", href: "/admin/analytics",  icon: BarChart3 },
  { label: "Reviews",   href: "/admin/reviews",    icon: Star },
  { label: "Offers",    href: "/admin/offers",     icon: Tag },
  { label: "Settings",  href: "/admin/settings",   icon: Settings },
];

// ─── Extracted to module scope (NOT inside component) ────────────────────────
function NavItem({ item, active, collapsed, onClose }) {
  const Icon = item.icon;
  return (
    <Link href={item.href} onClick={onClose}>
      <motion.div
        whileHover={{ x: collapsed ? 0 : 4 }}
        className={`
          relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200
          ${active
            ? "bg-gradient-to-r from-[#D4AF37]/20 to-[#9C528B]/20 border border-[#D4AF37]/30 text-[#D4AF37]"
            : "text-white/60 hover:bg-white/10 hover:text-white"
          }
        `}
      >
        {active && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#D4AF37] rounded-r-full"
          />
        )}
        <Icon className={`w-5 h-5 flex-shrink-0 ${active ? "text-[#D4AF37]" : ""}`} />
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm font-medium whitespace-nowrap flex-1"
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>
        {!collapsed && item.badge && (
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white ${item.badgeColor ?? "bg-[#9C528B]"}`}>
            {item.badge}
          </span>
        )}
      </motion.div>
    </Link>
  );
}

function SidebarInner({ collapsed, setCollapsed, isMobile, onClose, pathname }) {
  const isActive = (item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <div className="flex flex-col h-full">
      {/* Logo / Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-3 min-w-0" onClick={onClose}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#9C528B] flex items-center justify-center flex-shrink-0 shadow-lg">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <p className="font-serif text-white font-bold text-sm leading-tight whitespace-nowrap">
                  Instant Boutique
                </p>
                <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest whitespace-nowrap">
                  Admin Panel
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>

        {/* Desktop collapse / Mobile close */}
        {isMobile ? (
          <button
            onClick={onClose}
            className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex-shrink-0"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            active={isActive(item)}
            collapsed={collapsed}
            onClose={onClose}
          />
        ))}
      </nav>

      {/* Pro Tip Card */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="m-3 p-3 rounded-xl bg-gradient-to-br from-[#D4AF37]/10 to-[#9C528B]/10 border border-[#D4AF37]/20"
          >
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-semibold text-[#D4AF37]">Pro Tip</span>
            </div>
            <p className="text-[11px] text-white/50 leading-relaxed">
              Press <kbd className="px-1 py-0.5 bg-white/10 rounded text-[10px]">Cmd+K</kbd> to quickly jump anywhere.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Live Site */}
      <div className="p-3 border-t border-white/10">
        <Link
          href="/"
          target="_blank"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors ${collapsed ? "justify-center" : ""}`}
        >
          <TrendingUp className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span className="text-xs">View Live Site</span>}
        </Link>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function AdminSidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const pathname = usePathname();
  const handleClose = () => setMobileOpen(false);

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden lg:flex flex-col h-screen sticky top-0 bg-gradient-to-b from-[#2F0147] via-[#3d0160] to-[#2F0147] border-r border-white/10 flex-shrink-0 overflow-hidden z-30"
      >
        <SidebarInner
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isMobile={false}
          onClose={handleClose}
          pathname={pathname}
        />
      </motion.aside>

      {/* ── Mobile Overlay + Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              key="drawer"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-[#2F0147] via-[#3d0160] to-[#2F0147] border-r border-white/10 z-50 lg:hidden"
            >
              <SidebarInner
                collapsed={false}
                setCollapsed={setCollapsed}
                isMobile={true}
                onClose={handleClose}
                pathname={pathname}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
