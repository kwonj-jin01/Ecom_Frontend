import React, { useState, useEffect } from 'react';
import {
  Search,
  Menu,
  Heart,
  ShoppingBag,
  X,
} from "lucide-react";
import { Link } from 'react-router-dom';
import { menuData, type MenuData } from '../../data/menuData';
import CartPreview from '../cart/CartPreview';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoriteContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<keyof MenuData | null>(null);
  const { favorites, toggleFavorite } = useFavorites();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showCart, setShowCart] = useState<boolean>(false);

  // Use cart context instead of local state
  const { getTotalCartItems } = useCart();

  // Add scroll listener for header background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menuId: keyof MenuData) => {
    setActiveMenu(menuId);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest('.mobile-menu')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close cart when mobile menu opens and vice versa
  useEffect(() => {
    if (isMobileMenuOpen) {
      setShowCart(false);
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (showCart) {
      setIsMobileMenuOpen(false);
    }
  }, [showCart]);

  /** ---- Top banner ---- */
  const WorkoutStore = () => (
    <div className="bg-black text-white py-2 px-4 text-center">
      <p className="text-sm">
        Free shipping on orders over $75&nbsp;|&nbsp;30‑day returns
      </p>
    </div>
  );

  return (
    <>
      <WorkoutStore />
      {/* Header */}
      <header className={`${isScrolled ? 'bg-white shadow-md' : 'bg-white'} shadow-sm border-b border-gray-100 sticky top-0 z-50 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="text-2xl font-bold">
                <div className="text-black text-2xl font-bold">FITIX</div>
              </Link>

              <nav className="hidden md:flex items-center gap-8">
                {(['shop', 'men', 'women', 'trending'] as (keyof MenuData)[]).map((link) => (
                  <Link
                    key={link}
                    to={`/${link}`}
                    onMouseEnter={() => handleMouseEnter(link)}
                    className="text-gray-900 hover:text-black font-medium transition-colors capitalize"
                  >
                    {link}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-64">
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent outline-none flex-1 text-sm"
                />
              </div>

              <Link
                to="/login"
                className="bg-green-500 text-white px-4 py-2 rounded-full text-sm hover:bg-green-600 transition-colors"
              >
                SIGN IN/UP
              </Link>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleFavorite("header-dummy-id")} // 🔧 ID factice ou réel
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                  <Heart className="w-5 h-5" />
                  {favorites.size > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {favorites.size}
                    </span>
                  )}
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowCart(!showCart)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {getTotalCartItems() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {getTotalCartItems()}
                      </span>
                    )}
                  </button>
                  <CartPreview isOpen={showCart} onClose={() => setShowCart(false)} />
                </div>

                <button
                  onClick={toggleMobileMenu}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop dropdown menu */}
        {activeMenu && (
          <div
            className="absolute left-0 right-0 bg-white shadow-lg z-10 transition-all duration-300"
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="container mx-auto px-8 py-6">
              <div className="grid grid-cols-6 gap-8">
                {menuData[activeMenu].sections.map((section, index) => (
                  <div key={index} className="space-y-4">
                    <h3 className="font-bold text-sm text-gray-900">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <Link
                            to="#"
                            className="text-sm text-gray-600 hover:text-green-600 transition-colors duration-200"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {menuData[activeMenu].bottomLinks && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex space-x-6">
                    {menuData[activeMenu].bottomLinks.map((link, index) => (
                      <Link
                        key={index}
                        to="#"
                        className="text-sm text-gray-600 hover:text-green-600 transition-colors duration-200"
                      >
                        {link}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile side panel */}
        <div
          className={`mobile-menu fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-xl transform transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          {/* Close button */}
          <button
            onClick={toggleMobileMenu}
            aria-label="Close mobile menu"
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation links */}
          <nav className="flex flex-col mt-16 space-y-6 px-6 text-lg font-medium">
            {['shop', 'men', 'women', 'trending', 'seasonal', 'accessories'].map(
              (link) => (
                <Link
                  key={link}
                  to={`/${link}`}
                  onClick={toggleMobileMenu}
                  className="capitalize hover:text-green-600 transition-colors py-2"
                >
                  {link}
                </Link>
              )
            )}
          </nav>

          <div className="mt-8 px-6">
            <Link
              to="/login"
              onClick={toggleMobileMenu}
              className="block w-full bg-green-500 text-white text-center px-4 py-3 rounded-full text-sm hover:bg-green-600 transition-colors"
            >
              SIGN IN/UP
            </Link>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleMobileMenu}
          />
        )}
      </header>
    </>
  );
};

export default Header;