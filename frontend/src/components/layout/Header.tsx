import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User, Globe, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
 
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600 mr-2">
              <span className={isScrolled ? 'text-[#C0392B]' : 'text-[#F7B955]'}>Chance</span>
              <span className={isScrolled ? 'text-[#1A5276]' : 'text-white'}>Baaba</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/products" className={`font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:text-[#C0392B]' : 'text-white hover:text-[#F7B955]'}`}>
              All Categories
            </Link>
            <Link to="/products?category=Electronics" className={`font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:text-[#C0392B]' : 'text-white hover:text-[#F7B955]'}`}>
              Electronics
            </Link>
            <Link to="/products?category=Fashion" className={`font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:text-[#C0392B]' : 'text-white hover:text-[#F7B955]'}`}>
              Fashion
            </Link>
            <Link to="/products?category=Home" className={`font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:text-[#C0392B]' : 'text-white hover:text-[#F7B955]'}`}>
              Home & Garden
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={toggleSearch}
              className={`p-2 rounded-full transition-colors ${isScrolled ? 'text-gray-700 hover:text-[#C0392B]' : 'text-white hover:text-[#F7B955]'}`}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <Link to="/favorites" className={`p-2 rounded-full transition-colors ${isScrolled ? 'text-gray-700 hover:text-[#C0392B]' : 'text-white hover:text-[#F7B955]'}`}>
              <Heart size={20} />
            </Link>
            
            <Link to="/cart" className="relative p-2">
              <ShoppingCart size={20} className={`transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
              {cart.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C0392B] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center">
                  <img
                    src={user?.avatar || 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2'}
                    alt={user?.name || 'User'}
                    className="w-8 h-8 rounded-full border-2 border-[#F7B955]"
                  />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-700">Signed in as</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Account
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className={`font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:text-[#C0392B]' : 'text-white hover:text-[#F7B955]'}`}
              >
                Login
              </Link>
            )}
            
            <Link 
              to="#" 
              className="flex items-center text-sm font-medium"
            >
              <Globe size={16} className={`mr-1 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
              <span className={isScrolled ? 'text-gray-700' : 'text-white'}>EN</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative p-2 mr-2">
              <ShoppingCart size={20} className={isScrolled ? 'text-gray-700' : 'text-white'} />
              {cart.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C0392B] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.totalItems}
                </span>
              )}
            </Link>
            
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-md ${isScrolled ? 'text-gray-700' : 'text-white'}`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4 animate-fadeDown">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="search"
              placeholder="Search products..."
              className="flex-1 py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#F7B955]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button
              type="submit"
              className="bg-[#F7B955] text-white p-2 rounded-r-md hover:bg-[#f0a93e] transition-colors"
            >
              <Search size={20} />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 animate-fadeDown">
          <nav className="flex flex-col py-4">
            <Link
              to="/products"
              className="px-4 py-3 hover:bg-gray-100 text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              All Categories
            </Link>
            <Link
              to="/products?category=Electronics"
              className="px-4 py-3 hover:bg-gray-100 text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Electronics
            </Link>
            <Link
              to="/products?category=Fashion"
              className="px-4 py-3 hover:bg-gray-100 text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Fashion
            </Link>
            <Link
              to="/products?category=Home"
              className="px-4 py-3 hover:bg-gray-100 text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Home & Garden
            </Link>
            
            <div className="border-t border-gray-200 mt-2 pt-2">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 flex items-center">
                    <img
                      src={user?.avatar || 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2'}
                      alt={user?.name || 'User'}
                      className="w-8 h-8 rounded-full mr-2 border-2 border-[#F7B955]"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/account"
                    className="px-4 py-3 hover:bg-gray-100 text-gray-700 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={18} className="mr-2" />
                    My Account
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-700"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-3 hover:bg-gray-100 text-gray-700 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={18} className="mr-2" />
                  Login / Register
                </Link>
              )}
            </div>
            
            <div className="px-4 py-3 border-t border-gray-200">
              <button className="flex items-center text-gray-700">
                <Globe size={18} className="mr-2" />
                English
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;