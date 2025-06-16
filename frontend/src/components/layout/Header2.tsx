import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartPreview from '../cart/CartPreview';
import { menuData, type MenuData } from '../../data/menuData';
import logoMain from '../../assets/fitix.png';
import logoAlt from '../../assets/logo1.png';



const Header2: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { cartCount, toggleCart } = useCart();
  const [activeMenu, setActiveMenu] = useState<keyof MenuData | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Animation de chargement
    setIsLoaded(true);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'bg-green-500 shadow-sm' : 'bg-white/80 backdrop-blur-sm'}`}>
      <div className="container mx-auto">
        {/* Navigation */}
        <nav className={`flex items-center justify-between px-8 py-6 relative z-20 transition-all duration-700 ease-in-out ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
          {/* Menu gauche */}
          <div className="hidden md:flex items-center space-x-8">
            {(['shop', 'men', 'women', 'trending'] as (keyof MenuData)[]).map((link) => (
              <Link
                key={link}
                to={`/${link}`}
                onMouseEnter={() => handleMouseEnter(link)}
                className="text-sm font-medium text-gray-text hover:text-white transition-colors ${isScrolled ? 'bg-black shadow-sm' : 'bg-white/80 backdrop-blur-sm'}">
                {link.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* Logo centré */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-in-out ${isLoaded ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
            <Link to="/">
              <img
                src={isScrolled ? logoAlt : logoMain}
                alt="FITIX Logo"
                className="h-20 object-contain" // ↔️ adapte la taille selon besoin
              />
            </Link>
          </div>

          {/* Menu de navigation droite */}
          <div className="hidden md:flex items-center space-x-6">
            {['seasonal', 'accessories'].map((link) => (
              <a key={link} href={`/${link}`}
                className="text-sm font-medium text-gray-text hover:text-white transition-colors">
                {link.toUpperCase()}
              </a>
            ))}
            <Link to="/login" className="bg-green-500 text-bl px-4 py-2 rounded-full text-sm hover:bg-white hover:text-black transition-colors">
              SIGN IN/UP
            </Link>
            <button
              onClick={toggleCart}
              className={`w-8 h-8 bg-green-500 text-bl rounded-full flex items-center justify-center  text-sm font-bold cursor-pointer hover:bg-white hover:text-black transition-colors ${isScrolled ? 'none' : 'hidden'}`}
              aria-label="Toggle cart"
            >
              {cartCount || 0}
            </button>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleCart}
              className={`w-8 h-8 bg-green-500 text-bl rounded-full flex items-center justify-center  text-sm font-bold cursor-pointer hover:bg-gray-800 hover:text-white transition-colors ${isScrolled ? 'none' : 'hidden'}`}
              aria-label="Toggle cart"
            >
              {cartCount || 0}
            </button>
            <button
              onClick={toggleMobileMenu}
              className={`w-8 h-8 flex flex-col items-center justify-center space-y-1 ${isScrolled ? 'none' : 'hidden'}`}
              aria-label="Toggle mobile menu">

              <span className={`w-6 h-0.5 ${isScrolled ? 'bg-green-500' : 'bg-black'} transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-6 h-0.5 ${isScrolled ? 'bg-green-500' : 'bg-black'} transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 ${isScrolled ? 'bg-green-500' : 'bg-black'} transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
        </nav>
      </div>

      {/* Menu déroulant pour desktop */}
      {activeMenu && (
        <div
          className={`absolute left-0 right-0  ${isScrolled ? 'bg-black' : 'bg-white'} shadow-lg z-10`}
          onMouseEnter={() => setActiveMenu(activeMenu)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="container mx-auto px-8 py-6">
            <div className="grid grid-cols-6 gap-8">
              {menuData[activeMenu].sections.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h3 className={`font-bold text-sm  ${isScrolled ? 'text-white/60' : 'text-gray-900'} `}>{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <a href="#" className={`text-sm ${isScrolled ? 'hover:text-white' : 'hover:text-black'} transition-colors ${isScrolled ? 'text-white/40' : 'text-gray-600'} `}>
                          {item}
                        </a>
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
                    <a key={index} href="#" className={`text-sm ${isScrolled ? 'hover:text-white' : 'hover:text-black'} transition-colors ${isScrolled ? 'text-white/40' : 'text-gray-600'} `}>
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Menu mobile */}
      {/* Overlay sombre */}
      {isMobileMenuOpen && (
        <div
          onClick={toggleMobileMenu}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Panneau latéral */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-1/2 bg-white shadow-xl
        transform transition-transform duration-300 md:hidden
         ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Bouton de fermeture */}
        <button
          onClick={toggleMobileMenu}
          aria-label="Close mobile menu"
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 focus:outline-none"
        >
          {/* un X simple */}
          <svg viewBox="0 0 24 24" className="w-6 h-6">
            <path
              d="M6 6l12 12M6 18L18 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Liens de navigation */}
        <nav className="flex flex-col mt-16 space-y-6 px-6 text-lg font-medium">
          {['shop', 'men', 'women', 'trending', 'seasonal', 'accessories'].map(
            (link) => (
              <Link
                key={link}
                to={`/${link}`}
                onClick={toggleMobileMenu}
                className="capitalize hover:text-green-600 transition-colors"
              >
                {link}
              </Link>
            )
          )}
        </nav>

        <div className="mt-8 px-6">
          <Link
            to="/register"
            onClick={toggleMobileMenu}
            className="block w-full bg-green-500   hover:text-white text-center px-4 py-3 rounded-full text-sm hover:bg-gray-800 transition-colors"
          >
            SIGN IN/UP
          </Link>
        </div>
      </div>


      {/* Aperçu du panier */}
      <CartPreview />
    </header>
  );
};

export default Header2;