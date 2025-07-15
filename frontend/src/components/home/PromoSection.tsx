export default function PromoSection() {
  const promos = [
    {
      title: "Meilleurs Accessoires",
      subtitle: "PROMO -50%",
      description: "En boutique et en ligne. Faites vite ! Offre limitée.",
      button: "ACHETER",
      image: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg",
      accent: "green",
      isHot: true,
    },
    {
      title: "Pour Vous",
      subtitle: "CHAUD À MOINS DE 120 000 XOF",
      description: "Découvrez des articles sélectionnés avec de nombreuses réductions.",
      button: "ACHETER",
      image: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg",
      accent: "black",
      isHot: false,
    },
  ];

  return (
    <section className="py-10 lg:py-14 bg-gradient-to-br from-gray-50 to-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Offres <span className="text-green-500">Exceptionnelles</span>
          </h2>
          <div className="w-16 h-1 bg-green-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
          {promos.map((promo, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1.5 ${
                promo.accent === 'green'
                  ? 'bg-gradient-to-br from-green-50 to-green-100 border border-green-200 hover:border-green-400'
                  : 'bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 hover:border-gray-400'
              }`}
            >
              {promo.isHot && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                    🔥 CHAUD
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between p-4 lg:p-6 relative z-10">
                <div className="flex-1 max-w-[55%] pr-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        promo.accent === 'green'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-800 text-white'
                      }`}
                    >
                      {promo.subtitle}
                    </span>
                  </div>

                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 leading-tight">
                    {promo.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {promo.description}
                  </p>

                  <button
                    className={`inline-flex items-center gap-1 px-4 py-2 font-semibold text-xs uppercase tracking-wide rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 ${
                      promo.accent === 'green'
                        ? 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-300'
                        : 'bg-gray-900 text-white hover:bg-black focus:ring-gray-300'
                    }`}
                  >
                    <span>{promo.button}</span>
                    <svg
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>

                <div className="relative w-24 md:w-28 lg:w-32 xl:w-36">
                  <div className={`absolute inset-0 rounded-full opacity-20 transform scale-110 ${
                    promo.accent === 'green' ? 'bg-green-400' : 'bg-gray-400'
                  } group-hover:scale-125 transition-transform duration-500`}></div>

                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="relative z-10 object-cover w-full h-24 md:h-28 lg:h-32 xl:h-36 rounded-lg transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
                  />

                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="group">
              <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1 group-hover:text-green-500 transition-colors">
                50%
              </div>
              <div className="text-xs text-gray-600">Réduction Maximum</div>
            </div>
            <div className="group">
              <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1 group-hover:text-green-500 transition-colors">
                200+
              </div>
              <div className="text-xs text-gray-600">Produits en promotion</div>
            </div>
            <div className="group">
              <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1 group-hover:text-green-500 transition-colors">
                24h
              </div>
              <div className="text-xs text-gray-600">Temps restant</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
