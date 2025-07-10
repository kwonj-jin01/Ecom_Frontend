import React, { useState, useEffect } from 'react';
import {
  Search,
  Menu,
  Heart,
  ShoppingBag,
  X,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Link } from 'react-router-dom';
import { menuData, type MenuData } from '../../data/menuData';
import CartPreview from '../cart/CartPreview';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoriteContext';
import { useAuth } from '../../hook/useAuth';
import { fetchAllProducts } from '../../data/products';
import { ProcessedProduct } from "../../types"; // Changed from Product to ProcessedProduct

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<keyof MenuData | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { favorites } = useFavorites();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const [showCart, setShowCart] = useState<boolean>(false);
  const [allProducts, setAllProducts] = useState<ProcessedProduct[]>([]); // Changed type
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchAllProducts();
        setAllProducts(data);
        setLoadingProducts(false);
      } catch (error) {
        console.error("Error loading products:", error);
        setLoadingProducts(false);
      }
    };

    loadProducts();
  }, []);

  // Filtrage : on cherche dans name ET title → insensible à la casse
  const filtered: ProcessedProduct[] = allProducts.filter((p) =>
    (p.name + " " + p.title).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const closeWithDelay = () => setTimeout(() => setIsFocused(false), 200);

  // Utilise le contexte d'authentification
  const { user, isAuthenticated, logout } = useAuth();

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

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  // Handle product selection from search results
  const handleProductSelect = (product: ProcessedProduct) => {
    // Navigate to product page or handle selection
    console.log("Selected product:", product);
    // You can add navigation logic here
    // For example: navigate(`/product/${product.id}`);
    
    // Clear search state
    setSearchTerm("");
    setIsFocused(false);
    setShowMobileSearch(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest('.mobile-menu')) {
        setIsMobileMenuOpen(false);
      }
      if (showUserMenu && !(event.target as Element).closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    if (isMobileMenuOpen || showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen, showUserMenu]);

  // Close cart when mobile menu opens and vice versa
  useEffect(() => {
    if (isMobileMenuOpen) {
      setShowCart(false);
      setShowUserMenu(false);
      setShowMobileSearch(false);
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (showCart) {
      setIsMobileMenuOpen(false);
      setShowUserMenu(false);
      setShowMobileSearch(false);
    }
  }, [showCart]);

  useEffect(() => {
    if (showUserMenu) {
      setShowCart(false);
      setIsMobileMenuOpen(false);
      setShowMobileSearch(false);
    }
  }, [showUserMenu]);

  useEffect(() => {
    if (showMobileSearch) {
      setShowCart(false);
      setIsMobileMenuOpen(false);
      setShowUserMenu(false);
    }
  }, [showMobileSearch]);

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
      <header className={`${isScrolled ? 'bg-green-500' : 'bg-white'} shadow-sm border-b border-gray-100 sticky top-0 z-50 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
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

            <div className="flex items-center gap-2 sm:gap-4">
              {/* Desktop Search */}
              <div className="relative hidden md:block w-64">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full">
                  <Search className="w-4 h-4 text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Search products…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={closeWithDelay}
                    className="bg-transparent outline-none flex-1 text-sm"
                  />
                </div>

                {/* Desktop dropdown with loading state */}
                {searchTerm && isFocused && (
                  <div className="absolute top-12 left-0 w-full bg-white rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                    {loadingProducts ? (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        Chargement...
                      </div>
                    ) : filtered.length ? (
                      filtered.map((product) => (
                        <button
                          key={product.id}
                          className="flex w-full items-center px-4 py-2 hover:bg-gray-100 transition-colors"
                          onClick={() => handleProductSelect(product)}
                        >
                          <img
                            src={product.thumbnail || product.hover_image}
                            alt={product.name}
                            className="w-8 h-8 object-cover rounded mr-3"
                            onError={(e) => {
                              // Fallback image handling
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder-image.jpg'; // Add a placeholder image
                            }}
                          />
                          <div className="flex-1 text-left">
                            <span className="text-sm font-medium truncate block">{product.name}</span>
                            <span className="text-xs text-gray-500 truncate block">{product.title}</span>
                          </div>
                          <span className="text-sm font-medium text-green-600 ml-2">
                            ${product.price.toFixed(2)}
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        Aucun résultat trouvé
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Search Button */}
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Bouton Sign In/Up ou Menu Utilisateur */}
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className={`hidden sm:block ${isScrolled ? 'bg-white text-black' : 'bg-green-500 text-white'} px-4 py-2 rounded-full text-sm hover:bg-green-600 transition-colors`}
                >
                  SIGN IN/UP
                </Link>
              ) : (
                <div className="relative user-menu-container hidden sm:block">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center overflow-hidden">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt="User avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Menu déroulant utilisateur */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {/* Informations utilisateur */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center overflow-hidden">
                            {user?.avatar ? (
                              <img
                                src={user.avatar}
                                alt="User avatar"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {user?.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <User className="w-4 h-4" />
                          Mon Profil
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          Mes Commandes
                        </Link>
                        <Link
                          to="/favorites"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                          Mes Favoris
                        </Link>
                        <Link
                          to="/settings"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          Paramètres
                        </Link>
                      </div>

                      {/* Déconnexion */}
                      <div className="border-t border-gray-100 py-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Déconnexion
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center gap-1 sm:gap-3">
                <Link
                  to="/favorites"
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                >
                  <Heart className="w-5 h-5" />
                  {favorites.size > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs">
                      {favorites.size}
                    </span>
                  )}
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setShowCart(!showCart)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {getTotalCartItems() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs">
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

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="md:hidden px-4 pb-4 border-t border-gray-200">
            <div className="relative">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-3">
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search products…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={closeWithDelay}
                  className="bg-transparent outline-none flex-1 text-sm"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setShowMobileSearch(false);
                    setSearchTerm("");
                    setIsFocused(false);
                  }}
                  className="ml-2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Search Results - Enhanced Grid */}
              {searchTerm && isFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto">
                  {loadingProducts ? (
                    <div className="px-4 py-8 text-center text-sm text-gray-500">
                      Chargement...
                    </div>
                  ) : filtered.length ? (
                    <div className="grid grid-cols-2 gap-3 p-4">
                      {filtered.map((product) => (
                        <button
                          key={product.id}
                          className="flex flex-col bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors p-2"
                          onClick={() => handleProductSelect(product)}
                        >
                          <div className="aspect-square rounded-lg overflow-hidden mb-2">
                            <img
                              src={product.thumbnail || product.hover_image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder-image.jpg';
                              }}
                            />
                          </div>
                          <div className="text-left">
                            <p className="text-xs font-medium truncate">{product.name}</p>
                            <p className="text-xs text-green-600 font-medium">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-8 text-center text-sm text-gray-500">
                      Aucun résultat trouvé
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

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

          {/* User info for mobile */}
          {isAuthenticated && user && (
            <div className="px-6 py-4 border-b border-gray-200 mt-12">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center overflow-hidden">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="User avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation links */}
          <nav className="flex flex-col mt-4 space-y-1 px-6 text-lg font-medium">
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

            {/* Mobile user menu items */}
            {isAuthenticated && (
              <>
                <div className="border-t border-gray-200 my-4"></div>
                <Link
                  to="/profile"
                  onClick={toggleMobileMenu}
                  className="flex items-center gap-3 py-2 hover:text-green-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  Mon Profil
                </Link>
                <Link
                  to="/orders"
                  onClick={toggleMobileMenu}
                  className="flex items-center gap-3 py-2 hover:text-green-600 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Mes Commandes
                </Link>
                <Link
                  to="/favorites"
                  onClick={toggleMobileMenu}
                  className="flex items-center gap-3 py-2 hover:text-green-600 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  Mes Favoris
                </Link>
                <Link
                  to="/settings"
                  onClick={toggleMobileMenu}
                  className="flex items-center gap-3 py-2 hover:text-green-600 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  Paramètres
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  className="flex items-center gap-3 py-2 text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Déconnexion
                </button>
              </>
            )}
          </nav>

          {!isAuthenticated && (
            <div className="mt-8 px-6">
              <Link
                to="/login"
                onClick={toggleMobileMenu}
                className="block w-full bg-green-500 text-white text-center px-4 py-3 rounded-full text-sm hover:bg-green-600 transition-colors"
              >
                SIGN IN/UP
              </Link>
            </div>
          )}
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