// components/home/ProductGrid.tsx
import React, { useState } from 'react';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { ProcessedProduct } from '../../types';
import Button from '../ui/Button';
import { useFavorites } from '../../context/FavoriteContext';
import { useCart } from '../../hook/useCart';

interface ProductGridProps {
  title: string;
  products: ProcessedProduct[];
}

// Centralise les tailles disponibles
const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

const ProductGrid: React.FC<ProductGridProps> = ({ title, products }) => {
  // ─── Contexts ────────────────────────────────────────────────────────────
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  // ─── States ─────────────────────────────────────────────────────────────
  const [quickViewProduct, setQuickViewProduct] = useState<ProcessedProduct | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('M');

  // ─── Handlers ───────────────────────────────────────────────────────────
  const handleQuickView = (product: ProcessedProduct) => {
    setQuickViewProduct(product);
    setSelectedSize('M');
  };

  const closeQuickView = () => setQuickViewProduct(null);

  const handleAddToCart = () => {
    if (quickViewProduct) {
      addToCart(quickViewProduct);
      closeQuickView();
    }
  };

  // Early return if no products
  if (!products || products.length === 0) {
    return (
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold italic leading-tight mb-8">{title}.</h2>
          <p className="text-gray-500 text-center py-8">No products available</p>
        </div>
      </section>
    );
  }

  // ─── Render ─────────────────────────────────────────────────────────────
  return (
    <section className="py-8 px-4">
      {/* Masque la barre de défilement horizontale */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE & Edge */
          scrollbar-width: none;    /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;           /* Chrome, Safari, Opera */
        }
      `}</style>

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="mb-3 flex items-center gap-4">
          <h2 className="text-4xl font-bold italic leading-tight">{title}.</h2>
          <div className="w-full h-1 bg-green-500 rounded-full mt-5"></div>
        </div>
      </div>

      {/* Liste des produits */}
      <div className="flex overflow-x-auto space-x-8 pb-4 scrollbar-hide">
        {products.map((product) => {
          const isFavorite = favorites.has(product.id);
          const hasDiscount = product.is_on_sale && product.discount > 0;

          return (
            <div key={product.id} className="group flex-shrink-0 w-64">
              {/* Image & actions */}
              <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 mb-4">
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  {/* Image principale */}
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-[300px] object-cover object-center group-hover:opacity-0 transition-opacity duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = product.thumbnail; // Fallback to thumbnail
                    }}
                  />
                  {/* Image au survol */}
                  <img
                    src={product.hover_image}
                    alt={`${product.name} hover`}
                    className="w-full h-[300px] object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = product.thumbnail; // Fallback to main image
                    }}
                  />

                  {/* Bouton quick‑shop */}
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-white/90 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={() => handleQuickView(product)}
                      className="w-full py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                      disabled={!product.in_stock}
                    >
                      {product.in_stock ? 'ADD' : 'OUT OF STOCK'}
                    </button>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.is_new && (
                      <span className="bg-black text-white px-2 py-1 text-xs font-medium">NEW</span>
                    )}
                    {product.is_best_seller && (
                      <span className="bg-white text-black px-2 py-1 text-xs font-medium">BEST SELLER</span>
                    )}
                    {product.is_on_sale && (
                      <span className="bg-red-500 text-white px-2 py-1 text-xs font-medium">
                        -{product.discount_percentage}%
                      </span>
                    )}
                    {!product.in_stock && (
                      <span className="bg-gray-500 text-white px-2 py-1 text-xs font-medium">OUT OF STOCK</span>
                    )}
                  </div>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Infos produit */}
              <div className="mt-4">
                <h3 className="text-sm font-medium truncate" title={product.title}>
                  {product.title}
                </h3>
                <p className="text-xs text-gray-500 mb-1">{product.brand}</p>

                {/* Prix */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">${product.price.toFixed(2)}</span>
                  {hasDiscount && (
                    <span className="text-xs text-gray-500 line-through">
                      ${product.original_price.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">{product.rating}</span>
                </div>

                {/* Stock indicator */}
                {product.in_stock && (
                  <p className="text-xs text-orange-500 mt-1">Only {product.stock} left!</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-gray-500/75 transition-opacity"
              onClick={closeQuickView}
            />

            {/* Contenu */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl w-full">
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-1/2 bg-gray-100">
                  <img
                    src={quickViewProduct.thumbnail}
                    alt={quickViewProduct.name}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = quickViewProduct.thumbnail;
                    }}
                  />
                </div>

                {/* Détails */}
                <div className="md:w-1/2 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-medium" id="modal-title">
                        {quickViewProduct.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">{quickViewProduct.brand}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-medium">${quickViewProduct.price.toFixed(2)}</span>
                        {quickViewProduct.is_on_sale && (
                          <span className="text-sm text-gray-500 line-through">
                            ${quickViewProduct.original_price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">{quickViewProduct.rating}</span>
                      </div>
                    </div>
                    <button onClick={closeQuickView} className="text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-700">{quickViewProduct.description}</p>
                  </div>

                  {/* Promotion */}
                  {quickViewProduct.promotion && (
                    <div className="mb-4 p-3 bg-green-50 rounded">
                      <p className="text-sm text-green-800">{quickViewProduct.promotion}</p>
                    </div>
                  )}

                  {/* Tailles */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-2">Size</h4>
                    <div className="grid grid-cols-5 gap-2">
                      {SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-2 border text-sm ${selectedSize === size
                              ? 'border-black bg-black text-white'
                              : 'border-gray-300 hover:border-gray-700'
                            }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Stock info */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      {quickViewProduct.in_stock
                        ? `${quickViewProduct.stock} in stock`
                        : 'Out of stock'
                      }
                    </p>
                  </div>

                  {/* Ajouter au panier */}
                  <div className="mb-4">
                    <Button
                      onClick={handleAddToCart}
                      fullWidth
                      size="lg"
                      className="flex items-center justify-center gap-2"
                      disabled={!quickViewProduct.in_stock}
                    >
                      <ShoppingBag size={18} />
                      {quickViewProduct.in_stock ? 'ADD TO CART' : 'OUT OF STOCK'}
                    </Button>
                  </div>

                  {/* Lien détails */}
                  <div className="text-center">
                    <a href={`/products/${quickViewProduct.id}`} className="text-sm font-medium underline">
                      View full details
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;