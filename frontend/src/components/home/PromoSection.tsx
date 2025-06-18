export default function PromoSection() {
  const promos = [
    {
      title: "Top Accessories",
      subtitle: "SALE 50% OFF",
      description: "In-store and online. Hurry Up! Limited time offer.",
      button: "SHOP NOW",
      image:
        "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg", // à remplacer
    },
    {
      title: "Here’s To You",
      subtitle: "HOT UNDER $200.00",
      description: "Discover selected items with many discount.",
      button: "SHOP NOW",
      image:
        "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg", // à remplacer
    },
  ];

  return (
    <section className="py-8 bg-white px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
        {promos.map((promo, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition duration-300"
          >
            <div className="max-w-[60%]">
              <p className="text-xs text-gray-500 uppercase">{promo.subtitle}</p>
              <h3 className="text-2xl font-semibold text-gray-900 mt-1">{promo.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{promo.description}</p>
              <button className="mt-4 px-4 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition">
                {promo.button}
              </button>
            </div>
            <div className="w-32 md:w-40 lg:w-48">
              <img
                src={promo.image}
                alt={promo.title}
                className="object-contain w-full h-auto"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
