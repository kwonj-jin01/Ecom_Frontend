import { useState } from 'react';
import { Heart, ChevronRight, Search, Filter, X, Menu, Star } from 'lucide-react';
import ProductCard2 from '../products/ProductCard2';

// Mock Data
const products = [
  {
    id: 1,
    name: "ASRV x Equinox Pro Hoodie",
    price: 85.00,
    originalPrice: 120.00,
    image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=400&h=400&fit=crop&crop=center",
    season: "Winter",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Gray", "Green"],
    isOnSale: true,
    discount: 30,
    promotion: "WINTER SALE",
    inStock: true,
    rating: 4.8,
    reviews: 156
  },
  {
    id: 2,
    name: "ASRV Performance T-Shirt",
    price: 45.00,
    originalPrice: 45.00,
    image: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=400&h=400&fit=crop&crop=center",
    season: "Summer",
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Green", "Gray"],
    isOnSale: false,
    discount: 0,
    promotion: null,
    inStock: true,
    rating: 4.5,
    reviews: 89
  },
  {
    id: 3,
    name: "ASRV Training Shorts Pro",
    price: 35.00,
    originalPrice: 50.00,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
    season: "Summer",
    category: "Shorts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Green", "Gray"],
    isOnSale: true,
    discount: 25,
    promotion: "FLASH SALE",
    inStock: true,
    rating: 4.7,
    reviews: 234
  },
  {
    id: 4,
    name: "ASRV Elite Joggers",
    price: 95.00,
    originalPrice: 95.00,
    image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=400&h=400&fit=crop&crop=center",
    season: "Winter",
    category: "Joggers",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Gray"],
    isOnSale: false,
    discount: 0,
    promotion: "NEW ARRIVAL",
    inStock: true,
    rating: 4.9,
    reviews: 67
  },
  {
    id: 5,
    name: "ASRV Muscle Tank",
    price: 25.00,
    originalPrice: 35.00,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
    season: "Summer",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Green"],
    isOnSale: true,
    discount: 20,
    promotion: null,
    inStock: false,
    rating: 4.3,
    reviews: 145
  },
  {
    id: 6,
    name: "ASRV Compression Leggings",
    price: 65.00,
    originalPrice: 90.00,
    image: "https://images.unsplash.com/photo-1583743089695-4b566c1637e8?w=400&h=400&fit=crop&crop=center",
    season: "All Season",
    category: "Accessories",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Gray", "Green"],
    isOnSale: true,
    discount: 35,
    promotion: "BEST SELLER",
    inStock: true,
    rating: 4.6,
    reviews: 312
  },
  {
    id: 7,
    name: "ASRV Track Suit Complete",
    price: 140.00,
    originalPrice: 180.00,
    image: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=400&h=400&fit=crop&crop=center",
    season: "Winter",
    category: "Hoodies",
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Gray"],
    isOnSale: true,
    discount: 25,
    promotion: "BUNDLE DEAL",
    inStock: true,
    rating: 4.8,
    reviews: 98
  },
  {
    id: 8,
    name: "ASRV Workout Zip Hoodie",
    price: 75.00,
    originalPrice: 75.00,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop&crop=center",
    season: "All Season",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Green", "Gray"],
    isOnSale: false,
    discount: 0,
    promotion: null,
    inStock: true,
    rating: 4.4,
    reviews: 203
  },
  {
    id: 9,
    name: "ASRV Cargo Shorts",
    price: 55.00,
    originalPrice: 70.00,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center",
    season: "Summer",
    category: "Shorts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Green", "Gray"],
    isOnSale: true,
    discount: 20,
    promotion: "LIMITED TIME",
    inStock: true,
    rating: 4.2,
    reviews: 87
  },
  {
    id: 10,
    name: "ASRV Seamless Sports Bra",
    price: 40.00,
    originalPrice: 55.00,
    image: "https://images.unsplash.com/photo-1506629905607-96b8d4e9b5a1?w=400&h=400&fit=crop&crop=center",
    season: "All Season",
    category: "Accessories",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Green"],
    isOnSale: true,
    discount: 25,
    promotion: "WOMEN'S SPECIAL",
    inStock: true,
    rating: 4.7,
    reviews: 176
  },
  {
    id: 11,
    name: "ASRV Thermal Long Sleeve",
    price: 60.00,
    originalPrice: 60.00,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
    season: "Winter",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Gray"],
    isOnSale: false,
    discount: 0,
    promotion: null,
    inStock: true,
    rating: 4.5,
    reviews: 134
  },
  {
    id: 12,
    name: "ASRV Crossfit Shorts",
    price: 45.00,
    originalPrice: 65.00,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=400&h=400&fit=crop&crop=center",
    season: "Summer",
    category: "Shorts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Green"],
    isOnSale: true,
    discount: 30,
    promotion: "CROSSFIT SPECIAL",
    inStock: false,
    rating: 4.6,
    reviews: 298
  }
];

