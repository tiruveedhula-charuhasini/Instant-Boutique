"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductGallery({ images, altText }) {
  const [mainImage, setMainImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Image with Hover Zoom */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-[#FCFAFA] cursor-zoom-in"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={mainImage}
          alt={altText}
          fill
          unoptimized
          className={`object-cover transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}
        />
        
        {/* Zoomed Image Overlay */}
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                backgroundImage: `url(${mainImage})`,
                backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                backgroundSize: '200%',
                backgroundRepeat: 'no-repeat'
              }}
            />
          )}
        </AnimatePresence>

        {/* Glossy Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none" />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setMainImage(img)}
              className={`relative aspect-[3/4] w-20 flex-shrink-0 rounded-sm overflow-hidden transition-all duration-300 ${
                mainImage === img 
                  ? 'border-2 border-[#9C528B] shadow-md' 
                  : 'border border-gray-200 opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`${altText} thumbnail ${idx + 1}`}
                fill
                unoptimized
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
