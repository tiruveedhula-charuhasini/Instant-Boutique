import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Custom & Bridal Orders | Instant Boutique",
  description: "Book a consultation for custom ethnic wear and bridal outfits.",
};

export default function CustomOrdersPage() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <SectionHeading 
          title="Bridal & Custom Orders" 
          subtitle="Tailored to perfection for your special day"
        />
        
        <div className="text-center mb-12">
          <p className="text-gray-600 text-lg leading-relaxed">
            Every bride deserves a masterpiece. Our custom design service allows you to work 
            directly with our designers to create an outfit that reflects your unique style and heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="/images/bridal_image_1778907169512.png" 
              alt="Bridal Wear" 
              className="rounded-sm shadow-lg w-full"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900" style={{ fontFamily: "var(--font-serif)" }}>The Process</h3>
            <ul className="space-y-6">
              <li>
                <h4 className="font-semibold text-lg text-[#610F7F]">1. Consultation</h4>
                <p className="text-gray-600">Discuss your vision, preferences, and timeline with our expert stylists.</p>
              </li>
              <li>
                <h4 className="font-semibold text-lg text-[#610F7F]">2. Design & Fabric</h4>
                <p className="text-gray-600">Select from our premium range of fabrics and review initial sketches.</p>
              </li>
              <li>
                <h4 className="font-semibold text-lg text-[#610F7F]">3. Fittings</h4>
                <p className="text-gray-600">Multiple trial sessions to ensure the perfect fit and fall.</p>
              </li>
              <li>
                <h4 className="font-semibold text-lg text-[#610F7F]">4. Final Delivery</h4>
                <p className="text-gray-600">Receive your custom handcrafted outfit ready for the occasion.</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-[#FCFAFA] p-8 md:p-12 text-center rounded-sm border border-[#E2C2C6]/50">
          <h3 className="text-2xl font-bold mb-4 text-gray-900" style={{ fontFamily: "var(--font-serif)" }}>Book an Appointment</h3>
          <p className="text-gray-600 mb-8">Consultations are available in-store and virtually.</p>
          <a href="/contact" className="inline-block bg-[#9C528B] text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-[#2F0147] transition-colors">
            Schedule Now
          </a>
        </div>
      </div>
    </div>
  );
}
