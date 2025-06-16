import React, { useState } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';

interface ProductGridProps {
  title: string;
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ title, products }) => {

  const { addToCart } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('M');

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setSelectedSize('M');
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const handleAddToCart = () => {
    if (quickViewProduct) {
      addToCart(quickViewProduct, selectedSize);
      closeQuickView();
    }
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <section className=" py-8 px-4 ">
      {/* Custom scrollbar styles */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <h1 className="italic text-2xl font-bold tracking-widest text-gray-800 uppercase">
          </h1>
          <h2 className="text-4xl font-bold text-black leading-tight">
            <span className="italic text-black">
              {title}
            </span>
          </h2>
        </div>


      </div>
      {/* Product Grid */}
      <div className="flex overflow-x-auto space-x-8 pb-4 scrollbar-hide">
        {products.map((product) => (
          <div key={product.id} className="group flex-shrink-0 w-64">
            {/* Product Image Container */}
            <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 mb-4">
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[300px] object-cover object-center group-hover:opacity-0 transition-opacity duration-300"
                />
                <img
                  src={product.hoverImage || product.image}
                  alt={`${product.name} hover`}
                  className="w-full h-[300px] object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                {/* Quick shop buttons */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-90 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button
                    onClick={() => handleQuickView(product)}
                    className="w-full py-2 bg-black text-white font-medium text-sm hover:bg-gray-800 transition duration-200"
                  >
                    ADD
                  </button>
                </div>

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isNew && (
                    <span className="bg-black text-white px-2 py-1 text-xs font-medium">
                      NEW
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="bg-white text-black px-2 py-1 text-xs font-medium">
                      BEST SELLER
                    </span>
                  )}
                </div>

                {/* Wishlist */}
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Heart size={16} />
                </button>
              </div>
            </div>

            {/* Product info */}
            <div className="mt-4">
              <h3 className="text-sm font-medium">{product.name}</h3>
              <p className="text-sm font-medium mt-1">${product.price.toFixed(2)}</p>

              {/* Color options */}
              <div className="mt-2 flex gap-1">
                {product.colors.map((color, idx) => (
                  <div
                    key={idx}
                    className="w-3 h-3 rounded-full border border-gray-300"
                    style={{
                      backgroundColor: color.toLowerCase(),
                      borderColor: color.toLowerCase() === 'white' ? '#e5e5e5' : 'transparent'
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeQuickView}></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="flex flex-col md:flex-row">
                {/* Product Image */}
                <div className="md:w-1/2 bg-gray-100">
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Product Details */}
                <div className="md:w-1/2 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium" id="modal-title">{quickViewProduct.name}</h3>
                      <p className="text-lg font-medium mt-1">${quickViewProduct.price.toFixed(2)}</p>
                    </div>
                    <button onClick={closeQuickView} className="text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Color options */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium">Color</h4>
                    <div className="mt-2 flex gap-2">
                      {quickViewProduct.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer"
                          title={color}
                        >
                          <span
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: color.toLowerCase() }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Size selection */}
                  <div className="mt-6">
                    <h4 className="text-sm font-medium">Size</h4>
                    <div className="mt-2 grid grid-cols-5 gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-2 border ${selectedSize === size
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 hover:border-gray-700'
                            }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Add to cart button */}
                  <div className="mt-8">
                    <Button
                      onClick={handleAddToCart}
                      fullWidth
                      size="lg"
                      className="flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={18} />
                      ADD TO CART
                    </Button>
                  </div>

                  {/* View product details */}
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
}

export default ProductGrid;