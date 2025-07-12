// components/index.ts
// Fichier d'exportation centralisé pour tous les composants du Header

export { default as TopBanner } from './TopBanner';
export { default as SearchBar } from './SearchBar';
export { default as UserMenu } from './UserMenu';
export { default as CartButton } from './CartButton';
export { default as DesktopNavigation } from './DesktopNavigation';
export { default as DesktopDropdownMenu } from './DesktopDropdownMenu';
export { default as MobileMenu } from './MobileMenu';

// Types et interfaces partagées
export type { MenuData } from '../../data/menuData';
export type { ProcessedProduct } from '../../types';