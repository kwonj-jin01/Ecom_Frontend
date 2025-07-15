// pages/Home.tsx
import React, { useEffect, useState } from 'react';
import Hero from '../components/home/Hero';
import CollectionSection from '../components/home/CollectionSection';
import ComingSoonCollection from '../components/home/ComingSoonCollection';
import PromoSection from '../components/home/PromoSection';
import ProductGrid from '../components/home/ProductGrid';
import { fetchAllProducts } from '../data/products';
import { ProcessedProduct } from '../types';
import LoaderOrError from '../components/ui/LoaderOrError';

const Home: React.FC = () => {
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

  // Filter products based on API data structure
  const newArrivals = products.filter(product => product.is_new);
  const bestSellers = products.filter(product => product.is_best_seller);
  const onSaleProducts = products.filter(product => product.is_on_sale);

  if (loading || error) {
    return <LoaderOrError loading={loading} error={error} />;
  }

  return (
    <div>
      <Hero />
      <CollectionSection />
      {newArrivals.length > 0 && (
        <ProductGrid title="NOUVELLES SORTIES" products={newArrivals} />
      )}
      {bestSellers.length > 0 && (
        <ProductGrid title="MEILLEURES VENTES" products={bestSellers} />
      )}
      {onSaleProducts.length > 0 && (
        <ProductGrid title="EN PROMOTION" products={onSaleProducts} />
      )}

      <ComingSoonCollection />
      <PromoSection />
    </div>
  );
};

export default Home;