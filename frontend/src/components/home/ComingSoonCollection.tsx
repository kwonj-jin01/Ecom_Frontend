import { useState } from 'react';

export default function ComingSoonCollection() {
  const [showAll, setShowAll] = useState(false);

  const products = [
    {
      name: "Power Zip Hoodie",
      date: "12 mars 2024",
      image: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg",
    },
    {
      name: "Raise The Bar T-Shirt",
      date: "20 mai 2024",
      image: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg"
    },
    {
      name: "Raise The Bar Hoodie",
      date: "9 juin 2024",
      image: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg"
    },
    {
      name: "Sleek Backpack",
      date: "12 septembre 2024",
      image: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg"
    },
    {
      name: "Everyday Tote",
      date: "24 juillet 2024",
      image: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg"
    },
    {
      name: "Pursuit Backpack",
      date: "11 octobre 2024",
      image: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg"
    },
  ];

  const getVisibleProducts = () => {
    return showAll ? products : products.slice(0, 2);
  };

  const visibleProducts = getVisibleProducts();
  const hasMoreProducts = products.length > 2;

  return (
    <section className="sm:py-6 lg:py-8 bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-8 sm:mb-12 lg:mb-16 gap-6 lg:gap-12">
          <div className="flex-1 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
              <span className="text-green-500">collection exclusive</span><br className="hidden sm:block" />
              <span className="italic text-gray-400 block sm:inline"> à venir</span>
            </h2>
          </div>

          <div className="flex-1 max-w-xl">
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Plongez dans l’avenir de la mode fitness avec notre collection "À venir". Préparez-vous à améliorer votre style d'entraînement avec des designs premium alliant fonctionnalité et élégance.
            </p>
          </div>
        </div>

        {/* Séparateur */}
        <div className="mb-6 sm:mb-8 flex items-center gap-4">
          <h4 className="uppercase text-xs sm:text-sm font-bold text-gray-500 whitespace-nowrap">
            Liste des produits
          </h4>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Grille des produits */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-3">
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
                      Bientôt disponible
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile/tablette */}
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
                      Bientôt disponible
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bouton voir plus / moins */}
        {hasMoreProducts && (
          <div className="lg:hidden text-center">
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
        {/* CTA */}
        <div className="text-center">
          <button
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border-2 border-green-600 text-green-700 text-sm sm:text-base font-medium rounded-full hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
            onClick={() => console.log('Naviguer vers /produits')}
          >
            <span>Voir tout</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
