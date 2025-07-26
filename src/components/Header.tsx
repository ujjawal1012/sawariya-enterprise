import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Settings, LogOut, Monitor, Menu, X, Phone, Mail } from 'lucide-react';
import { apiService } from '../services/api';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { state, dispatch, loginUser } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowMobileSearch(false);
      setShowMobileMenu(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(loginForm.email, loginForm.password);
      setShowLoginModal(false);
      setShowUserMenu(false);
      setLoginForm({ email: '', password: '' });
    } catch (error) {
      // Error is handled in the context
    }
  };

  const handleLogout = () => {
    apiService.logout();
    dispatch({ type: 'LOGOUT' });
    setShowUserMenu(false);
    navigate('/');
  };

  const toggleAdminMode = () => {
    dispatch({ type: 'TOGGLE_ADMIN_MODE' });
    setShowUserMenu(false);
    navigate(state.isAdminMode ? '/' : '/admin');
  };

  const categories = [
    { name: 'All', path: '/products?category=all' },
    { name: 'Processors', path: '/products?category=Processors' },
    { name: 'Graphics Cards', path: '/products?category=Graphics Cards' },
    { name: 'Memory', path: '/products?category=Memory' },
    { name: 'Storage', path: '/products?category=Storage' },
    { name: 'Motherboards', path: '/products?category=Motherboards' },
    { name: 'Power Supplies', path: '/products?category=Power Supplies' }
  ];

  const handleCategoryClick = () => {
    setShowMobileMenu(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Monitor className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <div className="hidden sm:block">
              <span className="text-lg sm:text-xl font-bold text-gray-900">Sawariya</span>
              <span className="text-xs sm:text-sm text-gray-600 block -mt-1">Enterprises</span>
            </div>
            <div className="sm:hidden">
              <span className="text-lg font-bold text-gray-900">Sawariya</span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for computer parts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </form>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Search Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              <Search className="h-6 w-6" />
            </button>

            {/* Contact Info - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-4 text-sm">
              <a href="tel:+919876543210" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                <Phone className="h-4 w-4" />
                <span>+91 93409 98315</span>
              </a>
              <a href="mailto:Patelganesh8959@gmail.com" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                <Mail className="h-4 w-4" />
                <span>Patelganesh8959@gmail.com</span>
              </a>
            </div>

            {/* User Menu */}
            {(window.location.pathname.startsWith('/admin') || state.user) && (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <User className="h-6 w-6" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    {!state.user ? (
                      <button
                        onClick={() => setShowLoginModal(true)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Admin Login
                      </button>
                    ) : (
                      <>
                        <div className="px-4 py-2 text-sm text-gray-500">
                          {state.user.email}
                        </div>
                        <button
                          onClick={toggleAdminMode}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          {state.isAdminMode ? 'Customer View' : 'Admin Panel'}
                        </button>
                        <button
                          onClick={handleLogout}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for computer parts..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden md:block border-t border-gray-200">
          <div className="flex space-x-8 py-3 overflow-x-auto">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium whitespace-nowrap"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            {/* Categories */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.path}
                    onClick={handleCategoryClick}
                    className="block py-2 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Contact Us</h3>
              <div className="space-y-2">
                <a 
                  href="tel:+919876543210" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  <Phone className="h-4 w-4" />
                  <span>+91 93409 98315</span>
                </a>
                <a 
                  href="mailto:Patelganesh8959@gmail.com" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  <Mail className="h-4 w-4" />
                  <span>Patelganesh8959@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
            {state.error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {state.error}
              </div>
            )}
            <form onSubmit={handleAdminLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowLoginModal(false);
                    setLoginForm({ email: '', password: '' });
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={state.loading}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {state.loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}