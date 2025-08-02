import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Headphones, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const { state, loadProducts } = useApp();
  const featuredProducts = state.products.slice(0, 4);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Build Your Dream PC
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Premium computer parts and components at unbeatable prices. 
              From processors to graphics cards, we have everything you need.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Genuine Products</h3>
              <p className="text-gray-600">
              100% original and brand-new components 
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Warranty Protection</h3>
              <p className="text-gray-600">Comprehensive warranty on all products</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Expert technical support when you need it</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600">Discover our most popular computer components</p>
            {state.loading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Loading products...</p>
              </div>
            )}
            {state.error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {state.error}
              </div>
            )}
          </div>
          
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600">Find exactly what you need for your build</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Processors', image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=300' },
              { name: 'Graphics Cards', image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=300' },
              { name: 'Memory', image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=300' },
              { name: 'Storage', image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=300' },
              { name: 'Motherboards', image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=300' },
              { name: 'Refurbished Laptop', image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=300' }
            ].map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-200 py-12 mt-12 relative">
        <div
        onClick={()=>navigate('/admin')}
         className='w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center mx-auto  absolute right-4 bottom-3'>
          
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">Sawariya</h3>
          <p className="text-gray-400 mb-2">
            Your one-stop shop for premium computer parts and components.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul>
            <li>
          <span className="hover:underline">Home</span>
            </li>
            <li>
          <span className="hover:underline">Products</span>
            </li>
            <li>
          <span className="hover:underline">Cart</span>
            </li>
            <li>
          <span className="hover:underline">Contact</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Categories</h4>
          <ul>
            <li>
          <Link to="/products?category=Processors" className="hover:underline">Processors</Link>
            </li>
            <li>
          <Link to="/products?category=Graphics%20Cards" className="hover:underline">Graphics Cards</Link>
            </li>
            <li>
          <span className="hover:underline">Memory</span>
            </li>
            <li>
          <span className="hover:underline">Storage</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact Us</h4>
          <p className="text-gray-400">Email: Patelganesh8959@gmail.com</p>
          <p className="text-gray-400">Phone: +91 9340998315</p>
          <p className="text-gray-400 mt-2">Mon - Sat: 10am - 7pm</p>
        </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Sawariya. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}