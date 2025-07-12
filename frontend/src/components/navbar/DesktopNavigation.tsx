// components/DesktopNavigation.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MenuData } from '../../data/menuData';

interface DesktopNavigationProps {
  onMouseEnter: (menuId: keyof MenuData) => void;
  menuItems: (keyof MenuData)[];
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ 
  onMouseEnter, 
  menuItems 
}) => {
  return (
    <nav className="hidden md:flex items-center gap-8">
      {menuItems.map((link) => (
        <Link
          key={link}
          to={`/${link}`}
          onMouseEnter={() => onMouseEnter(link)}
          className="text-gray-900 hover:text-black font-medium transition-colors capitalize"
        >
          {link}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNavigation;