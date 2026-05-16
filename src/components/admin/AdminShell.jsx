"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import { AdminToastProvider } from "./AdminToast";

export default function AdminShell({ children }) {
  const [collapsed, setCollapsed]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode]     = useState(false);
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  // ── Restore dark mode from localStorage on mount ──────────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem("admin_dark_mode");
      const isDark = saved === "true";
      setDarkMode(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    } catch {
      // localStorage unavailable (SSR guard)
    }
  }, []);

  // ── Persist dark mode changes ─────────────────────────────────────────────
  const handleDarkMode = (val) => {
    setDarkMode(val);
    try {
      localStorage.setItem("admin_dark_mode", String(val));
    } catch {}
    document.documentElement.classList.toggle("dark", val);
  };

  // ── Close mobile sidebar on route change ─────────────────────────────────
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (isLoginPage) return <AdminToastProvider>{children}</AdminToastProvider>;

  return (
    <AdminToastProvider>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <AdminTopbar
            setMobileOpen={setMobileOpen}
            darkMode={darkMode}
            setDarkMode={handleDarkMode}
          />

          <main
            id="admin-main-content"
            className="flex-1 overflow-y-auto p-4 lg:p-6 bg-[#F8F4FF] dark:bg-[#0d0015] transition-colors duration-300"
          >
            {children}
          </main>
        </div>
      </div>
    </AdminToastProvider>
  );
}
