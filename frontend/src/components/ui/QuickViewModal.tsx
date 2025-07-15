// components/ui/QuickViewModal.tsx
import React, { useState } from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import { ProcessedProduct } from '../../types';
import Button from './Button';

interface QuickViewModalProps {
  product: ProcessedProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: ProcessedProduct, size: string, color: string) => void;
}

// Centralise les tailles disponibles
const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const COLORS = ['Black', 'White', 'Navy', 'Gray'];

const QuickViewModal: React.FC<QuickViewModalProps> = ({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart 
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('Black');

  // Reset selections when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedSize('M');
      setSelectedColor('Black');
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product, selectedSize, selectedColor);
      onClose();
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
          onClick={onClose}
        />

        {/* Contenu */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl w-full">
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-1/2 bg-gray-100">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = product.thumbnail;
                }}
              />
            </div>

            {/* Détails */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-medium" id="modal-title">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-medium">${product.price.toFixed(2)}</span>
                    {product.is_on_sale && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.original_price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Description */}
              <div className="mb-4">
                <p className="text-sm text-gray-700">{product.description}</p>
              </div>

              {/* Promotion */}
              {product.promotion && (
                <div className="mb-4 p-3 bg-green-50 rounded">
                  <p className="text-sm text-green-800">{product.promotion}</p>
                </div>
              )}

              {/* Tailles */}
              <div className="mb-4">
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

              {/* Color selection */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Color</h4>
                <div className="flex gap-2">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1 border text-sm ${selectedColor === color
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-gray-700'
                        }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stock info */}
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  {product.in_stock
                    ? `${product.stock} in stock`
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
                  disabled={!product.in_stock}
                >
                  <ShoppingBag size={18} />
                  {product.in_stock ? 'ADD TO CART' : 'OUT OF STOCK'}
                </Button>
              </div>

              {/* Lien détails */}
              <div className="text-center">
                <a href={`/products/${product.id}`} className="text-sm font-medium underline">
                  View full details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;