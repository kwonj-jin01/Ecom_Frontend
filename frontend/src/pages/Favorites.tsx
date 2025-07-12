import  { useState } from "react";
import { Favorite } from "../types";
import FavoritesPage from "../components/Profil/FavoritesPage";


export default function Favorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([
    { id: 1, name: 'Nike Air Max 270', price: 149.99, image: '👟', category: 'Sneakers' },
    { id: 2, name: 'Adidas Stan Smith', price: 89.99, image: '👟', category: 'Sneakers' },
    { id: 3, name: 'Converse All Star', price: 65.99, image: '👟', category: 'Sneakers' },
    { id: 4, name: 'Puma RS-X', price: 110.99, image: '👟', category: 'Sneakers' },
    { id: 5, name: 'Vans Old Skool', price: 75.99, image: '👟', category: 'Sneakers' },
    { id: 6, name: 'New Balance 574', price: 95.99, image: '👟', category: 'Sneakers' },
    { id: 7, name: 'Reebok Club C', price: 70.99, image: '👟', category: 'Sneakers' },
    { id: 8, name: 'Jordan 1 Mid', price: 120.99, image: '👟', category: 'Sneakers' }
  ]);

  const handleRemove = (id: number) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FavoritesPage favorites={favorites} onRemove={handleRemove} />
    </div>
  );
}