import React, {
  useState,
  useMemo,
  useEffect,
} from "react";

import { Search, Filter, } from "lucide-react";
import { ProcessedProduct } from "../types";
import { fetchAllProducts } from "../data/products";
import ProductCard from "../components/products/ProductCard";
import { useFavorites } from '../context/FavoriteContext';
import { useCart } from '../context/CartContext';
import LoaderOrError from "../components/ui/LoaderOrError";

type SortOption =
  | "Featured"
  | "Newest"
  | "Price: Low to High"
  | "Price: High to Low"
  | "Rating";

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

const ProductList: React.FC = () => {
  /* ---------- STATES ---------- */
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = React.useState<SortOption>("Featured");
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [displayCount, setDisplayCount] = useState<number>(6);
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set());
  const [priceRange, setPriceRange] = useState<number>(200000);
  const [products, setProducts] = useState<ProcessedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'FITIX - Global B2B Marketplace';
    window.scrollTo(0, 0);

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProducts = await fetchAllProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        console.error('Failed to load products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);



  // Filtered and sorted products
  /* ---------- MÉMOS ---------- */
  const filteredProducts = useMemo<ProcessedProduct[]>(() => {
    const filtered = products.filter((p) => {
      const category = selectedFilter === "All" ||
        p.category === selectedFilter ||
        p.category.toLowerCase().includes(selectedFilter.toLowerCase()); const search = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      // Fix: Vérifier si le produit a des tailles disponibles ou si aucune taille n'est sélectionnée
      const size = selectedSizes.size === 0 || true; // Temporairement simplifié
      const price = p.price <= priceRange;
      return category && search && size && price;
    });

    switch (sortBy) {
      case "Newest":
        filtered.sort((a, b) => Number(b.is_new) - Number(a.is_new));
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
        break;
    }

    return filtered;
  }, [products, selectedFilter, searchTerm, selectedSizes, priceRange, sortBy]);

  const displayedProducts = filteredProducts.slice(0, displayCount);

  const handleAddToCart = (product: ProcessedProduct) => {
    addToCart(product);
  };

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

  // État de chargement
  if (loading || error) {
    return <LoaderOrError loading={loading} error={error} />;
  }


  return (
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
                product={product}
                onToggleFavorite={() => toggleFavorite(product.id)}
                onAddToCart={() => handleAddToCart(product)}
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

          {filteredProducts.length === 0 && !loading && (
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
  );
};

export default ProductList;