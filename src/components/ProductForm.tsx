import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { apiService } from "../services/api";
import { Product } from "../types";

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
}

export default function ProductForm({ product, onClose }: ProductFormProps) {
  console.log("🚀 ~ ProductForm ~ product:", product);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    originalPrice: "",
    image: "",
    description: "",
    brand: "",
    inStock: true,
    specifications: {} as Record<string, string>,
  });
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  console.log("🚀 ~ ProductForm ~ additionalImages:", additionalImages);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || "",
        image: product.image,
        description: product.description,
        brand: product.brand,
        inStock: true,
        specifications: product.specifications,
      });
      setAdditionalImages(product?.additionalImages); // Reset to empty, since product.additionalImages is string[] not File[]
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("price", formData.price);
      if (formData.originalPrice) {
        formDataToSend.append("originalPrice", formData.originalPrice);
      }
      formDataToSend.append("description", formData.description);
      formDataToSend.append("brand", formData.brand);
      formDataToSend.append("inStock", formData.inStock.toString());

      // ✅ Only add specifications if not empty
      const hasSpecifications = formData.specifications
        ? Object.keys(formData.specifications).length > 0
        : false;
      if (hasSpecifications) {
        formDataToSend.append(
          "specifications",
          JSON.stringify(formData.specifications)
        );
      } else {
        formDataToSend.append("specifications", JSON.stringify({}));
      }

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      // ✅ Append additional images
      additionalImages.forEach((file, index) => {
        formDataToSend.append("additionalImages", file); // use same name to create an array at backend
      });

      if (product) {
        await apiService.updateProduct(product._id, formDataToSend);
      } else {
        await apiService.createProduct(formDataToSend);
      }

      onClose();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to save product"
      );
    } finally {
      setLoading(false);
    }
  };

  const addSpecification = () => {
    if (specKey && specValue) {
      setFormData((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specKey]: specValue,
        },
      }));
      setSpecKey("");
      setSpecValue("");
    }
  };

  const removeSpecification = (key: string) => {
    setFormData((prev) => ({
      ...prev,
      specifications: Object.fromEntries(
        Object.entries(prev.specifications).filter(([k]) => k !== key)
      ),
    }));
  };

  if (loading && product) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand *
              </label>
              <input
                type="text"
                required
                value={formData.brand}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, brand: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                <option value="other">Other</option>
                <option value="Processors">Processors</option>
                <option value="Graphics Cards">Graphics Cards</option>
                <option value="Memory">Memory</option>
                <option value="Storage">Storage</option>
                <option value="Motherboards">Motherboards</option>
                <option value="Refurbished Laptop">Refurbished Laptop</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, price: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price (₹)
              </label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    originalPrice: e.target.value,
                  }))
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {formData.image && !imageFile && (
                <div className="mt-2">
                  <img
                    src={formData.image}
                    alt="Current"
                    className="w-20 h-20 object-cover rounded"
                  />
                  <p className="text-sm text-gray-500">Current image</p>
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Images
            </label>
            <input
              type="file"
              accept="image/*"
              max={5}
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  setAdditionalImages(Array.from(e.target.files));
                }
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            {additionalImages.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {additionalImages.map((file, index) => (
                  <div key={index} className="w-20 h-20 relative">
                    <img
                      src={
                        file instanceof File ? URL.createObjectURL(file) : file
                      }
                      alt={`Preview ${index}`}
                      className="object-cover rounded w-full h-full"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Specifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specifications
            </label>

            {formData.specifications && (
              <div className="space-y-2 mb-4">
                {Object.entries(formData.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center space-x-2 bg-gray-50 p-2 rounded"
                  >
                    <span className="font-medium">{key}:</span>
                    <span>{value}</span>
                    <button
                      type="button"
                      onClick={() => removeSpecification(key)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-4 flex-wrap">
              <input
                type="text"
                value={specKey}
                onChange={(e) => setSpecKey(e.target.value)}
                placeholder="Specification name"
                className="flex-1 border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                value={specValue}
                onChange={(e) => setSpecValue(e.target.value)}
                placeholder="Value"
                className="flex-1 border border-gray-300 rounded px-3 py-2"
              />
              <button
                type="button"
                onClick={addSpecification}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              {loading
                ? "Saving..."
                : product
                ? "Update Product"
                : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
