// components/ProductReviews.tsx
import { Star } from "lucide-react";
import { useState } from "react";

interface Review {
  name: string;
  rating: number;
  comment: string;
}

interface Props {
  rating: number;
  reviews: Review[];
  onSubmit: (review: Review) => void;
}

const ProductReviews: React.FC<Props> = ({ rating, reviews, onSubmit }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    onSubmit({ name, rating: stars, comment });
    setName("");
    setComment("");
    setStars(5);
  };

  return (
    <div className="mt-12 bg-white p-6 rounded-xl border shadow-lg">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Avis des clients</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Note globale */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl font-bold text-gray-900">{rating}</span>
            <div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Basé sur {reviews.length} avis
              </p>
            </div>
          </div>

          {/* Histogramme statique (mock) */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star, idx) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm w-4">{star}</span>
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${[90, 70, 15, 8, 2][idx]}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{[214, 166, 36, 19, 5][idx]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Liste des commentaires */}
        <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-medium">{review.name}</span>
              </div>
              <p className="text-sm text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Formulaire d'avis */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Laisser un avis</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Votre commentaire"
            className="w-full border border-gray-300 p-2 rounded-lg"
            rows={3}
            required
          />
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Note:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 cursor-pointer ${star <= stars
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-400 hover:text-yellow-400"
                  }`}
                onClick={() => setStars(star)}
              />
            ))}
          </div>
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Envoyer l'avis
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductReviews;
