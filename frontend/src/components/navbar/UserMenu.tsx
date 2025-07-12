import React, { useEffect, useCallback } from "react";
import {
  User,
  Settings,
  LogOut,
  ShoppingBag,
  Heart,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";

interface UserMenuProps {
  isAuthenticated: boolean;
  isScrolled: boolean;
  showUserMenu: boolean;
  onToggleUserMenu: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({
  isAuthenticated,
  isScrolled,
  showUserMenu,
  onToggleUserMenu,
}) => {
  const { user, logout } = useAuth();

  // Gestion de la déconnexion
  const handleLogout = () => {
    logout();
    onToggleUserMenu();
  };

  /**
   * Ferme le menu utilisateur.
   * Memoisé pour éviter l'avertissement ESLint (react-hooks/exhaustive-deps)
   */
  const closeUserMenu = useCallback(() => {
    onToggleUserMenu();
  }, [onToggleUserMenu]);

  // Gestion des clics extérieurs au menu utilisateur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showUserMenu &&
        !(event.target as Element).closest(".user-menu-container")
      ) {
        closeUserMenu();
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu, closeUserMenu]);

  // Utilisateur non authentifié → bouton SIGN IN/UP
  if (!isAuthenticated) {
    return (
      <Link
        to="/login"
        className={`hidden sm:block ${
          isScrolled ? "bg-white text-black" : "bg-green-500 text-white"
        } px-4 py-2 rounded-full text-sm hover:bg-green-600 transition-colors`}
      >
        SIGN IN/UP
      </Link>
    );
  }

  // Utilisateur authentifié → menu complet
  return (
    <div className="relative user-menu-container hidden sm:block">
      <button
        onClick={onToggleUserMenu}
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
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            showUserMenu ? "rotate-180" : ""
          }`}
        />
      </button>

      {showUserMenu && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
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
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="py-1">
            <Link
              to="/profile"
              onClick={closeUserMenu}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <User className="w-4 h-4" />
              Mon Profil
            </Link>
            <Link
              to="/orders"
              onClick={closeUserMenu}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Mes Commandes
            </Link>
            <Link
              to="/favorites"
              onClick={closeUserMenu}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Heart className="w-4 h-4" />
              Mes Favoris
            </Link>
            <Link
              to="/settings"
              onClick={closeUserMenu}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Paramètres
            </Link>
          </div>

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
  );
};

export default UserMenu;
