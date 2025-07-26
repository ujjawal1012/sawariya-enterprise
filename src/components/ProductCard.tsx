import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useApp();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group">
      <Link to={`/product/${product._id}`}>
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 max-w-sm">
          
          {/* Image Section - Compact */}
          <div className="relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-contain group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {discountPercentage > 0 && (
              <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
                -{discountPercentage}%
              </div>
            )}
            
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-semibold text-gray-900">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
          
          {/* Content Section - Compact */}
          <div className="p-4">
            
            {/* Brand & Title */}
            <div className="mb-3">
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                {product.brand}
              </span>
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mt-1.5 leading-tight group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
            </div>
            
            {/* Price Section - Compact */}
            <div className="mb-3">
              <div className="flex items-baseline space-x-2">
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {discountPercentage > 0 && (
                <p className="text-xs text-green-600 font-medium mt-0.5">
                  Save {formatPrice(Number(product.originalPrice) - product.price)}
                </p>
              )}
            </div>
            {/* Contact Section - Compact & Beautiful */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-3 border border-gray-100">
              <div className="flex items-center justify-between">
                <a 
                  href="tel:+919340998315" 
                  className="flex items-center space-x-1.5 text-gray-700 hover:text-blue-600 transition-colors group/phone"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-1.5 bg-white rounded-lg shadow-sm group-hover/phone:shadow-md group-hover/phone:scale-105 transition-all duration-200">
                    <Phone className="h-3 w-3 text-green-600" />
                  </div>
                  <div>
                    <span className="text-xs font-medium block">Call</span>
                    <span className="text-xs text-gray-500">93409 98315</span>
                  </div>
                </a>
                
                <div className="w-px h-8 bg-gray-200"></div>
                
                <a 
                  href="mailto:Patelganesh8959@gmail.com" 
                  className="flex items-center space-x-1.5 text-gray-700 hover:text-blue-600 transition-colors group/email"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-1.5 bg-white rounded-lg shadow-sm group-hover/email:shadow-md group-hover/email:scale-105 transition-all duration-200">
                    <Mail className="h-3 w-3 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-xs font-medium block">Email</span>
                    <span className="text-xs text-gray-500">Patelganesh8959@gmail.com</span>
                  </div>
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </Link>
    </div>
  );
}