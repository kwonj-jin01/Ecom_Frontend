import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid3X3, List, X, Check } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { featuredProducts, trendingProducts, categories } from '../data/mockData';
import { Product } from '../types';
import WorkoutStore from '../components/products/ProductCard';

const ProductList: React.FC = () => {
  // Combine all products for this demo
  const allProducts = [...featuredProducts, ...trendingProducts];
  
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  
  // Filter values
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  
  useEffect(() => {
    // Set page title
    document.title = 'Product Catalog - Chance Baaba';
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Apply any URL filters
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    if (category) {
      setSelectedCategories([category]);
    }
    
    // Apply filters
    filterProducts({ category, search });
  }, [searchParams]);
  
  const filterProducts = ({ category, search }: { category?: string | null; search?: string | null }) => {
    let filtered = allProducts;
    
    // Category filter from URL
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    
    // Search filter from URL
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchLower) || 
        product.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply selected categories if any
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }
    
    // Apply price filter
    filtered = filtered.filter(product => {
      const effectivePrice = product.discountPercentage
        ? product.price * (1 - product.discountPercentage / 100)
        : product.price;
        
      return effectivePrice >= priceRange.min && effectivePrice <= priceRange.max;
    });
    
    // Apply rating filter
    if (selectedRatings.length > 0) {
      filtered = filtered.filter(product => 
        selectedRatings.includes(Math.floor(product.rating))
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // In a real app, would sort by date
        break;
      default:
        // featured - keep original order
        break;
    }
    
    setFilteredProducts(filtered);
  };
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  
  const toggleRating = (rating: number) => {
    setSelectedRatings(prev => {
      if (prev.includes(rating)) {
        return prev.filter(r => r !== rating);
      } else {
        return [...prev, rating];
      }
    });
  };
  
  // Apply filters when filter values change
  useEffect(() => {
    filterProducts({});
  }, [selectedCategories, selectedRatings, priceRange, sortBy]);

  return (
    <div className="bg-gray-50 pt-20">
      {/* <WorkoutStore /> */}
      {/* Page header */}
      <div className="bg-[#1A5276] text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Product Catalog</h1>
          {searchParams.get('search') && (
            <p className="text-gray-200">
              Search results for: "{searchParams.get('search')}"
            </p>
          )}
          {searchParams.get('category') && (
            <p className="text-gray-200">
              Category: {searchParams.get('category')}
            </p>
          )}
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="w-full md:w-64 lg:w-72 hidden md:block">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="border-b pb-4 mb-4">
                <h3 className="font-bold text-gray-800 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.name)}
                        onChange={() => toggleCategory(category.name)}
                        className="h-4 w-4 text-[#1A5276] focus:ring-[#1A5276] border-gray-300 rounded"
                      />
                      <label htmlFor={`category-${category.id}`} className="ml-2 text-gray-700">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-b pb-4 mb-4">
                <h3 className="font-bold text-gray-800 mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={e => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                      className="w-24 p-2 border border-gray-300 rounded"
                      min="0"
                    />
                    <span className="mx-2">to</span>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={e => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                      className="w-24 p-2 border border-gray-300 rounded"
                      min="0"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange.max}
                    onChange={e => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-800 mb-4">Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <div key={rating} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`rating-${rating}`}
                        checked={selectedRatings.includes(rating)}
                        onChange={() => toggleRating(rating)}
                        className="h-4 w-4 text-[#1A5276] focus:ring-[#1A5276] border-gray-300 rounded"
                      />
                      <label htmlFor={`rating-${rating}`} className="ml-2 flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${i < rating ? 'text-[#F7B955] fill-current' : 'text-gray-300'}`}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.99999 14.9467L4.40834 17.7733L5.42499 11.56L0.850006 7.22666L7.20001 6.42666L10 0.773331L12.8 6.42666L19.15 7.22666L14.575 11.56L15.5917 17.7733L9.99999 14.9467Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ))}
                        <span className="ml-1 text-gray-600">{rating}+</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="md:hidden flex items-center text-gray-700 hover:text-[#1A5276]"
              >
                <Filter size={18} className="mr-1" />
                Filters
              </button>
              
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">
                  {filteredProducts.length} results
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2 whitespace-nowrap">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="border-gray-300 rounded p-1.5 text-sm focus:ring-[#1A5276] focus:border-[#1A5276]"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
                
                <div className="hidden md:flex border rounded overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${
                      viewMode === 'grid'
                        ? 'bg-[#1A5276] text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid3X3 size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${
                      viewMode === 'list'
                        ? 'bg-[#1A5276] text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                    aria-label="List view"
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-gray-600 mb-4">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedRatings([]);
                    setPriceRange({ min: 0, max: 1000 });
                  }}
                  className="text-[#1A5276] hover:text-[#C0392B] font-medium"
                >
                  Clear all filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm p-4 flex flex-col md:flex-row gap-4"
                  >
                    <div className="relative w-full md:w-48 h-40">
                      {product.discountPercentage && (
                        <div className="absolute top-2 left-2 bg-[#C0392B] text-white text-xs font-bold rounded-full px-2 py-1 z-10">
                          {Math.round(product.discountPercentage)}% OFF
                        </div>
                      )}
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center text-[#F7B955]">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current fill-none'
                              }`}
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.99999 14.9467L4.40834 17.7733L5.42499 11.56L0.850006 7.22666L7.20001 6.42666L10 0.773331L12.8 6.42666L19.15 7.22666L14.575 11.56L15.5917 17.7733L9.99999 14.9467Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                      </div>
                      <div className="flex flex-wrap justify-between items-end mt-auto">
                        <div>
                          <div className="flex items-baseline">
                            <span className="font-bold text-gray-800 text-xl">
                              ${product.discountPercentage
                                ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
                                : product.price.toFixed(2)}
                            </span>
                            {product.discountPercentage && (
                              <span className="text-gray-500 text-sm line-through ml-2">
                                ${product.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">
                            {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
                          </span>
                        </div>
                        <div className="flex space-x-2 mt-2 md:mt-0">
                          <button
                            className="border border-[#1A5276] text-[#1A5276] hover:bg-[#1A5276] hover:text-white px-3 py-1.5 rounded-md transition-colors text-sm font-medium"
                            aria-label="View product details"
                          >
                            View Details
                          </button>
                          <button
                            className="bg-[#1A5276] text-white hover:bg-[#154360] px-3 py-1.5 rounded-md transition-colors text-sm font-medium"
                            aria-label="Add to cart"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile filters drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-lg p-4 transform transition-transform">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="font-bold text-lg">Filters</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="overflow-y-auto h-[calc(100%-60px)]">
              <div className="border-b pb-4 mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Categories</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`mobile-category-${category.id}`}
                        checked={selectedCategories.includes(category.name)}
                        onChange={() => toggleCategory(category.name)}
                        className="h-4 w-4 text-[#1A5276] focus:ring-[#1A5276] border-gray-300 rounded"
                      />
                      <label htmlFor={`mobile-category-${category.id}`} className="ml-2 text-gray-700">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-b pb-4 mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Price Range</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={e => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                      className="w-24 p-2 border border-gray-300 rounded"
                      min="0"
                    />
                    <span className="mx-2">to</span>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={e => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                      className="w-24 p-2 border border-gray-300 rounded"
                      min="0"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange.max}
                    onChange={e => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Rating</h4>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <div key={rating} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`mobile-rating-${rating}`}
                        checked={selectedRatings.includes(rating)}
                        onChange={() => toggleRating(rating)}
                        className="h-4 w-4 text-[#1A5276] focus:ring-[#1A5276] border-gray-300 rounded"
                      />
                      <label htmlFor={`mobile-rating-${rating}`} className="ml-2 flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${i < rating ? 'text-[#F7B955] fill-current' : 'text-gray-300'}`}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.99999 14.9467L4.40834 17.7733L5.42499 11.56L0.850006 7.22666L7.20001 6.42666L10 0.773331L12.8 6.42666L19.15 7.22666L14.575 11.56L15.5917 17.7733L9.99999 14.9467Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ))}
                        <span className="ml-1 text-gray-600">{rating}+</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t mt-4 flex gap-2">
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedRatings([]);
                  setPriceRange({ min: 0, max: 1000 });
                }}
                className="flex-1 py-2 border border-gray-300 rounded-md text-gray-700 font-medium"
              >
                Reset
              </button>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="flex-1 py-2 bg-[#1A5276] text-white rounded-md font-medium flex items-center justify-center"
              >
                <Check size={16} className="mr-1" />
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;