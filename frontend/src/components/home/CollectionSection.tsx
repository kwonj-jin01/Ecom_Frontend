import { useState } from 'react';

export default function CollectionSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const collections = [
    {
      label: "Vestes",
      subtitle: "Vestes premium",
      count: "24 articles",
      image: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg",
      color: "green"
    },
    {
      label: "Shorts",
      subtitle: "Shorts performants",
      count: "18 articles",
      image: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg",
      color: "black"
    },
    {
      label: "Débardeurs",
      subtitle: "Débardeurs sportifs",
      count: "32 articles",
      image: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg",
      color: "green"
    },
  ];

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-500 opacity-5 rounded-full -translate-x-36 -translate-y-36"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-800 opacity-5 rounded-full translate-x-48 translate-y-48"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-12 gap-8">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Nouvelles collections
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Nos différentes <br />
              <span className="italic text-green-500 relative">
                collections
                <svg className="absolute -bottom-2 left-0 w-full h-2" viewBox="0 0 200 8" fill="none">
                  <path d="M0 4C50 2 100 6 150 4C175 3 200 4 200 4" stroke="#10b981" strokeWidth="2" fill="none" />
                </svg>
              </span>
            </h2>
          </div>

          <div className="text-gray-600 text-base lg:text-lg text-center lg:text-left max-w-2xl">
            <p className="leading-relaxed">
              Découvrez une fusion entre <span className="text-green-600 font-semibold">performance et style</span>, pensée pour votre parcours sportif.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-6 mt-6">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-gray-900">74+</div>
                <div className="text-sm text-gray-500">Articles au total</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-gray-900">3</div>
                <div className="text-sm text-gray-500">Catégories</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mb-6 lg:mb-16">
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-full shadow-lg">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Collections en vedette
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {collections.map((item, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer ${hoveredIndex === index ? 'scale-105' : ''
                }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative w-full aspect-[1/0.5] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {item.count}
                </div>
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                  <button className={`w-full py-2.5 sm:py-3 rounded-full font-semibold text-white text-sm sm:text-base transition-all duration-300 ${item.color === 'green'
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-gray-800 hover:bg-black'
                    }`}>
                    Explorer la collection
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6 text-center">
                <div className="mb-2">
                  <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold transition-colors duration-300 ${item.color === 'green'
                    ? 'text-gray-800 group-hover:text-green-600'
                    : 'text-gray-800 group-hover:text-gray-900'
                    }`}>
                    {item.label}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{item.subtitle}</p>
                </div>
                <div className={`w-0 group-hover:w-12 sm:group-hover:w-16 h-0.5 mx-auto transition-all duration-500 ${item.color === 'green' ? 'bg-green-500' : 'bg-gray-800'
                  }`}></div>
              </div>

              <div className={`absolute top-0 left-0 w-0 h-0 transition-all duration-500 group-hover:w-16 group-hover:h-16 sm:group-hover:w-20 sm:group-hover:h-20 ${item.color === 'green' ? 'bg-green-500' : 'bg-gray-800'
                } opacity-10`} style={{
                  clipPath: 'polygon(0 0, 100% 0, 0 100%)'
                }}></div>
            </div>
          ))}
        </div>

        <div className="absolute top-1/4 right-8 w-4 h-4 bg-green-500 rounded-full animate-bounce opacity-60 hidden lg:block"></div>
        <div className="absolute bottom-1/4 left-8 w-3 h-3 bg-gray-800 rounded-full animate-pulse opacity-40 hidden lg:block"></div>
      </div>
    </section>
  );
}
