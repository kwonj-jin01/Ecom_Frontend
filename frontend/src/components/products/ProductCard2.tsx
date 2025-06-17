import { Heart, Star, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  promotion?: string;
  isOnSale?: boolean;
  discount?: number;
  season: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  getPromotionColor: (promotion: string) => string;
}

const ProductCard2: React.FC<ProductCardProps> = ({ product, getPromotionColor }) => {
  return (
    <Link to={`/products/${product.id}`} className="group cursor-pointer block">
      <div className="relative overflow-hidden rounded-2xl bg-black/5 aspect-[4/5] mb-4 border-2 border-transparent group-hover:border-green-500 transition-all duration-300">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              OUT OF STOCK
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3 left-3 flex items-start justify-between">
          {/* Promotion Badges */}
          <div className="flex flex-col gap-2">
            {product.promotion && (
              <span className={`${getPromotionColor(product.promotion)} text-white px-2 py-1 rounded-full text-xs font-bold tracking-wide shadow-lg`}>
                {product.promotion}
              </span>
            )}
            {product.isOnSale && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Season & Heart */}
          <div className="flex flex-col items-end gap-2">
            <span className="bg-white text-gray-700 px-2 py-1 rounded-full text-xs font-bold tracking-wide shadow-lg">
              {product.season}
            </span>
            <button className="w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full hover:bg-green-500 hover:text-white transition-all duration-300 shadow-lg flex items-center justify-center group/heart">
              <Heart className="w-4 h-4 text-gray-700 group-hover/heart:text-white" />
            </button>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Product Info */}
        <div className="absolute bottom-2 right-2 left-2 bg-white rounded-xl p-3 shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-green-200">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-black text-sm mb-1 truncate">{product.name}</h3>
              <div className="flex items-center mb-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs text-gray-600 ml-1">
                  {product.rating} ({product.reviews})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-green-600 text-sm font-bold">
                  ${product.price.toFixed(2)}
                </p>
                {product.isOnSale && (
                  <p className="text-gray-400 text-xs line-through">
                    ${product.originalPrice.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
            <div className="bg-green-500 p-2 rounded-full group-hover:bg-black transition-colors duration-300 ml-2">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard2;
