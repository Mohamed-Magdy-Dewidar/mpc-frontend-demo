import { useEffect, useState } from "react";
import { ProductCard } from "./components/ProductCard";
import { CreateProductModal } from "./components/CreateProductModal";
import { fetchProducts } from "./services/api";
import { type ProductResponse } from "./types";

function App() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Add Category State
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Define your categories list
  const categories = [
    "All",
    "Apparel",
    "Electronics",
    "Footwear",
    "Accessories",
    "Home & Kitchen",
  ];

  // 2. Update loadData to accept a category
  const loadData = async (category: string) => {
    setLoading(true);
    try {
      const data = await fetchProducts(category);
      setProducts(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to load products:", error.message);
      } else {
        console.error("Failed to load products");
      }
    } finally {
      setLoading(false);
    }
  };

  // 3. Re-fetch whenever selectedCategory changes
  useEffect(() => {
    loadData(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Latest Arrivals
            </h1>
            <p className="mt-2 text-lg text-gray-500">
              Check out our newest products available for purchase.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span className="text-xl leading-none">+</span> Add Product
          </button>
        </header>

        {/* 4. Add Filter Buttons */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border
                  ${
                    selectedCategory === cat
                      ? "bg-gray-900 text-white border-gray-900 shadow-md transform scale-105"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">
                  No products found in this category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}

        <CreateProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            // Reload the current category's data
            loadData(selectedCategory);
          }}
        />
      </div>
    </div>
  );
}

export default App;
