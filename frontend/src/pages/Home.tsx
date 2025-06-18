import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import CollectionSection from '../components/home/CollectionSection';
import ComingSoonCollection from '../components/home/ComingSoonCollection';
import PromoSection from '../components/home/PromoSection';
import ProductGrid from '../components/home/ProductGrid';
import { allProducts } from '../data/products';

const Home: React.FC = () => {
  useEffect(() => {
    // Update page title
    document.title = 'Chance Baaba - Global B2B Marketplace';

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  const featuredProducts = allProducts.filter(product => product.isNew || product.bestSeller);

  return (
    <div>

      <Hero />
      <CollectionSection />
      <ProductGrid title="NEW ARRIVALS" products={featuredProducts} />
      <ProductGrid title="BEST SELLERS" products={featuredProducts} />
      <ComingSoonCollection />
      <PromoSection />
    </div>
  );
};

export default Home;