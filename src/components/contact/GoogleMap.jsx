"use client";

import { useState } from "react";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GoogleMap({ location = "123 Heritage Lane, Fashion District, Mumbai, MH 400001, India" }) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  // Encode the location for URLs
  const encodedLocation = encodeURIComponent(location);
  
  // Map URLs
  const embedUrl = mapApiKey 
    ? `https://www.google.com/maps/embed/v1/place?key=${mapApiKey}&q=${encodedLocation}`
    : `https://www.google.com/maps?q=${encodedLocation}&output=embed`;
    
  const externalMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`;

  return (
    <div className="w-full h-full relative group rounded-sm overflow-hidden bg-[#F5EEF0]">
      {/* Loading Skeleton */}
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#F5EEF0] animate-pulse">
          <div className="flex flex-col items-center text-[#9C528B]/50">
            <MapPin size={40} className="mb-2" />
            <span className="text-sm uppercase tracking-widest font-semibold">Loading Map...</span>
          </div>
        </div>
      )}

      {/* Embedded Map */}
      <iframe
        title="Boutique Location"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={embedUrl}
        onLoad={() => setIsMapLoaded(true)}
        className={`w-full h-full transition-opacity duration-700 ${isMapLoaded ? "opacity-100" : "opacity-0"}`}
      />

      {/* Hover Overlay with Action Buttons */}
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#D4AF37] text-[#2F0147] px-6 py-3 rounded-full font-semibold uppercase tracking-widest text-xs hover:bg-white hover:text-[#610F7F] transition-colors shadow-lg transform hover:scale-105"
          >
            <Navigation size={16} />
            Get Directions
          </a>
          
          <a
            href={externalMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-[#610F7F] px-6 py-3 rounded-full font-semibold uppercase tracking-widest text-xs hover:bg-[#F5EEF0] transition-colors shadow-lg transform hover:scale-105"
          >
            <ExternalLink size={16} />
            Open in Maps
          </a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
