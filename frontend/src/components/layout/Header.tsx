// Header.tsx - Composant principal
import React, { useState, useEffect } from 'react';
import { Menu} from "lucide-react";
import { Link } from 'react-router-dom';
import { menuData, type MenuData } from '../../data/menuData';
import { useAuth } from '../../hook/useAuth';
import { fetchAllProducts } from '../../data/products';
import { ProcessedProduct } from "../../types";

// Import des composants modulaires
import TopBanner from '../navbar/TopBanner';
import { CartButton, DesktopDropdownMenu, DesktopNavigation, MobileMenu, SearchBar, UserMenu } from '../navbar';

const Header: React.FC = () => {
  // États pour la gestion de l'interface
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<keyof MenuData | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  
  // États pour les produits et la recherche
  const [allProducts, setAllProducts] = useState<ProcessedProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);

  const { isAuthenticated } = useAuth();

  // Chargement des produits au montage du composant
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

  // Gestion du scroll pour changer l'apparence du header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gestion des interactions entre les différents menus
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

  // Gestionnaires d'événements pour les menus
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

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  return (
    <>
      {/* Bannière promotionnelle en haut */}
      <TopBanner />
      
      {/* Header principal avec fond dynamique basé sur le scroll */}
      <header className={`${isScrolled ? 'bg-green-500' : 'bg-white'} shadow-sm border-b border-gray-100 sticky top-0 z-50 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo et navigation desktop */}
            <div className="flex items-center gap-8">
              <Link to="/" className="text-2xl font-bold">
                <div className="text-black text-2xl font-bold">FITIX</div>
              </Link>
              
              {/* Navigation desktop - cachée sur mobile */}
              <DesktopNavigation 
                onMouseEnter={handleMouseEnter}
                menuItems={['boutique', 'hommes', 'femmes', 'tendances'] as (keyof MenuData)[]}
              />
            </div>

            {/* Barre d'actions à droite */}
            <div className="flex items-center gap-2 sm:gap-4">
              
              {/* Barre de recherche desktop */}
              <SearchBar 
                products={allProducts}
                loadingProducts={loadingProducts}
                isScrolled={isScrolled}
                showMobileSearch={showMobileSearch}
                onToggleMobileSearch={toggleMobileSearch}
              />

              {/* Menu utilisateur ou bouton de connexion */}
              <UserMenu 
                isAuthenticated={isAuthenticated}
                isScrolled={isScrolled}
                showUserMenu={showUserMenu}
                onToggleUserMenu={toggleUserMenu}
              />

              {/* Boutons d'actions (favoris, panier, menu mobile) */}
              <div className="flex items-center gap-1 sm:gap-3">
                <CartButton 
                  showCart={showCart}
                  onToggleCart={() => setShowCart(!showCart)}
                />

                {/* Bouton menu mobile */}
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

        {/* Menu dropdown desktop qui apparaît au survol */}
        <DesktopDropdownMenu
          activeMenu={activeMenu}
          menuData={menuData}
          onMouseEnter={() => setActiveMenu(activeMenu)}
          onMouseLeave={handleMouseLeave}
        />
      </header>

      {/* Menu mobile - panneau latéral qui glisse depuis la droite */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={toggleMobileMenu}
        isAuthenticated={isAuthenticated}
      />

      {/* Overlay sombre pour le menu mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
};

export default Header;