import { Link } from "react-router-dom";

export default function ComingSoonCollection() {
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

  return (
    <section className="py-10 bg-gray-100 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between mb-12 gap-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Introducing Our <br />
              Exclusive Coming Soon{" "}
              <span className="italic text-gray-400">Collection</span>
            </h2>
          </div>
          <div className="max-w-xl text-gray-600 text-sm">
            <p>
              Embark on a journey into the future of fitness fashion with our highly
              anticipated “Coming Soon” collection. We’re thrilled to share a glimpse of
              what’s brewing behind the scenes, as we gear up to unveil the latest
              evolution in athletic apparel...
            </p>
          </div>
        </div>

        <h4 className="uppercase text-sm font-bold text-gray-500 mb-4">
          List Product.
        </h4>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {products.map((item, index) => (
            <div key={index} className="flex items-center bg-gray-50 rounded-md overflow-hidden shadow hover:shadow-md transition">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover"
              />
              <div className="p-4">
                <h5 className="font-semibold text-gray-900">{item.name}</h5>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to={'/products'} className="px-6 py-2 border border-gray-800 text-gray-800 text-sm rounded-full hover:bg-gray-800 hover:text-white transition">
            See All →
          </Link>
        </div>
      </div>
    </section>
  );
}
