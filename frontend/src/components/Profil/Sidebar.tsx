import React from "react";
import { Heart, Package, Settings, User } from "lucide-react";

export type PageKey =
  | "profile"
  | "orders"
  | "order-detail"
  | "favorites"
  | "settings";

interface SidebarProps {
  activePage: PageKey;
  onNavigate: (page: PageKey) => void;
}

/**
 * Sidebar principal de navigation dans l'espace utilisateur.
 */
export const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => (
  <aside className="w-64 bg-white shadow-lg h-full flex flex-col">
    {/* Profil rapide */}
    <div className="p-6 border-b">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">AJ</span>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">Alisa Janin</h2>
          <p className="text-sm text-gray-600">User client</p>
        </div>
      </div>
    </div>

    {/* Liens */}
    <nav className="mt-6 flex-1 space-y-1">
      <button
        onClick={() => onNavigate("profile")}
        className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition-colors ${activePage === "profile" ? "bg-blue-50 border-r-2 border-blue-500" : ""
          }`}
      >
        <User className="w-5 h-5 mr-3 text-gray-600" />
        <span className="text-gray-700">Mon Profil</span>
      </button>

      <button
        onClick={() => onNavigate("orders")}
        className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition-colors ${activePage === "orders" || activePage === "order-detail"
            ? "bg-blue-50 border-r-2 border-blue-500"
            : ""
          }`}
      >
        <Package className="w-5 h-5 mr-3 text-gray-600" />
        <span className="text-gray-700">Mes Commandes</span>
      </button>

      <button
        onClick={() => onNavigate("favorites")}
        className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition-colors ${activePage === "favorites" ? "bg-blue-50 border-r-2 border-blue-500" : ""
          }`}
      >
        <Heart className="w-5 h-5 mr-3 text-gray-600" />
        <span className="text-gray-700">Mes Favoris</span>
      </button>

      <button
        onClick={() => onNavigate("settings")}
        className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition-colors ${activePage === "settings" ? "bg-blue-50 border-r-2 border-blue-500" : ""
          }`}
      >
        <Settings className="w-5 h-5 mr-3 text-gray-600" />
        <span className="text-gray-700">Paramètres</span>
      </button>
    </nav>
  </aside>
);

export default Sidebar;
