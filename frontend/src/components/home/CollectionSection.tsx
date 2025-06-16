export default function CollectionSection() {
  const collections = [
    {
      label: "Jacket",
      image:
        "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg", // Remplace par l'URL de ton image
    },
    {
      label: "Short",
      image:
        "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg",
    },
    {
      label: "Tanks",
      image:
        "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg",
    },
  ];

  return (
    <section className="py-8 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Our Varied
              <br />
              <span className="italic text-gray-400">Collections</span>
            </h2>
          </div>
          <div className="max-w-xl text-gray-600 text-sm">
            <p>
              Our gym clothing web platform invites you to explore a
              diverse range of athletic apparel meticulously curated to
              elevate your workout wardrobe. Discover a fusion of performance-driven
              functionality and cutting-edge style, tailored to meet the demands of
              your fitness journey.

            </p>
          </div>
        </div>
        <div className="w-full h-1 bg-green-500  rounded-full mt-5 mb-5"></div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {collections.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300 group"
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 text-center">
                  {item.label}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
