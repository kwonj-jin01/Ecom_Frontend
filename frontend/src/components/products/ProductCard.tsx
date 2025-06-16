import { Heart, ChevronRight } from 'lucide-react';

const WorkoutStore = () => {
  const products = [
    {
      id: 1,
      name: "ASRV x Equinox Lycra",
      price: "USD $16.00",
      image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=400&h=400&fit=crop&crop=center",
      season: "Winter"
    },
    {
      id: 2,
      name: "ASRV x Equinox Lycra",
      price: "USD $16.00",
      image: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=400&h=400&fit=crop&crop=center",
      season: "Winter"
    },
    {
      id: 3,
      name: "ASRV x Equinox Lycra",
      price: "USD $16.00",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
      season: "Winter"
    },
    {
      id: 4,
      name: "ASRV x Equinox Lycra",
      price: "USD $16.00",
      image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=400&h=400&fit=crop&crop=center",
      season: "Winter"
    },
    {
      id: 5,
      name: "ASRV x Equinox Lycra",
      price: "USD $16.00",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
      season: "Winter"
    },
    {
      id: 6,
      name: "ASRV x Equinox Lycra",
      price: "USD $16.00",
      image: "https://images.unsplash.com/photo-1583743089695-4b566c1637e8?w=400&h=400&fit=crop&crop=center",
      season: "Winter"
    },
    {
      id: 7,
      name: "ASRV x Equinox Lycra",
      price: "USD $16.00",
      image: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=400&h=400&fit=crop&crop=center",
      season: "Winter"
    },
    {
      id: 8,
      name: "ASRV x Equinox Lycra",
      price: "USD $16.00",
      image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop&crop=center",
      season: "Winter"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <span className="text-sm text-gray-600 font-medium">NEW ARRIVAL</span>
          <span className="text-sm text-gray-600 font-medium">ALL BRANDS</span>
        </div>

        {/* Main Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            FRESH FITS FOR <span className="text-gray-600">YOUR</span>
            <br />
            <span className="text-gray-600">NEXT</span> WORKOUT!
          </h1>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Product Image Container */}
              <div className="relative overflow-hidden rounded-2xl bg-gray-200 aspect-square mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Season Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                    {product.season}
                  </span>
                </div>

                {/* Heart Icon */}
                <div className="absolute top-4 left-4">
                  <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Product Info */}
              <div className="bg-white rounded-lg p-4 shadow-sm group-hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm font-medium">
                      {product.price}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutStore;