import React, { useState } from "react";
import type { Favorite } from "../../types";

import { X, Heart, ShoppingCart, Star, Tag, Grid, List, Filter, Search } from "lucide-react";



interface FavoritesPageProps {
  favorites: Favorite[];
  onRemove?: (id: number) => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ favorites, onRemove }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filtrer les favoris
  const filteredFavorites = favorites.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Obtenir les catégories uniques
  const categories = Array.from(new Set(favorites.map(item => item.category)));

  const GridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredFavorites.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
        >
          {/* Image et badge favori */}
          <div className="relative bg-gray-50 p-8 flex items-center justify-center">
            <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
              {item.image}
            </div>
            <div className="absolute top-3 right-3">
              <div className="bg-red-100 p-2 rounded-full">
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </div>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-6">
            <div className="mb-3">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                {item.category}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
              {item.name}
            </h3>
            
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">(4.8)</span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-green-600">
                {item.price.toFixed(2)}€
              </div>
              <div className="text-sm text-gray-500 line-through">
                {(item.price * 1.2).toFixed(2)}€
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Acheter
              </button>
              <button
                onClick={() => onRemove?.(item.id)}
                className="p-3 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-lg transition-colors duration-200"
                title="Retirer des favoris"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="space-y-4">
      {filteredFavorites.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
        >
          <div className="flex items-center p-6">
            {/* Image */}
            <div className="bg-gray-50 p-6 rounded-lg mr-6 flex-shrink-0">
              <div className="text-4xl">{item.image}</div>
            </div>

            {/* Contenu */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full mr-3">
                      {item.category}
                    </span>
                    <div className="bg-red-100 p-1 rounded-full">
                      <Heart className="w-3 h-3 text-red-500 fill-current" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">(4.8)</span>
                  </div>

                  <div className="flex items-center">
                    <div className="text-2xl font-bold text-green-600 mr-3">
                      {item.price.toFixed(2)}€
                    </div>
                    <div className="text-sm text-gray-500 line-through">
                      {(item.price * 1.2).toFixed(2)}€
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 ml-6">
                  <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center shadow-md hover:shadow-lg">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Acheter
                  </button>
                  <button
                    onClick={() => onRemove?.(item.id)}
                    className="p-3 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-lg transition-colors duration-200"
                    title="Retirer des favoris"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec gradient */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Heart className="w-8 h-8 mr-3 fill-current" />
              <div>
                <h1 className="text-3xl font-bold">Mes Favoris</h1>
                <p className="text-green-100 mt-1">
                  {filteredFavorites.length} produit{filteredFavorites.length > 1 ? 's' : ''} en favoris
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Tag className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-sm text-green-100">Économies potentielles</p>
                <p className="text-xl font-bold">
                  {(filteredFavorites.reduce((sum, item) => sum + (item.price * 0.2), 0)).toFixed(2)}€
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Barre de contrôles */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Recherche */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher dans mes favoris..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filtres et vues */}
            <div className="flex items-center gap-4">
              {/* Filtre par catégorie */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">Toutes les catégories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Boutons de vue */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu des favoris */}
        {filteredFavorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl shadow-lg p-12 max-w-md mx-auto">
              <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {searchTerm || selectedCategory !== 'all' ? 'Aucun résultat' : 'Aucun favori'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Essayez de modifier vos filtres de recherche.'
                  : 'Ajoutez des produits à vos favoris pour les retrouver ici.'
                }
              </p>
              {(searchTerm || selectedCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Effacer les filtres
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? <GridView /> : <ListView />}
          </>
        )}

        {/* Stats en bas */}
        {filteredFavorites.length > 0 && (
          <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600">
                  {filteredFavorites.length}
                </div>
                <div className="text-gray-600">Produits favoris</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">
                  {filteredFavorites.reduce((sum, item) => sum + item.price, 0).toFixed(2)}€
                </div>
                <div className="text-gray-600">Valeur totale</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">
                  {Math.round(filteredFavorites.reduce((sum, item) => sum + item.price, 0) / filteredFavorites.length)}€
                </div>
                <div className="text-gray-600">Prix moyen</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
