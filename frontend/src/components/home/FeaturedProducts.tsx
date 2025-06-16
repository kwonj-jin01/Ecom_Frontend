import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Product as ProductType } from '../../types';

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  
  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : null;
    
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden group transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        {product.discountPercentage && (
          <div className="absolute top-2 left-2 bg-[#C0392B] text-white text-xs font-bold rounded-full px-2 py-1 z-10">
            {Math.round(product.discountPercentage)}% OFF
          </div>
        )}
        
        <button className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-600 hover:text-[#C0392B] transition-colors z-10">
          <Heart className="h-5 w-5" />
        </button>
        
        <Link to={`/products/${product.id}`} className="block relative overflow-hidden h-48">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
        </Link>
      </div>
      
      <div className="p-4">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1 hover:text-[#1A5276] transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center text-[#F7B955]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current fill-none'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>
        
        <div className="flex items-baseline mb-3">
          <span className="font-bold text-gray-800 text-lg">
            {discountedPrice ? formatPrice(discountedPrice) : formatPrice(product.price)}
          </span>
          {discountedPrice && (
            <span className="text-gray-500 text-sm line-through ml-2">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
          </span>
          
          <button
            onClick={() => addItem(product, 1)}
            className="bg-[#1A5276] hover:bg-[#154360] text-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A5276]"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface FeaturedProductsProps {
  title: string;
  products: ProductType[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ title, products }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">{title}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-block bg-[#F7B955] hover:bg-[#f0a93e] text-gray-900 font-medium py-3 px-6 rounded-full transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;