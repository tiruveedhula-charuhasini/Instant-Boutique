"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  Menu, Search, Bell, Sun, Moon, ChevronDown,
  LogOut, Settings, ExternalLink, X,
} from "lucide-react";

const MOCK_NOTIFICATIONS = [
  { id: 1, text: "New order #ORD-2501 placed",          time: "2m ago",  read: false },
  { id: 2, text: "Low stock: Banarasi Silk Saree",      time: "15m ago", read: false },
  { id: 3, text: "New review on Bridal Lehenga",        time: "1h ago",  read: true  },
  { id: 4, text: "Coupon SAVE20 used 10 times today",   time: "3h ago",  read: true  },
];

function useDismissOnOutsideClick(ref, onClose) {
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, onClose]);
}

export default function AdminTopbar({ setMobileOpen, darkMode, setDarkMode }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const notifRef   = useRef(null);
  const userRef    = useRef(null);
  const searchRef  = useRef(null);

  useDismissOnOutsideClick(notifRef,  () => setNotifOpen(false));
  useDismissOnOutsideClick(userRef,   () => setUserMenuOpen(false));

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Build breadcrumb
  const crumbs = pathname
    .split("/")
    .filter(Boolean)
    .map((seg, i, arr) => ({
      label: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
      href: "/" + arr.slice(0, i + 1).join("/"),
      isLast: i === arr.length - 1,
    }));

  const unread = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((n) => n.map((x) => ({ ...x, read: true })));

  const handleSignOut = () => signOut({ callbackUrl: "/admin/login" });

  return (
    <header className="sticky top-0 z-20 h-16 flex items-center px-4 lg:px-6 gap-4 bg-white/90 dark:bg-[#1a0030]/90 backdrop-blur-xl border-b border-[#E2C2C6]/30 dark:border-white/10 shadow-sm">
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden p-2 rounded-xl hover:bg-[#F5E6F5] dark:hover:bg-white/10 transition-colors text-[#610F7F] dark:text-white"
        aria-label="Open navigation"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Breadcrumb */}
      <nav className="hidden sm:flex items-center gap-1 text-sm text-[#9C528B]/60 dark:text-white/40 flex-1 min-w-0" aria-label="Breadcrumb">
        {crumbs.map((crumb) => (
          <span key={crumb.href} className="flex items-center gap-1">
            {!crumb.isLast && <span className="mr-1">/</span>}
            <Link
              href={crumb.href}
              className={`hover:text-[#610F7F] dark:hover:text-white transition-colors truncate ${
                crumb.isLast ? "text-[#2F0147] dark:text-white font-medium" : ""
              }`}
            >
              {crumb.label}
            </Link>
          </span>
        ))}
      </nav>

      {/* Right side actions */}
      <div className="flex items-center gap-1.5 ml-auto">

        {/* Search */}
        <div className="relative">
          <AnimatePresence>
            {searchOpen ? (
              <motion.div
                key="search-open"
                initial={{ width: 40, opacity: 0 }}
                animate={{ width: 240, opacity: 1 }}
                exit={{ width: 40, opacity: 0 }}
                className="flex items-center gap-2 bg-[#F5E6F5] dark:bg-white/10 rounded-xl px-3 py-2"
              >
                <Search className="w-4 h-4 text-[#9C528B] flex-shrink-0" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search anywhere..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm text-[#2F0147] dark:text-white placeholder:text-[#9C528B]/50 outline-none flex-1 min-w-0"
                />
                <button
                  onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                  className="flex-shrink-0"
                >
                  <X className="w-4 h-4 text-[#9C528B]" />
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="search-closed"
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-xl hover:bg-[#F5E6F5] dark:hover:bg-white/10 transition-colors text-[#9C528B] dark:text-white/60"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Dark mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl hover:bg-[#F5E6F5] dark:hover:bg-white/10 transition-colors text-[#9C528B] dark:text-white/60"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((o) => !o)}
            className="relative p-2 rounded-xl hover:bg-[#F5E6F5] dark:hover:bg-white/10 transition-colors text-[#9C528B] dark:text-white/60"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-[#1a0030] rounded-2xl shadow-2xl border border-[#E2C2C6]/30 dark:border-white/10 overflow-hidden z-50"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#E2C2C6]/20 dark:border-white/10">
                  <span className="font-semibold text-sm text-[#2F0147] dark:text-white">
                    Notifications
                  </span>
                  {unread > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs text-[#9C528B] hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-[#E2C2C6]/10 dark:divide-white/5">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`px-4 py-3 hover:bg-[#F5E6F5] dark:hover:bg-white/5 transition-colors ${
                        !n.read ? "bg-[#F5E6F5]/50 dark:bg-white/5" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!n.read ? "bg-[#9C528B]" : "bg-transparent"}`} />
                        <div>
                          <p className="text-sm text-[#2F0147] dark:text-white/80 leading-snug">{n.text}</p>
                          <p className="text-[11px] text-[#9C528B]/50 dark:text-white/30 mt-0.5">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Menu */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => setUserMenuOpen((o) => !o)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-[#F5E6F5] dark:hover:bg-white/10 transition-colors"
            aria-label="User menu"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#610F7F] to-[#9C528B] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {session?.user?.name?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-[#2F0147] dark:text-white leading-tight">
                {session?.user?.name ?? "Admin"}
              </p>
              <p className="text-[10px] text-[#9C528B]/60 dark:text-white/40">Administrator</p>
            </div>
            <ChevronDown className="w-4 h-4 text-[#9C528B] dark:text-white/40 hidden sm:block" />
          </button>

          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-[#1a0030] rounded-2xl shadow-2xl border border-[#E2C2C6]/30 dark:border-white/10 overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-[#E2C2C6]/20 dark:border-white/10">
                  <p className="text-sm font-semibold text-[#2F0147] dark:text-white truncate">
                    {session?.user?.name ?? "Admin"}
                  </p>
                  <p className="text-xs text-[#9C528B]/60 dark:text-white/40 truncate">
                    {session?.user?.email ?? ""}
                  </p>
                </div>
                <div className="p-2">
                  <Link
                    href="/admin/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#2F0147] dark:text-white/70 hover:bg-[#F5E6F5] dark:hover:bg-white/10 transition-colors"
                  >
                    <Settings className="w-4 h-4" /> Settings
                  </Link>
                  <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#2F0147] dark:text-white/70 hover:bg-[#F5E6F5] dark:hover:bg-white/10 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> View Store
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
