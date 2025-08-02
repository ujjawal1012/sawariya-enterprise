import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Grid, List } from "lucide-react";
import { useApp } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const { state, loadProducts } = useApp();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name");
  const [filterCategory, setFilterCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });

  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";
  console.log("🚀 ~ ProductsPage ~ categoryQuery:", categoryQuery)

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = state.products;
    console.log("🚀 ~ filteredProducts ~ filtered:", filtered)

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    const activeCategory = (filterCategory || categoryQuery || "").toLowerCase();

    console.log("🚀 ~ filteredProducts ~ activeCategory:", activeCategory)
    
    if (activeCategory && activeCategory.toLowerCase() !== "all") {
      
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === activeCategory
      );
    }
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name?.localeCompare(b.name);
      }
    });

    return filtered;
  }, [
    state.products,
    searchQuery,
    categoryQuery,
    filterCategory,
    priceRange,
    sortBy,
  ]);
  console.log("🚀 ~ filteredProducts ~ filteredProducts:", filteredProducts)

  const categories = [
    ...new Set(state.products.map((product) => product.category)),
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : categoryQuery && categoryQuery.toLowerCase() !== "all"
              ? categoryQuery
              : "All Products"}
          </h1>
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {state.products.length}{" "}
            products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}

          {/* Products Grid */}
          <div className="w-full">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No products found matching your criteria.
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
