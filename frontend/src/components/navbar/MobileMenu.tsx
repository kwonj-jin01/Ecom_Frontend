// components/MobileMenu.tsx
import React from 'react';
import { X, User, ShoppingBag, Heart, Settings, LogOut } from "lucide-react";
import { Link } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  onClose, 
  isAuthenticated 
}) => {
  const { user, logout } = useAuth();

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    logout();
    onClose();
  };

  // Fonction pour fermer le menu lors du clic sur un lien
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div
      className={`mobile-menu fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-xl transform transition-transform duration-300 md:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Bouton de fermeture */}
      <button
        onClick={onClose}
        aria-label="Close mobile menu"
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Informations utilisateur pour mobile */}
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

      {/* Navigation principale */}
      <nav className="flex flex-col mt-4 space-y-1 px-6 text-lg font-medium">
        {['shop', 'men', 'women', 'trending', 'seasonal', 'accessories'].map((link) => (
          <Link
            key={link}
            to={`/${link}`}
            onClick={handleLinkClick}
            className="capitalize hover:text-green-600 transition-colors py-2"
          >
            {link}
          </Link>
        ))}

        {/* Menu utilisateur mobile pour les utilisateurs connectés */}
        {isAuthenticated && (
          <>
            <div className="border-t border-gray-200 my-4"></div>
            <Link
              to="/profile"
              onClick={handleLinkClick}
              className="flex items-center gap-3 py-2 hover:text-green-600 transition-colors"
            >
              <User className="w-5 h-5" />
              Mon Profil
            </Link>
            <Link
              to="/orders"
              onClick={handleLinkClick}
              className="flex items-center gap-3 py-2 hover:text-green-600 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Mes Commandes
            </Link>
            <Link
              to="/favorites"
              onClick={handleLinkClick}
              className="flex items-center gap-3 py-2 hover:text-green-600 transition-colors"
            >
              <Heart className="w-5 h-5" />
              Mes Favoris
            </Link>
            <Link
              to="/settings"
              onClick={handleLinkClick}
              className="flex items-center gap-3 py-2 hover:text-green-600 transition-colors"
            >
              <Settings className="w-5 h-5" />
              Paramètres
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 py-2 text-red-600 hover:text-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Déconnexion
            </button>
          </>
        )}
      </nav>

      {/* Bouton de connexion pour les utilisateurs non connectés */}
      {!isAuthenticated && (
        <div className="mt-8 px-6">
          <Link
            to="/login"
            onClick={handleLinkClick}
            className="block w-full bg-green-500 text-white text-center px-4 py-3 rounded-full text-sm hover:bg-green-600 transition-colors"
          >
            SIGN IN/UP
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;