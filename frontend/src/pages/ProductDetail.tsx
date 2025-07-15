import { useEffect, useState } from 'react';
import {
  Star, Heart, ShoppingCart, Truck,
  Shield, MessageCircle, Share2, Plus, Minus
} from 'lucide-react';
import { fetchProductById } from '../data/products';
import { useParams, useNavigate } from 'react-router-dom';
import { ProcessedProduct } from '../types';
import { useFavorites } from '../context/FavoriteContext';
import { useCart } from '../hook/useCart';
import { COLOR_HEX } from '../utils/colors';
import { toast } from "react-hot-toast";   // ou n’importe quelle lib de toasts
import LoaderOrError from '../components/ui/LoaderOrError';
import ProductReviews from '../components/shared/ProductReviews';

const mockReviews = [
  {
    name: "John D.",
    rating: 5,
    comment: "Excellente qualité, taille parfaite. Le tissu est agréable à porter toute la journée."
  },
];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProcessedProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Product interaction states
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>("");

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Review form states
  const [reviews, setReviews] = useState(mockReviews);

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
  const handleAddToCart = (
    product: ProcessedProduct,
    size: string | undefined,
    color: string | undefined,
    qty: number = 1
  ) => {
    const productForCart = {
      id: product.id,
      name: product.name,
      title: product.title,
      price: product.price.toString(),
      image: product.thumbnail,
      thumbnail: product.thumbnail,
      description: product.description,
      category: product.category,
    };

    addToCart(
      productForCart,
      size && size.trim() ? size : "M",
      color && color.trim() ? color : "Black",
      qty
    );
  };

  if (loading || error || !product) {
    return <LoaderOrError loading={loading} error={error} />;
  }

  const handleCheckout = () => {
    if (!product) return;

    // 1) Vérifications
    if (!product.in_stock) {
      toast.error("Produit en rupture de stock");
      return;
    }
    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error("Veuillez choisir une taille");
      return;
    }
    if (product.colors?.length > 0 && !selectedColor) {
      toast.error("Veuillez choisir une couleur");
      return;
    }

    // 2) Ajout (optionnel) au panier
    handleAddToCart(product, selectedSize, selectedColor, quantity);
    // Rediriger vers la page checkout
    navigate('/checkout');
  };

  // Check if product is in favorites
  const isProductFavorite = isFavorite(product.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="bg-white px-6 py-3 text-sm text-gray-600 border-b">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline">
            ← Retour aux produits
          </button>
          <span>›</span>
          <span> Mode {product.gender} › {product.category} › {product.name}</span>
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

            {/* Sélection de couleur */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-1">
                <span className="font-semibold text-gray-900">Choisir une couleur:</span>

                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      aria-label={color}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-10 h-10 rounded-full border-2 transition
                          ${selectedColor === color
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-gray-300 hover:border-gray-400"}
                        `}
                      style={{ backgroundColor: COLOR_HEX[color] ?? "#000000" }}
                    >
                      {selectedColor === color && (
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

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

                {selectedColor && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Couleur sélectionnée :</span>
                    <span className="font-medium text-gray-900">{selectedColor}</span>
                  </div>
                )}

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
                    onClick={handleCheckout}
                    disabled={
                      !product.in_stock ||
                      (product.sizes?.length > 0 && !selectedSize) ||
                      (product.colors?.length > 0 && !selectedColor)
                    }
                    className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Acheter maintenant
                  </button>


                  <button
                    onClick={() =>
                      product && handleAddToCart(product, selectedSize, selectedColor)
                    }
                    disabled={
                      !product.in_stock ||
                      (product.sizes?.length > 0 && !selectedSize) ||
                      (product.colors?.length > 0 && !selectedColor)
                    }
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
        <ProductReviews
          rating={product.rating}
          reviews={reviews}
          onSubmit={(review) => setReviews([review, ...reviews])}
        />
      </div>
    </div>
  );
};

export default ProductDetail;