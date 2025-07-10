import { Heart, Plus } from "lucide-react";
import { ProcessedProduct } from '../../types';
import { Link } from "react-router-dom";
import { useState } from "react";

interface ProductCardProps {
  product: ProcessedProduct;
  onAddToCart: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="group relative bg-transparent overflow-hidden transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        <Link to={`/products/${product.id}`}>
          <img
            src={isHovered && product.hover_image ? product.hover_image : product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Fallback en cas d'erreur de chargement d'image
              const target = e.target as HTMLImageElement;
              target.src = product.thumbnail || '/placeholder-image.jpg';
            }}
          />
        </Link>

        {/* Heart Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm z-10"
        >
          <Heart
            className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
          />
        </button>

        {/* Out of Stock Overlay */}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}

        {/* Info Gradient */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 rounded-b-2xl">
          <div className="text-white">
            <p className="text-xs text-gray-300 mb-1">{product.category_id}</p>
            <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h3>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">${product.price}</span>
                {product.is_on_sale && product.original_price && product.original_price > product.price && (
                  <span className="text-xs text-gray-300 line-through">
                    ${product.original_price.toFixed(2)}
                  </span>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart();
                }}
                disabled={!product.in_stock}
                className={`p-2 rounded-full transition-colors z-10 ${product.in_stock
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Badges (Sale, Promotion, New, Best Seller) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.is_new && (
            <div className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
              NEW
            </div>
          )}
          {product.is_best_seller && (
            <div className="bg-yellow-500 text-black text-xs font-semibold px-2 py-1 rounded">
              Best Seller
            </div>
          )}
          {product.promotion && (
            <div className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              {product.promotion}
            </div>
          )}
          {product.is_on_sale && product.discount && product.discount > 0 && (
            <div className="bg-black text-white text-xs font-semibold px-2 py-1 rounded">
              -{product.discount}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;