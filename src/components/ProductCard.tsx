import { useState } from "react";
import { type Product } from "../types";

interface ProductCardProps {
  product: Product;
}

// 👇 HELPER FUNCTION: Fixes the Mixed Content Error
const getSecureImageUrl = (url: string) => {
  if (!url) return "https://placehold.co/400x400?text=No+Image"; // Better placeholder

  // If the URL is raw http from EC2, route it through our secure Vercel proxy (/api)
  if (url.includes("http://3.124.216.226:3000")) {
    return url.replace("http://3.124.216.226:3000", "/api");
  }
  
  return url;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  // State for the selected variant
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants[0] || ""
  );

  const handleAddToCart = () => {
    alert(`Added ${product.name} (${selectedVariant}) to cart!`);
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          // 👇 UPDATED: Uses the secure helper function
          src={getSecureImageUrl(product.imageUrl)}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          // Add error handling to fall back to placeholder if image fails
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/400x400?text=Error";
          }}
        />
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            OUT OF STOCK
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
            {product.category}
          </p>
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-4 line-clamp-2">
          {product.name}
        </h3>

        {/* Spacer to push bottom content down */}
        <div className="flex-grow"></div>

        {/* Controls */}
        <div className="space-y-3 mt-4">
          {/* Variant Selector */}
          {product.variants.length > 0 ? (
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Select Variant
              </label>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                disabled={!product.inStock}
                className="w-full p-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              >
                {product.variants.map((variant) => (
                  <option key={variant} value={variant}>
                    {variant}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="h-[58px]"></div> // Placeholder to keep card height consistent
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-2.5 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2
              ${
                product.inStock
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
          >
            {product.inStock ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Add to Cart
              </>
            ) : (
              "Out of Stock"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};