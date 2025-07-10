import { useEffect, useState } from 'react';
import {
  Star, Heart, ShoppingCart, Truck,
  Shield, MessageCircle, Share2, Plus, Minus
} from 'lucide-react';
import { fetchProductById } from '../data/products';
import { useParams, useNavigate } from 'react-router-dom';
import { ProcessedProduct } from '../types';
import { useFavorites } from '../context/FavoriteContext';
import { useCart } from '../context/CartContext';

const mockReviews = [
  {
    name: "John D.",
    rating: 5,
    comment: "Excellente qualité, taille parfaite. Le tissu est agréable à porter toute la journée."
  },
  {
    name: "Claire M.",
    rating: 4,
    comment: "Très bon produit mais livraison un peu lente."
  },
  {
    name: "Ali B.",
    rating: 5,
    comment: "Top ! Conforme à la description et très confortable."
  },
  {
    name: "Fatou K.",
    rating: 3,
    comment: "Bon mais taille un peu petit."
  },
  {
    name: "Yann L.",
    rating: 5,
    comment: "Parfait, je recommande à 100%."
  }
];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProcessedProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Product interaction states
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Review form states
  const [reviews, setReviews] = useState(mockReviews);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  // Hooks
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setError("ID du produit manquant");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const found = await fetchProductById(id);
        
        if (found) {
          setProduct(found);
          // Set default size if available
          if (found.sizes && found.sizes.length > 0) {
            setSelectedSize(found.sizes[0]);
          }
        } else {
          setError("Produit introuvable");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur lors du chargement du produit");
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // Handlers
  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      ...product,
      quantity,
      size: selectedSize
    };

    addToCart(cartItem);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview = { name: name.trim(), rating, comment: comment.trim() };
    setReviews([newReview, ...reviews]);
    setName("");
    setComment("");
    setRating(5);
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || "Produit introuvable"}</p>
          <button
            onClick={handleBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour aux produits
          </button>
        </div>
      </div>
    );
  }

  // Check if product is in favorites
  const isProductFavorite = isFavorite(product.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="bg-white px-6 py-3 text-sm text-gray-600 border-b">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <button onClick={handleBack} className="text-blue-600 hover:underline">
            ← Retour aux produits
          </button>
          <span>›</span>
          <span>Accueil › Mode {product.gender} › {product.category} › {product.name}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left - Product Images */}
          <div className="lg:col-span-1">
            <div className="relative">
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.is_new && (
                  <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                    NOUVEAU
                  </span>
                )}
                {product.is_best_seller && (
                  <span className="bg-yellow-500 text-black text-xs font-semibold px-2 py-1 rounded">
                    Meilleure vente
                  </span>
                )}
                {product.promotion && (
                  <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {product.promotion}
                  </span>
                )}
                {product.is_on_sale && product.discount > 0 && (
                  <span className="bg-black text-white text-xs font-semibold px-2 py-1 rounded">
                    -{product.discount}%
                  </span>
                )}
              </div>
              
              {/* Image principale */}
              <img
                src={product.images[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-xl border shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Image+Non+Disponible';
                }}
              />
              
              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(product.id);
                }}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm z-10"
              >
                <Heart
                  className={`w-4 h-4 ${isProductFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                />
              </button>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${selectedImage === idx
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Milieu – Informations sur le produit */}
          <div className="lg:col-span-1 space-y-6">
            {/* Titre et nom du produit */}
            <div>
              <p className="text-sm text-blue-600 font-medium mb-2">{product.brand}</p>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Note & Avis */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="ml-2 font-medium">{product.rating}</span>
                <span className="ml-1 text-gray-500">(238 avis)</span>
              </div>
              <span className="text-gray-500">2,3k+ vendus</span>
              <span className={`font-medium ${product.in_stock ? 'text-green-600' : 'text-red-600'}`}>
                {product.in_stock ? 'En stock' : 'Rupture de stock'}
              </span>
            </div>

            {/* Sélection de taille */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-900">Choisir une taille :</span>
                  <button className="text-sm text-blue-600 hover:underline">Guide des tailles</button>
                </div>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border-2 rounded-lg font-medium transition-all ${selectedSize === size
                        ? 'border-blue-500 bg-blue-50 text-blue-600 ring-2 ring-blue-200'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Détails du produit */}
            {product.details && product.details.length > 0 && (
              <div className="bg-white p-5 rounded-xl border shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Détails du produit</h3>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  {product.details.map((detail, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-gray-600">{detail.label} :</span>
                      <span className="font-medium text-gray-900">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* À propos de cet article */}
            {product.about && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">À propos de cet article</h3>
                <div className="bg-white p-5 rounded-xl border shadow-sm">
                  <p className="text-sm text-gray-700">{product.about}</p>
                </div>
              </div>
            )}

            {/* Informations de livraison */}
            <div className="bg-white p-5 rounded-xl border shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Informations de livraison</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Truck className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-gray-700">Livraison gratuite à partir de 50.000 XOF</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-gray-700">Livraison estimée : 3 à 5 jours ouvrés</span>
                </div>
              </div>
            </div>
          </div>

          {/* Droite – Achat */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white p-6 rounded-xl border shadow-lg space-y-5">
                {/* Prix */}
                <div className="text-center">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {product.price.toLocaleString('fr-FR')} XOF
                    </span>
                    {product.original_price && product.original_price > product.price && (
                      <span className="text-lg text-gray-500 line-through">
                        {product.original_price.toLocaleString('fr-FR')} XOF
                      </span>
                    )}
                  </div>
                  {product.original_price && product.original_price > product.price && (
                    <p className="text-sm text-green-600 font-medium mt-1">
                      Vous économisez {Math.round(product.original_price - product.price).toLocaleString('fr-FR')} XOF
                    </p>
                  )}
                </div>

                {/* Taille et quantité */}
                <div className="space-y-3">
                  {selectedSize && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Taille sélectionnée :</span>
                      <span className="font-medium text-gray-900">{selectedSize}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Quantité :</span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-gray-50 rounded-l-lg"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300 font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 hover:bg-gray-50 rounded-r-lg"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right text-sm text-gray-600">
                    Stock :{" "}
                    <span className={`font-medium ${product.in_stock ? "text-green-600" : "text-red-500"}`}>
                      {product.stock} disponible{Number(product.stock) > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                {/* Boutons */}
                <div className="space-y-3">
                  <button
                    disabled={!product.in_stock}
                    className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Acheter maintenant
                  </button>

                  <button
                    onClick={handleAddToCart}
                    disabled={!product.in_stock}
                    className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
                  >
                    Ajouter au panier
                  </button>
                </div>

                {/* Actions vendeur */}
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    Contacter
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Partager
                  </button>
                </div>
              </div>

              {/* Informations vendeur */}
              <div className="bg-white p-5 rounded-xl border shadow-lg mt-4">
                <h3 className="font-semibold text-gray-900 mb-3">Informations sur le vendeur</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{product.brand}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="ml-1 text-xs text-gray-600">96,7 % d'avis positifs</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">● En ligne maintenant</p>
                  </div>
                  <button className="text-sm text-blue-600 hover:underline font-medium">
                    Visiter la boutique
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-white p-6 rounded-xl border shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Avis des clients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Note globale + histogramme */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold text-gray-900">{product.rating}</span>
                <div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Basé sur 238 avis</p>
                </div>
              </div>

              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating, idx) => (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm w-4">{rating}</span>
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${[90, 70, 15, 8, 2][idx]}%` }}
                      ></div>
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

          {/* Formulaire pour ajouter un commentaire */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Laisser un avis</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom"
                className="w-full border border-gray-300 p-2 rounded-lg"
                required
              />
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
                    className={`w-5 h-5 cursor-pointer transition-colors ${
                      star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
                    }`}
                    onClick={() => setRating(star)}
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
      </div>
    </div>
  );
};

export default ProductDetail;