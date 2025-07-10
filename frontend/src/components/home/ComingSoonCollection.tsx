import  { useState } from 'react';

export default function ComingSoonCollection() {
  const [showAll, setShowAll] = useState(false);

  const products = [
    {
      name: "Power Zip Hoodie",
      date: "2024, 12 March",
      image: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg",
    },
    {
      name: "Raise The Bar T-Shirt",
      date: "2024, 20 May",
      image: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg"
    },
    {
      name: "Raise The Bar Hoodie",
      date: "2024, 9 June",
      image: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg"
    },
    {
      name: "Sleek Backpack",
      date: "2024, 12 September",
      image: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg"
    },
    {
      name: "Everyday Tote",
      date: "2024, 24 July",
      image: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg"
    },
    {
      name: "Pursuit Backpack",
      date: "2024, 11 October",
      image: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg"
    },
  ];

  // Fonction pour déterminer combien de produits afficher
  const getVisibleProducts = () => {
    if (showAll) {
      return products;
    }
    // Sur mobile/tablette (< lg), afficher seulement 2 produits (première ligne)
    // Sur desktop (>= lg), afficher tous les produits
    return products.slice(0, 2);
  };

  const visibleProducts = getVisibleProducts();
  const hasMoreProducts = products.length > 2;

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-8 sm:mb-12 lg:mb-16 gap-6 lg:gap-12">
          <div className="flex-1 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
              Introducing Our <br className="hidden sm:block" />
              <span className="text-green-500">Exclusive Coming Soon</span>
              <span className="italic text-gray-400 block sm:inline"> Collection</span>
            </h2>
          </div>

          <div className="flex-1 max-w-xl">
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Embark on a journey into the future of fitness fashion with our highly
              anticipated "Coming Soon" collection. Get ready to elevate your workout
              style with premium designs that blend functionality and fashion seamlessly.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-6 sm:mb-8 flex items-center gap-4">
          <h4 className="uppercase text-xs sm:text-sm font-bold text-gray-500 whitespace-nowrap">
            List Product.
          </h4>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {/* Sur desktop, afficher tous les produits */}
          <div className="hidden lg:contents">
            {products.map((item, index) => (
              <div
                key={index}
                className="group flex items-center bg-white border border-gray-200 hover:border-green-500 rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="ml-2 flex-shrink-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <div className="flex-1 p-3 sm:p-4 lg:p-5 min-w-0">
                  <h5 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg mb-1 truncate group-hover:text-gray-700 transition-colors">
                    {item.name}
                  </h5>
                  <p className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
                    {item.date}
                  </p>

                  <div className="mt-2 inline-flex items-center">
                    <span className="border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white text-xs px-2 py-1 rounded-full font-medium">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sur mobile/tablette, afficher selon l'état showAll */}
          <div className="lg:hidden contents">
            {visibleProducts.map((item, index) => (
              <div
                key={index}
                className="group flex items-center bg-white border border-gray-200 hover:border-green-500 rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="ml-2 flex-shrink-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <div className="flex-1 p-3 sm:p-4 min-w-0">
                  <h5 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 truncate group-hover:text-gray-700 transition-colors">
                    {item.name}
                  </h5>
                  <p className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
                    {item.date}
                  </p>

                  <div className="mt-2 inline-flex items-center">
                    <span className="border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white text-xs px-2 py-1 rounded-full font-medium">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bouton Voir Plus/Moins - Seulement sur mobile/tablette */}
        {hasMoreProducts && (
          <div className="lg:hidden text-center mb-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-full hover:bg-green-200 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              <span>{showAll ? 'Voir moins' : `Voir plus (${products.length - 2})`}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center">
          <button
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border-2 border-green-600 text-green-700 text-sm sm:text-base font-medium rounded-full hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
            onClick={() => console.log('Navigate to /products')}
          >
            <span>See All</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}