import React, {
  useState,
  useMemo,

} from "react";
import {
  Search,
  Menu,
  Heart,
  ShoppingBag,
  Filter,
  X,
  Plus,
  Minus,
} from "lucide-react";
import { Product } from "../types";
import { allProducts } from "../data/products";
import ProductCard from "../components/products/ProductCard";

/** ---- Types d’appoint ---- */
interface CartItem extends Product {
  quantity: number;
}

type CartDropdownProps = {
  isOpen: boolean;
  onClose: () => void;
};
type SortOption =
  | "Featured"
  | "Newest"
  | "Price: Low to High"
  | "Price: High to Low"
  | "Rating";
/** ---- Bandeau supérieur simplifié ---- */
const WorkoutStore = () => (
  <div className="bg-black text-white py-2 px-4 text-center">
    <p className="text-sm">
      Free shipping on orders over $75&nbsp;|&nbsp;30‑day returns
    </p>
  </div>
);

const ProductList: React.FC = () => {
  /* ---------- STATES ---------- */
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = React.useState<SortOption>("Featured");
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [displayCount, setDisplayCount] = useState<number>(6);
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set());
  const [priceRange, setPriceRange] = useState<number>(200);


  /* ---------- CONSTANTES ---------- */
  const filters = [
    "All",
    "Jackets",
    "Sports Bras",
    "Leggings",
    "Hoodies",
    "T-Shirts",
    "Tank Tops",
    "Shorts",
  ] as const;

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Filtered and sorted products
  /* ---------- MÉMOS ---------- */
  const filteredProducts = useMemo<Product[]>(() => {
    const filtered = allProducts.filter((p) => {
      const category = selectedFilter === "All" || p.category === selectedFilter;
      const search = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const size =
        selectedSizes.size === 0 ||
        [...selectedSizes].some((s) => p.sizes?.includes(s));
      const price = p.price <= priceRange;
      return category && search && size && price;
    });

    switch (sortBy) {
      case "Newest":
        filtered.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      case "Price: Low to High":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "Rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break; // Featured → ordre original
    }
    return filtered;
  }, [selectedFilter, searchTerm, selectedSizes, priceRange, sortBy]);

  const displayedProducts = filteredProducts.slice(0, displayCount);

  /* ---------- HANDLERS ---------- */
  const toggleFavorite = (productId: string) =>
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }

      return next;
    });

  const addToCart = (product: Product) =>
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);
      return found
        ? prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
        : [...prev, { ...product, quantity: 1 }];
    });

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (id: string, q: number) =>
    setCart((prev) =>
      q === 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, quantity: q } : i))
    );

  const toggleSize = (size: string) =>
    setSelectedSizes((prev) => {
      const next = new Set(prev);
      if (next.has(size)) {
        next.delete(size);
      } else {
        next.add(size);
      }
      return next;
    });

  const loadMore = () => {
    setDisplayCount(prev => prev + 6);
  };

  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalCartPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };



  const CartDropdown = ({ isOpen, onClose }: CartDropdownProps) => {
    if (!isOpen) return null;

    return (
      <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Shopping Cart</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="max-h-64 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Your cart is empty
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="p-4 border-b border-gray-100 flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1 hover:bg-gray-100 rounded text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold">Total: ${getTotalCartPrice().toFixed(2)}</span>
            </div>
            <button className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <WorkoutStore />
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="text-2xl font-bold">
                <div className="text-black text-2xl font-bold">ASRV</div>
              </div>

              <nav className="hidden md:flex items-center gap-8">
                <a href="#" className="text-gray-900 hover:text-black font-medium transition-colors">New & Featured</a>
                <a href="#" className="text-gray-900 hover:text-black font-medium transition-colors">Men</a>
                <a href="#" className="text-gray-900 hover:text-black font-medium transition-colors">Women</a>
                <a href="#" className="text-gray-900 hover:text-black font-medium transition-colors">Kids</a>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-64">
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent outline-none flex-1 text-sm"
                />
              </div>

              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                  <Heart className="w-5 h-5" />
                  {favorites.size > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {favorites.size}
                    </span>
                  )}
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowCart(!showCart)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {getTotalCartItems() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {getTotalCartItems()}
                      </span>
                    )}
                  </button>
                  <CartDropdown isOpen={showCart} onClose={() => setShowCart(false)} />
                </div>
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Mobile Search */}
        <div className="md:hidden mb-4">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none flex-1 text-sm"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Sidebar Filters */}
          <aside className={`${showMobileFilters ? 'block' : 'hidden'} lg:block lg:w-64 space-y-6`}>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Clothing</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {filters.map((filter) => (
                      <label key={filter} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="filter"
                          value={filter}
                          checked={selectedFilter === filter}
                          onChange={(e) => setSelectedFilter(e.target.value)}
                          className="w-4 h-4 text-black"
                        />
                        <span className="text-sm text-gray-700 hover:text-black transition-colors">
                          {filter}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Size</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`border rounded-lg py-2 px-3 text-sm transition-colors ${selectedSizes.has(size)
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-black'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>$0</span>
                      <span>${priceRange}+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="hidden sm:flex items-center justify-between mb-8">
              <p className="text-gray-600">
                Showing {displayedProducts.length} of {filteredProducts.length} results
              </p>

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black"
                >
                  <option>Featured</option>
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>

            {/* Mobile Title */}
            <div className="sm:hidden mb-4">
              <h1 className="text-xl font-bold text-gray-900">Clothing</h1>
              <p className="text-sm text-gray-600">
                {displayedProducts.length} of {filteredProducts.length} results
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-8">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{ ...product, inStock: true }} // Ajout de inStock
                  onToggleFavorite={toggleFavorite}
                  onAddToCart={addToCart}
                  isFavorite={favorites.has(product.id)}
                />
              ))}
            </div>

            {/* Load More */}
            {displayCount < filteredProducts.length && (
              <div className="text-center mt-12">
                <button
                  onClick={loadMore}
                  className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
                >
                  Load More Products ({filteredProducts.length - displayCount} remaining)
                </button>
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedFilter('All');
                    setSearchTerm('');
                    setSelectedSizes(new Set());
                    setPriceRange(200);
                  }}
                  className="mt-4 text-black underline hover:no-underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductList;