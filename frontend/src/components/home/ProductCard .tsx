// components/ProductCard.tsx
import { Heart } from "lucide-react";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
}

const ProductCard = ({ image, title, price }: ProductCardProps) => (
  <div className="relative rounded-2xl overflow-hidden shadow-md group">
    <img src={image} alt={title} className="w-full h-80 object-cover" />
    <span className="absolute top-2 right-2 bg-white text-xs px-2 py-1 rounded-full font-semibold">
      Winter
    </span>
    <button className="absolute top-2 left-2 bg-white p-1 rounded-full shadow">
      <Heart className="w-4 h-4 text-black" />
    </button>
    <div className="absolute bottom-0 w-full p-4 bg-white/80 backdrop-blur-sm">
      <h3 className="text-md font-medium">{title}</h3>
      <p className="text-sm text-gray-600">{price}</p>
      <button className="absolute right-4 bottom-4 bg-black text-white rounded-full p-2 hover:bg-gray-800">
        →
      </button>
    </div>
  </div>
);

export default ProductCard;
