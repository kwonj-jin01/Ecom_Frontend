import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, Share2, ShoppingCart, Check, ArrowLeft, ArrowRight, Truck, Shield, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import QuantitySelector from '../components/shared/QuantitySelector';
import { featuredProducts, trendingProducts } from '../data/mockData';
import ProductCard from '../components/products/ProductCard';
import { Product } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  
  // Combine all products for this demo
  const allProducts = [...featuredProducts, ...trendingProducts];
  
  // Find the selected product
  const product = allProducts.find(p => p.id === id);
  
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  
  const relatedProducts = allProducts
    .filter(p => p.category === product?.category && p.id !== id)
    .slice(0, 4);
  
  useEffect(() => {
    if (product) {
      document.title = `${product.title} - Chance Baaba`;
    }
    window.scrollTo(0, 0);
  }, [product]);
  
  const nextImage = () => {
    if (product) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };
  
  const prevImage = () => {
    if (product) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    }
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">Sorry, the product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="bg-[#1A5276] text-white py-2 px-6 rounded-md hover:bg-[#154360] transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }
  
  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : null;

  return (
    <div className="pt-20 bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-[#1A5276]">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 hover:text-[#1A5276]">Products</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="text-gray-500 hover:text-[#1A5276]">
              {product.category}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700 truncate max-w-[150px]">{product.title}</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div className="relative">
              {product.discountPercentage && (
                <div className="absolute top-4 left-4 bg-[#C0392B] text-white text-sm font-bold rounded-full px-3 py-1 z-10">
                  {Math.round(product.discountPercentage)}% OFF
                </div>
              )}
              
              <div
                className={`relative overflow-hidden rounded-lg h-96 flex items-center justify-center bg-gray-100 cursor-zoom-in ${
                  isImageZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsImageZoomed(!isImageZoomed)}
              >
                <img
                  src={product.images[currentImageIndex] || product.thumbnail}
                  alt={product.title}
                  className={`${
                    isImageZoomed
                      ? 'scale-150 transition-transform duration-300'
                      : 'transition-transform duration-300'
                  } max-h-full max-w-full object-contain`}
                />
              </div>
              
              {/* Image controls */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={prevImage}
                  className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                  aria-label="Previous image"
                >
                  <ArrowLeft size={20} />
                </button>
                
                <div className="flex space-x-2 overflow-x-auto py-2 px-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-16 w-16 rounded border-2 overflow-hidden flex-shrink-0 ${
                        currentImageIndex === index ? 'border-[#1A5276]' : 'border-transparent'
                      }`}
                    >
                      <img src={image} alt={`${product.title} view ${index + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={nextImage}
                  className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                  aria-label="Next image"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center text-[#F7B955]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current fill-none'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">{product.rating} out of 5</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-sm text-gray-500">
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
                
                <div className="flex items-baseline mb-6">
                  {discountedPrice ? (
                    <>
                      <span className="text-3xl font-bold text-gray-800">
                        {formatPrice(discountedPrice)}
                      </span>
                      <span className="text-xl text-gray-500 line-through ml-3">
                        {formatPrice(product.price)}
                      </span>
                      <span className="ml-3 bg-[#F7B955]/10 text-[#C0392B] text-sm font-semibold px-2 py-1 rounded">
                        Save {Math.round(product.discountPercentage)}%
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-gray-800">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-700 mb-6">{product.description}</p>
                
                <div className="border-t border-b py-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-500 text-sm">Brand</span>
                      <p className="font-medium">{product.brand}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Category</span>
                      <p className="font-medium">{product.category}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Add to cart section */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <span className="text-gray-700 mr-4">Quantity:</span>
                  <QuantitySelector 
                    quantity={quantity} 
                    onChange={setQuantity} 
                    max={product.stock} 
                  />
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => addItem(product, quantity)}
                    className="flex-1 bg-[#1A5276] hover:bg-[#154360] text-white py-3 px-6 rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A5276] flex items-center justify-center"
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </button>
                  
                  <button
                    className="bg-white border border-gray-300 p-3 rounded-full hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A5276]"
                    aria-label="Add to favorites"
                  >
                    <Heart className="h-5 w-5 text-gray-700" />
                  </button>
                  
                  <button
                    className="bg-white border border-gray-300 p-3 rounded-full hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A5276]"
                    aria-label="Share product"
                  >
                    <Share2 className="h-5 w-5 text-gray-700" />
                  </button>
                </div>
              </div>
              
              {/* Shipping info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <Truck className="h-5 w-5 text-[#1A5276] mr-2" />
                  <span className="font-medium">Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center mb-3">
                  <Shield className="h-5 w-5 text-[#1A5276] mr-2" />
                  <span className="font-medium">Buyer protection guaranteed</span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-[#1A5276] mr-2" />
                  <span className="font-medium">Secure payment processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product details tabs */}
        <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b">
            <div className="container mx-auto px-6">
              <div className="flex overflow-x-auto">
                <button className="py-4 px-6 border-b-2 border-[#1A5276] text-[#1A5276] font-medium whitespace-nowrap">
                  Description
                </button>
                <button className="py-4 px-6 text-gray-500 font-medium hover:text-gray-700 whitespace-nowrap">
                  Specifications
                </button>
                <button className="py-4 px-6 text-gray-500 font-medium hover:text-gray-700 whitespace-nowrap">
                  Reviews
                </button>
                <button className="py-4 px-6 text-gray-500 font-medium hover:text-gray-700 whitespace-nowrap">
                  Shipping & Returns
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="prose max-w-none">
              <h2>Product Description</h2>
              <p>{product.description}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              
              <h3>Key Features</h3>
              <ul>
                <li>High quality materials and construction</li>
                <li>Innovative design with attention to detail</li>
                <li>Multiple functionalities for everyday use</li>
                <li>Durable and long-lasting performance</li>
                <li>Easy maintenance and care</li>
              </ul>
              
              <h3>Specifications</h3>
              <ul>
                <li><strong>Brand:</strong> {product.brand}</li>
                <li><strong>Category:</strong> {product.category}</li>
                <li><strong>Warranty:</strong> 1 Year Manufacturer Warranty</li>
                <li><strong>Rating:</strong> {product.rating} out of 5</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;