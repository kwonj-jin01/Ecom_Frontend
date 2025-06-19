import React, { useState } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';
import { useFavorites } from '../../context/FavoriteContext';

interface ProductGridProps {
  title: string;
  products: Product[];
}

// Centralise les tailles disponibles
const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

const ProductGrid: React.FC<ProductGridProps> = ({ title, products }) => {
  // ─── Contexts ────────────────────────────────────────────────────────────
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  // ─── States ─────────────────────────────────────────────────────────────
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('M');

  // ─── Handlers ───────────────────────────────────────────────────────────
  const handleQuickView = (product: Product) => {
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
          return (
            <div key={product.id} className="group flex-shrink-0 w-64">
              {/* Image & actions */}
              <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 mb-4">
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  {/* Image principale */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[300px] object-cover object-center group-hover:opacity-0 transition-opacity duration-300"
                  />
                  {/* Image au survol */}
                  <img
                    src={product.hoverImage ?? product.image}
                    alt={`${product.name} hover`}
                    className="w-full h-[300px] object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  {/* Bouton quick‑shop */}
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-white/90 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={() => handleQuickView(product)}
                      className="w-full py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      ADD
                    </button>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.isNew && (
                      <span className="bg-black text-white px-2 py-1 text-xs font-medium">NEW</span>
                    )}
                    {product.isBestSeller && (
                      <span className="bg-white text-black px-2 py-1 text-xs font-medium">BEST SELLER</span>
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
                <h3 className="text-sm font-medium truncate" title={product.name}>{product.name}</h3>
                <p className="text-sm font-medium mt-1">${product.price.toFixed(2)}</p>

                {/* Couleurs */}
                {product.colors?.length && (
                  <div className="mt-2 flex gap-1">
                    {product.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-3 h-3 rounded-full border"
                        style={{
                          backgroundColor: color.toLowerCase(),
                          borderColor: color.toLowerCase() === 'white' ? '#e5e5e5' : 'transparent',
                        }}
                        title={color}
                      />
                    ))}
                  </div>
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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl w-full">
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-1/2 bg-gray-100">
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Détails */}
                <div className="md:w-1/2 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium" id="modal-title">
                        {quickViewProduct.name}
                      </h3>
                      <p className="text-lg font-medium mt-1">${quickViewProduct.price.toFixed(2)}</p>
                    </div>
                    <button onClick={closeQuickView} className="text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Couleurs */}
                  {quickViewProduct.colors?.length && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium">Color</h4>
                      <div className="mt-2 flex gap-2">
                        {quickViewProduct.colors.map((color, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer"
                            title={color}
                          >
                            <span className="w-6 h-6 rounded-full" style={{ backgroundColor: color.toLowerCase() }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tailles */}
                  <div className="mt-6">
                    <h4 className="text-sm font-medium">Size</h4>
                    <div className="mt-2 grid grid-cols-5 gap-2">
                      {SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-2 border text-sm ${
                            selectedSize === size
                              ? 'border-black bg-black text-white'
                              : 'border-gray-300 hover:border-gray-700'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Ajouter au panier */}
                  <div className="mt-8">
                    <Button
                      onClick={handleAddToCart}
                      fullWidth
                      size="lg"
                      className="flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={18} /> ADD TO CART
                    </Button>
                  </div>

                  {/* Lien détails */}
                  <div className="mt-4 text-center">
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
