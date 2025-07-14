// components/CartButton.tsx
import React from 'react';
import { Heart, ShoppingBag } from "lucide-react";
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoriteContext';
import CartPreview from '../cart/CartPreview';
import { useCart } from '../../hook/useCart';


interface CartButtonProps {
  showCart: boolean;
  onToggleCart: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({ showCart, onToggleCart }) => {
  // Utilisation des contextes pour obtenir les données du panier et des favoris
  const { getTotalCartItems } = useCart();
  const { favorites } = useFavorites();

  return (
    <>
      {/* Bouton des favoris avec badge indicateur */}
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

      {/* Bouton du panier avec badge indicateur et preview */}
      <div className="relative">
        <button
          onClick={onToggleCart}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
        >
          <ShoppingBag className="w-5 h-5" />
          {getTotalCartItems() > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs">
              {getTotalCartItems()}
            </span>
          )}
        </button>
        
        {/* Composant de prévisualisation du panier */}
        <CartPreview 
          isOpen={showCart} 
          onClose={() => onToggleCart()} 
        />
      </div>
    </>
  );
};

export default CartButton;