import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Phone, Mail, Share2, ArrowLeft, MessageCircle } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useApp();

  const product = state.products.find((p) => p._id === id);
  const allImages = product
    ? [product.image, ...(product.additionalImages || [])]
    : [];
  const [selectedImage, setSelectedImage] = useState(allImages[0]);
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h2>
          <button
            onClick={() => navigate("/products")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-96 object-contain rounded-xl shadow-lg transition duration-300"
              />
              {discountPercentage > 0 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                  -{discountPercentage}% OFF
                </div>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-xl">
                  <span className="bg-white/90 px-6 py-3 rounded-full text-lg font-semibold text-gray-900">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>
            <div className="flex space-x-3 overflow-x-auto pt-1">
              {allImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setSelectedImage(img)}
                  className={`h-20 w-20 object-cover rounded-lg cursor-pointer border-2 ${
                    selectedImage === img
                      ? "border-blue-500"
                      : "border-transparent"
                  } hover:opacity-80 transition`}
                  alt={`Thumbnail ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold mb-3 border border-blue-100">
                {product.brand}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline space-x-4 mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {discountPercentage > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                  <p className="text-green-800 font-semibold">
                    🎉 You save{" "}
                    {formatPrice(Number(product.originalPrice) - product.price)}{" "}
                    with this offer!
                  </p>
                </div>
              )}

              <p className="text-gray-600 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            {product.specifications && (
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  Specifications
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-3 border-b border-gray-100 last:border-0"
                      >
                        <span className="font-semibold text-gray-700">
                          {key}:
                        </span>
                        <span className="text-gray-600 font-medium">
                          {value}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Contact Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 shadow-md">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Interested in this product?
                </h3>
                <p className="text-gray-600">
                  Contact us for pricing, availability, and custom requirements
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group"
                >
                  <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Call Now</div>
                    <div className="text-sm text-gray-600">+91 93409 98315</div>
                  </div>
                </a>

                <a
                  href="mailto:Patelganesh8959@gmail.com?subject=Product%20Inquiry%20-%20{product.name}"
                  className="flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group"
                >
                  <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Email Us</div>
                    <div className="text-sm text-gray-600">
                      Patelganesh8959@gmail.com
                    </div>
                  </div>
                </a>
              </div>

              <div className="flex items-center justify-center space-x-4 pt-4 border-t border-blue-200">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    WhatsApp: +91 93409 98315
                  </span>
                </button>
                <div className="w-px h-4 bg-gray-300"></div>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Share Product</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {state.products
              .filter(
                (p) => p.category === product.category && p._id !== product._id
              )
              .slice(0, 4)
              .map((relatedProduct) => (
                <div
                  key={relatedProduct._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100"
                  onClick={() => navigate(`/product/${relatedProduct._id}`)}
                >
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <div className="text-xs text-blue-600 font-medium mb-1">
                      {relatedProduct.brand}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm leading-tight">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-lg font-bold text-gray-900">
                      {formatPrice(relatedProduct.price)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
