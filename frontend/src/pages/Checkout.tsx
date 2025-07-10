import React, { useState } from 'react';
import { CreditCard, Trash2, Plus, Minus, ShoppingCart, Lock, CheckCircle, User, MapPin } from 'lucide-react';

// Types adaptés aux nouveaux contextes
interface Product {
  id: string;
  title: string;
  name: string;
  description: string;
  stock: string;
  price: string;
  discount_percentage: string | null;
  rating: string;
  brand: string;
  gender: string;
  thumbnail: string;
  image: string;
  hover_image: string;
  is_new: boolean;
  is_best_seller: boolean;
  in_stock: boolean;
  is_on_sale: boolean;
  original_price: string;
  discount: string | null;
  promotion: string;
  category_id: string;
  category: string;
  sizes: string[];
  colors: string[];
  created_at: string;
  updated_at: string;
}

interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
}

const Checkout = () => {
  // Simulation des données depuis les contextes
  const [user] = useState<AuthUser | null>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe'
  });

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: {
        id: '1',
        title: 'Nike Air Max 270',
        name: 'Nike Air Max 270',
        description: 'Chaussure de sport confortable avec technologie Air Max',
        stock: '50',
        price: '149.99',
        discount_percentage: '10',
        rating: '4.5',
        brand: 'Nike',
        gender: 'unisex',
        thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        hover_image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        is_new: true,
        is_best_seller: false,
        in_stock: true,
        is_on_sale: true,
        original_price: '169.99',
        discount: '20.00',
        promotion: 'Soldes d\'été',
        category_id: '1',
        category: 'Chaussures',
        sizes: ['40', '41', '42', '43'],
        colors: ['Noir', 'Blanc', 'Rouge'],
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      },
      size: '42',
      quantity: 1
    },
    {
      product: {
        id: '2',
        title: 'Adidas Ultraboost 22',
        name: 'Adidas Ultraboost 22',
        description: 'Chaussure de running haute performance',
        stock: '30',
        price: '189.99',
        discount_percentage: null,
        rating: '4.8',
        brand: 'Adidas',
        gender: 'unisex',
        thumbnail: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
        image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
        hover_image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
        is_new: false,
        is_best_seller: true,
        in_stock: true,
        is_on_sale: false,
        original_price: '189.99',
        discount: null,
        promotion: '',
        category_id: '1',
        category: 'Chaussures',
        sizes: ['39', '40', '41', '42', '43', '44'],
        colors: ['Noir', 'Blanc', 'Bleu'],
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      },
      size: '41',
      quantity: 2
    }
  ]);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'France'
  });
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const updateQuantity = (productId: string, size: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId, size);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (productId: string, size: string) => {
    setCartItems(items => 
      items.filter(item => !(item.product.id === productId && item.size === size))
    );
  };

  const getItemPrice = (item: CartItem) => {
    return item.product.is_on_sale && item.product.discount
      ? parseFloat(item.product.price) - parseFloat(item.product.discount)
      : parseFloat(item.product.price);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (getItemPrice(item) * item.quantity), 0);
  const tax = subtotal * 0.2; // 20% TVA
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    // Simulation du traitement de commande
    setTimeout(() => {
      setOrderPlaced(true);
      setCartItems([]); // Vider le panier
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Commande Confirmée!</h1>
          <p className="text-gray-600 mb-6">
            Merci {user?.firstName || 'cher client'} ! Votre commande a été traitée avec succès.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Numéro de commande</p>
            <p className="text-lg font-mono font-bold text-gray-900">
              #CMD-{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total payé</span>
              <span className="font-medium">{total.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Mode de paiement</span>
              <span className="font-medium">{paymentMethod === 'card' ? 'Carte bancaire' : 'PayPal'}</span>
            </div>
          </div>
          
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
          >
            Continuer mes achats
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <ShoppingCart className="w-8 h-8 text-blue-600" />
                Finaliser ma Commande
              </h1>
              <p className="text-gray-600 mt-2">
                {user ? `Bonjour ${user.firstName || user.name}` : 'Finalisez votre achat'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Commande sécurisée</p>
              <div className="flex items-center gap-1 mt-1">
                <Lock className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">SSL 256-bit</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Section principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Articles du panier */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Mon Panier</h2>
                <span className="text-sm text-gray-500">
                  {cartItems.length} article{cartItems.length > 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={`${item.product.id}-${item.size}`} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img 
                        src={item.product.thumbnail} 
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      {item.product.is_on_sale && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          -{item.product.discount_percentage}%
                        </span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.product.title}</h3>
                      <p className="text-sm text-gray-600">{item.product.brand}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-500">Taille: {item.size}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{item.product.category}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        {item.product.is_on_sale ? (
                          <>
                            <span className="font-medium text-blue-600">
                              {getItemPrice(item).toFixed(2)} €
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              {parseFloat(item.product.price).toFixed(2)} €
                            </span>
                          </>
                        ) : (
                          <span className="font-medium text-gray-900">
                            {parseFloat(item.product.price).toFixed(2)} €
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Informations de livraison */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Adresse de Livraison
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    name="address"
                    placeholder="Adresse complète"
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                <input
                  type="text"
                  name="city"
                  placeholder="Ville"
                  value={shippingInfo.city}
                  onChange={handleShippingChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Code postal"
                  value={shippingInfo.postalCode}
                  onChange={handleShippingChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* Mode de paiement */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                Mode de Paiement
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <label className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Carte Bancaire</p>
                      <p className="text-sm text-gray-500">Visa, Mastercard, Amex</p>
                    </div>
                  </div>
                </label>
                
                <label className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-blue-600 rounded"></div>
                    <div>
                      <p className="font-medium">PayPal</p>
                      <p className="text-sm text-gray-500">Paiement sécurisé</p>
                    </div>
                  </div>
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
                  <input
                    type="text"
                    name="number"
                    placeholder="Numéro de carte"
                    value={cardInfo.number}
                    onChange={handleCardChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/AA"
                      value={cardInfo.expiry}
                      onChange={handleCardChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={cardInfo.cvv}
                      onChange={handleCardChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                    <input
                      type="text"
                      name="name"
                      placeholder="Nom"
                      value={cardInfo.name}
                      onChange={handleCardChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Résumé de commande */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Résumé</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-medium">{subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">TVA (20%)</span>
                  <span className="font-medium">{tax.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Livraison</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">Gratuite</span>
                    ) : (
                      `${shipping.toFixed(2)} €`
                    )}
                  </span>
                </div>
                
                {subtotal < 100 && (
                  <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                    💡 Ajoutez {(100 - subtotal).toFixed(2)} € pour la livraison gratuite
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-xl font-bold text-blue-600">{total.toFixed(2)} €</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={cartItems.length === 0}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Lock className="w-5 h-5" />
                Finaliser ma Commande
              </button>

              <div className="mt-4 text-center space-y-2">
                <p className="text-sm text-gray-500">
                  Paiement 100% sécurisé
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">VISA</div>
                  <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center">MC</div>
                  <div className="w-8 h-5 bg-blue-800 rounded text-white text-xs flex items-center justify-center">AMEX</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;