const categories = ["Hoodies", "T-Shirts", "Shorts", "Joggers", "Accessories"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const seasons = ["Winter", "Summer", "All Season"];
const priceRanges = [
  { label: "$0 - $25", min: 0, max: 25 },
  { label: "$25 - $50", min: 25, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100+", min: 100, max: Infinity }
];

const WorkoutStore = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    sizes: [],
    seasons: [],
    priceRange: null,
    onSale: false,
    inStock: false
  });

  // Filter products based on search term and filters
  const filteredProducts = products.filter(product => {
    // Search filter
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.season.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.promotion && product.promotion.toLowerCase().includes(searchTerm.toLowerCase()));

    // Category filter
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category);

    // Size filter
    const matchesSize = filters.sizes.length === 0 || product.sizes.some(size => filters.sizes.includes(size));

    // Season filter
    const matchesSeason = filters.seasons.length === 0 || filters.seasons.includes(product.season);

    // Price range filter
    const matchesPrice = !filters.priceRange ||
      (product.price >= filters.priceRange.min && product.price <= filters.priceRange.max);

    // On sale filter
    const matchesOnSale = !filters.onSale || product.isOnSale;

    // In stock filter
    const matchesInStock = !filters.inStock || product.inStock;

    return matchesSearch && matchesCategory && matchesSize && matchesSeason && matchesPrice && matchesOnSale && matchesInStock;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      if (filterType === 'categories' || filterType === 'sizes' || filterType === 'seasons') {
        const currentValues = prev[filterType];
        if (currentValues.includes(value)) {
          return { ...prev, [filterType]: currentValues.filter(v => v !== value) };
        } else {
          return { ...prev, [filterType]: [...currentValues, value] };
        }
      } else if (filterType === 'priceRange') {
        return { ...prev, priceRange: prev.priceRange?.label === value.label ? null : value };
      } else {
        return { ...prev, [filterType]: !prev[filterType] };
      }
    });
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      sizes: [],
      seasons: [],
      priceRange: null,
      onSale: false,
      inStock: false
    });
    setSearchTerm('');
  };

  const getPromotionColor = (promotion) => {
    switch (promotion) {
      case 'WINTER SALE': return 'bg-blue-500';
      case 'FLASH SALE': return 'bg-red-500';
      case 'NEW ARRIVAL': return 'bg-purple-500';
      case 'BEST SELLER': return 'bg-yellow-500';
      case 'BUNDLE DEAL': return 'bg-orange-500';
      case 'LIMITED TIME': return 'bg-pink-500';
      case 'WOMEN\'S SPECIAL': return 'bg-purple-500';
      case 'CROSSFIT SPECIAL': return 'bg-indigo-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm">
        <div className="flex justify-between items-center p-4">
          <span className="text-sm text-green-600 font-bold tracking-wide">NEW ARRIVAL</span>
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="border-t border-gray-200 p-4 space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full font-medium hover:bg-black transition-colors duration-300 shadow-lg flex-1 justify-center"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <span className="text-sm text-gray-700 font-medium flex items-center px-4">ALL BRANDS</span>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Desktop Header */}
        <div className="hidden lg:flex justify-between items-center mb-8">
          <span className="text-sm text-green-600 font-bold tracking-wide">NEW ARRIVAL</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-medium hover:bg-black transition-colors duration-300 shadow-lg"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <span className="text-sm text-gray-700 font-medium">ALL BRANDS</span>
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-black leading-tight px-4">
            FRESH FITS FOR <span className="text-green-500">YOUR</span>
            <br />
            <span className="text-gray-600">NEXT</span> <span className="text-green-500">WORKOUT!</span>
          </h1>
          <div className="w-16 sm:w-20 lg:w-24 h-1 bg-green-500 mx-auto mt-4 lg:mt-6 rounded-full"></div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 lg:mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, categories, or seasons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-lg border border-gray-200 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-gray-700 placeholder-gray-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 lg:p-6 mb-6 lg:mb-8 animate-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-center mb-4 lg:mb-6">
              <h2 className="text-lg lg:text-xl font-bold text-black">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {/* Category Filter */}
              <div>
                <h3 className="font-bold text-black mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center text-sm lg:text-base">
                      <input
                        type="checkbox"
                        className="mr-2 text-green-500 focus:ring-green-500 rounded"
                        checked={filters.categories.includes(category)}
                        onChange={() => handleFilterChange('categories', category)}
                      />
                      <span className="text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <h3 className="font-bold text-black mb-3">Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleFilterChange('sizes', size)}
                      className={`border-2 rounded-lg py-2 px-2 lg:px-3 text-xs lg:text-sm font-medium transition-colors ${filters.sizes.includes(size)
                        ? 'border-green-500 text-green-500 bg-green-50'
                        : 'border-gray-300 hover:border-green-500 hover:text-green-500'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-bold text-black mb-3">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((price) => (
                    <label key={price.label} className="flex items-center text-sm lg:text-base">
                      <input
                        type="radio"
                        name="price"
                        className="mr-2 text-green-500 focus:ring-green-500"
                        checked={filters.priceRange?.label === price.label}
                        onChange={() => handleFilterChange('priceRange', price)}
                      />
                      <span className="text-gray-700">{price.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Season & Other Filters */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-black mb-3">Season</h3>
                  <div className="space-y-2">
                    {seasons.map((season) => (
                      <label key={season} className="flex items-center text-sm lg:text-base">
                        <input
                          type="checkbox"
                          className="mr-2 text-green-500 focus:ring-green-500 rounded"
                          checked={filters.seasons.includes(season)}
                          onChange={() => handleFilterChange('seasons', season)}
                        />
                        <span className="text-gray-700">{season}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm lg:text-base">
                    <input
                      type="checkbox"
                      className="mr-2 text-green-500 focus:ring-green-500 rounded"
                      checked={filters.onSale}
                      onChange={() => handleFilterChange('onSale')}
                    />
                    <span className="text-gray-700">On Sale</span>
                  </label>
                  <label className="flex items-center text-sm lg:text-base">
                    <input
                      type="checkbox"
                      className="mr-2 text-green-500 focus:ring-green-500 rounded"
                      checked={filters.inStock}
                      onChange={() => handleFilterChange('inStock')}
                    />
                    <span className="text-gray-700">In Stock</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 lg:mt-6 pt-4 lg:pt-6 border-t border-gray-200 gap-4">
              <button
                onClick={clearAllFilters}
                className="text-gray-600 font-medium hover:text-black transition-colors"
              >
                Clear All
              </button>
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 sm:flex-none px-6 py-2 border-2 border-gray-300 rounded-full font-medium hover:border-black hover:text-black transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 sm:flex-none px-6 py-2 bg-green-500 text-white rounded-full font-medium hover:bg-black transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Results Info */}
        {(searchTerm || Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f)) && (
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
              {searchTerm && <span className="font-bold text-green-600"> for "{searchTerm}"</span>}
            </p>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard2 key={product.id} product={product} getPromotionColor={getPromotionColor} />

            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
              <button
                onClick={clearAllFilters}
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded-full font-medium hover:bg-black transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutStore;