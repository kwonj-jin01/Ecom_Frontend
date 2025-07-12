import React from "react";
import { Link } from "react-router-dom";
import type { MenuData } from "../../data/menuData";

export interface DesktopDropdownMenuProps {
  activeMenu: keyof MenuData | null;
  menuData: MenuData;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const DesktopDropdownMenu: React.FC<DesktopDropdownMenuProps> = ({
  activeMenu,
  menuData,
  onMouseEnter,
  onMouseLeave,
}) => {
  // Si aucun menu n'est actif, ne rien afficher
  if (!activeMenu) {
    return null;
  }

  // Obtenir les données du menu actif
  const currentMenuData = menuData[activeMenu];

  return (
    <div
      className="absolute left-0 right-0 bg-white shadow-lg z-10 transition-all duration-300"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto px-8 py-6">
        {/* Grille des sections du menu */}
        <div className="grid grid-cols-6 gap-8">
          {currentMenuData.sections.map((section, index) => (
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

        {/* Liens du bas s'ils existent */}
        {currentMenuData.bottomLinks && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex space-x-6">
              {currentMenuData.bottomLinks.map((link, index) => (
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
  );
};

export default DesktopDropdownMenu;
