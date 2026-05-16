import { motion } from "framer-motion";

export default function SkeletonCard() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group flex flex-col"
    >
      <div className="relative overflow-hidden rounded-sm bg-gray-200 aspect-[3/4] mb-4 animate-pulse">
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent shimmer-animation" />
      </div>
      
      <div className="flex flex-col items-center px-2 space-y-3">
        <div className="w-1/3 h-2 bg-gray-200 rounded-full animate-pulse" />
        <div className="w-3/4 h-4 bg-gray-200 rounded-full animate-pulse" />
        <div className="w-1/4 h-4 bg-gray-200 rounded-full animate-pulse mt-2" />
      </div>
    </motion.div>
  );
}
