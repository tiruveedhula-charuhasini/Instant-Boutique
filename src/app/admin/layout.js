import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import AdminShell from "@/components/admin/AdminShell";
import SessionProviderWrapper from "@/components/admin/SessionProviderWrapper";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });

export const metadata = {
  title: "Admin Portal — Instant Boutique",
  description: "Instant Boutique admin panel",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-[#F8F4FF] dark:bg-[#0d0015] text-[#1a0030] dark:text-white transition-colors duration-300">
        <SessionProviderWrapper>
          <AdminShell>{children}</AdminShell>
        </SessionProviderWrapper>
      </body> 
    </html>
  );
}
