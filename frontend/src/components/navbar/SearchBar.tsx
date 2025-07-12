import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { ProcessedProduct } from "../../types";

interface SearchBarProps {
  products: ProcessedProduct[];
  loadingProducts: boolean;
  /**
   * Indique si le header est scrollé.
   * (Conservé à titre informatif pour de futurs effets visuels et n'est pas encore utilisé.)
   */
  isScrolled?: boolean;
  showMobileSearch: boolean;
  onToggleMobileSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  products,
  loadingProducts,
  showMobileSearch,
  onToggleMobileSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);

  // Filtrer les produits selon le terme de recherche
  const filteredProducts: ProcessedProduct[] = products.filter((product) =>
    (product.name + " " + product.title)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Fermer la dropdown avec un délai
  const closeWithDelay = () => setTimeout(() => setIsFocused(false), 200);

  // Gestion de la sélection d'un produit
  const handleProductSelect = (product: ProcessedProduct) => {
    console.log("Selected product:", product);
    // Exemple : navigate(`/product/${product.id}`);

    // Réinitialiser la recherche
    setSearchTerm("");
    setIsFocused(false);
  };

  // Réinitialiser complètement la recherche mobile
  const resetMobileSearch = () => {
    onToggleMobileSearch();
    setSearchTerm("");
    setIsFocused(false);
  };

  return (
    <>
      {/* Barre de recherche pour desktop */}
      <div className="relative hidden md:block w-64">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search products…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={closeWithDelay}
            className="bg-transparent outline-none flex-1 text-sm"
          />
        </div>

        {searchTerm && isFocused && (
          <div className="absolute top-12 left-0 w-full bg-white rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
            {loadingProducts ? (
              <div className="px-4 py-2 text-sm text-gray-500">Chargement...</div>
            ) : filteredProducts.length ? (
              filteredProducts.map((product) => (
                <button
                  key={product.id}
                  className="flex w-full items-center px-4 py-2 hover:bg-gray-100 transition-colors"
                  onClick={() => handleProductSelect(product)}
                >
                  <img
                    src={product.thumbnail || product.hover_image}
                    alt={product.name}
                    className="w-8 h-8 object-cover rounded mr-3"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-image.jpg";
                    }}
                  />
                  <div className="flex-1 text-left">
                    <span className="text-sm font-medium truncate block">
                      {product.name}
                    </span>
                    <span className="text-xs text-gray-500 truncate block">
                      {product.title}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-green-600 ml-2">
                    ${product.price.toFixed(2)}
                  </span>
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                Aucun résultat trouvé
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bouton recherche mobile */}
      <button
        onClick={onToggleMobileSearch}
        className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Search className="w-5 h-5" />
      </button>

      {/* Barre de recherche mobile */}
      {showMobileSearch && (
        <div className="md:hidden absolute top-full left-0 right-0 px-4 pb-4 bg-white border-t border-gray-200 shadow-lg">
          <div className="relative">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-3">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search products…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={closeWithDelay}
                className="bg-transparent outline-none flex-1 text-sm"
                autoFocus
              />
              <button
                onClick={resetMobileSearch}
                className="ml-2 p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {searchTerm && isFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto">
                {loadingProducts ? (
                  <div className="px-4 py-8 text-center text-sm text-gray-500">
                    Chargement...
                  </div>
                ) : filteredProducts.length ? (
                  <div className="grid grid-cols-2 gap-3 p-4">
                    {filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        className="flex flex-col bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors p-2"
                        onClick={() => handleProductSelect(product)}
                      >
                        <div className="aspect-square rounded-lg overflow-hidden mb-2">
                          <img
                            src={product.thumbnail || product.hover_image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder-image.jpg";
                            }}
                          />
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-medium truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-green-600 font-medium">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center text-sm text-gray-500">
                    Aucun résultat trouvé
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
