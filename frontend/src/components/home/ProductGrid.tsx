// components/home/ProductGrid.tsx
import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { ProcessedProduct } from '../../types';
import { useFavorites } from '../../context/FavoriteContext';
import { useCart } from '../../hook/useCart';
import QuickViewModal from '../ui/QuickViewModal';

interface ProductGridProps {
  title: string;
  products: ProcessedProduct[];
}



const ProductGrid: React.FC<ProductGridProps> = ({ title, products }) => {
  // ─── Contexts ────────────────────────────────────────────────────────────
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  // ─── States ─────────────────────────────────────────────────────────────
  const [quickViewProduct, setQuickViewProduct] = useState<ProcessedProduct | null>(null);

  // ─── Handlers ───────────────────────────────────────────────────────────
  const handleQuickView = (product: ProcessedProduct) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => setQuickViewProduct(null);

  const handleAddToCart = (product: ProcessedProduct, size: string, color: string) => {
    // Convert ProcessedProduct to Product format expected by CartContext
    const productForCart = {
      id: product.id,
      name: product.name,
      title: product.title,
      price: product.price.toString(), // Convert number to string
      image: product.thumbnail,
      thumbnail: product.thumbnail,
      description: product.description,
      category: product.category,
    };

    addToCart(productForCart, size, color);
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
      <div className="max-w-6xl mx-auto mb-6">
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
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={closeQuickView}
        onAddToCart={handleAddToCart}
      />
    </section>
  );
};

export default ProductGrid;