export default function PromoSection() {
  const promos = [
    {
      title: "Top Accessories",
      subtitle: "SALE 50% OFF",
      description: "In-store and online. Hurry Up! Limited time offer.",
      button: "SHOP NOW",
      image: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg",
      accent: "green", // Accent couleur pour cette promo
      isHot: true
    },
    {
      title: "Here's To You",
      subtitle: "HOT UNDER $200.00",
      description: "Discover selected items with many discount.",
      button: "SHOP NOW",
      image: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg",
      accent: "black", // Accent couleur pour cette promo
      isHot: false
    },
  ];

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header optionnel */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Offres <span className="text-green-500">Exceptionnelles</span>
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {promos.map((promo, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                promo.accent === 'green' 
                  ? 'bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 hover:border-green-400' 
                  : 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-gray-400'
              }`}
            >
              {/* Badge "HOT" */}
              {promo.isHot && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                    🔥 HOT
                  </span>
                </div>
              )}

              {/* Effet de brillance au hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <div className="flex items-center justify-between p-6 lg:p-8 relative z-10">
                
                {/* Contenu textuel */}
                <div className="flex-1 max-w-[60%] pr-4">
                  {/* Subtitle */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                      promo.accent === 'green' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-800 text-white'
                    }`}>
                      {promo.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-gray-700 transition-colors">
                    {promo.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm lg:text-base text-gray-600 mb-6 leading-relaxed">
                    {promo.description}
                  </p>

                  {/* Button */}
                  <button 
                    className={`group/btn inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm uppercase tracking-wide rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 ${
                      promo.accent === 'green'
                        ? 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/25 focus:ring-green-300'
                        : 'bg-gray-900 text-white hover:bg-black hover:shadow-lg hover:shadow-gray-500/25 focus:ring-gray-300'
                    }`}
                  >
                    <span>{promo.button}</span>
                    <svg 
                      className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>

                {/* Image */}
                <div className="relative w-32 md:w-40 lg:w-48 xl:w-56">
                  {/* Effet de cercle décoratif */}
                  <div className={`absolute inset-0 rounded-full opacity-20 transform scale-110 ${
                    promo.accent === 'green' ? 'bg-green-400' : 'bg-gray-400'
                  } group-hover:scale-125 transition-transform duration-500`}></div>
                  
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="relative z-10 object-cover w-full h-32 md:h-40 lg:h-48 xl:h-56 rounded-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
                  />
                  
                  {/* Ombre portée de l'image */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Decoration elements */}
              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5">
                <div className={`w-full h-full rounded-full ${
                  promo.accent === 'green' ? 'bg-green-500' : 'bg-gray-800'
                } transform translate-x-16 translate-y-16`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Section statistiques optionnelle */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="group">
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 group-hover:text-green-500 transition-colors">
                50%
              </div>
              <div className="text-sm text-gray-600">Réduction Max</div>
            </div>
            <div className="group">
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 group-hover:text-green-500 transition-colors">
                200+
              </div>
              <div className="text-sm text-gray-600">Produits en Promo</div>
            </div>
            <div className="group">
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 group-hover:text-green-500 transition-colors">
                24h
              </div>
              <div className="text-sm text-gray-600">Temps Restant</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}