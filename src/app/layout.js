import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/layout/Footer";
import { StoreProvider } from "@/context/StoreContext";
import { ToastProvider } from "@/context/ToastContext";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import ScrollToTop from "@/components/shared/ScrollToTop";
import ScrollProgress from "@/components/shared/ScrollProgress";
import QuickViewModal from "@/components/products/QuickViewModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "Instant Boutique | Premium Ethnic Wear",
  description: "Traditional elegance mixed with modern minimalism. Premium handcrafted fashion brand.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#F8F4FF] text-[#1a0030]">
        <StoreProvider>
          <ToastProvider>
            <ScrollProgress />
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <WhatsAppButton />
            <ScrollToTop />
            <QuickViewModal />
          </ToastProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
