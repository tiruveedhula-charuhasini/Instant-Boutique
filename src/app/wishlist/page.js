"use client";

import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useStore();

  return (
    <div className="min-h-screen bg-white px-6 md:px-12 py-28">
      <div className="mb-12">
        <h1
          className="text-4xl md:text-5xl font-bold text-[#2F0147]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          My Wishlist
        </h1>

        <p className="text-gray-500 mt-3">
          Your saved boutique favorites.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 border border-dashed border-gray-200 rounded-xl">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Wishlist is Empty
          </h2>

          <p className="text-gray-500 mb-8 text-center max-w-md">
            Save your favorite products to view them later.
          </p>

          <Link
            href="/collections"
            className="bg-[#610F7F] text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-[#2F0147] transition-colors"
          >
            Explore Collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlist.map((product) => {
            const image = Array.isArray(product.images)
              ? product.images[0]
              : product.image;

            return (
              <div
                key={product.id}
                className="border border-gray-100 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <Link
                  href={`/collections/${product.category.toLowerCase()}/${product.id}`}
                >
                  <div className="relative aspect-[3/4] bg-[#F5EEF0] overflow-hidden">
                    <Image
                      src={image}
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </Link>

                <div className="p-5">
                  <p className="text-xs uppercase tracking-widest text-[#9C528B] mb-2">
                    {product.subcategory || product.category}
                  </p>

                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    {product.name}
                  </h2>

                  <p className="text-[#610F7F] font-bold text-lg mb-5">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className="w-full border border-red-400 text-red-500 py-3 uppercase tracking-widest text-xs hover:bg-red-500 hover:text-white transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}