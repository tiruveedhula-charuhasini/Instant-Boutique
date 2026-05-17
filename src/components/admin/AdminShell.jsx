"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import { AdminToastProvider } from "./AdminToast";

export default function AdminShell({ children }) {
  const [collapsed, setCollapsed]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";



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
          />

          <main
            id="admin-main-content"
            className="flex-1 overflow-y-auto p-4 lg:p-6 bg-[#F8F4FF] transition-colors duration-300"
          >
            {children}
          </main>
        </div>
      </div>
    </AdminToastProvider>
  );
}
