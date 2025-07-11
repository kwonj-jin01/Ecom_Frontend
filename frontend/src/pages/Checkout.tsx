import React, { useState } from "react";
import { Lock, ArrowLeft } from "lucide-react";

import { StepIndicator } from "../components/Checkout/StepIndicator";
import { ShippingForm } from "../components/Checkout/ShippingForm";
import { PaymentForm } from "../components/Checkout/PaymentForm";
import { OrderSummary } from "../components/Checkout/OrderSummary";
import { OrderConfirmation } from "../components/Checkout/OrderConfirmation";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // Ajout pour récupérer l'utilisateur
import type { ShippingInfo, PaymentInfo } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Page                                     */
/* -------------------------------------------------------------------------- */

const Checkout: React.FC = () => {
  /* Étapes: 1=shipping, 2=paiement, 3=confirmation */
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [orderId, setOrderId] = useState<string>("");

  /* Données de formulaire */
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    district: "",
    country: "France",
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  /* Livraison & remise */
  const [shippingMethod, setShippingMethod] = useState<"free" | "regular" | "express">("free");
  const [discountCode, setDiscountCode] = useState("");

  /* ---------------------------------------------------------------------- */
  /*                         Contexte Panier & Auth                         */
  /* ---------------------------------------------------------------------- */
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    getSubtotal,
    clearCart,
  } = useCart();

  const { user } = useAuth(); // Récupération de l'utilisateur connecté

  const subtotal = getSubtotal();
  // Frais de livraison en XOF
  const deliveryCharge = shippingMethod === "free" ? 0 : shippingMethod === "regular" ? 5000 : 10000;
  const total = subtotal + deliveryCharge;

  /* ---------------------------------------------------------------------- */
  /*                            Helpers formulaire                          */
  /* ---------------------------------------------------------------------- */
  const isShippingValid = () =>
    !!(
      shippingInfo.email &&
      shippingInfo.phone &&
      shippingInfo.firstName &&
      shippingInfo.lastName &&
      shippingInfo.address &&
      shippingInfo.city
    );

  const isPaymentValid = () =>
    !!(
      paymentInfo.cardNumber &&
      paymentInfo.expiryDate &&
      paymentInfo.cvv &&
      paymentInfo.cardholderName
    );

  const handleContinueToPayment = () => {
    if (!isShippingValid()) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    setCurrentStep(2);
  };

  const handlePlaceOrder = async () => {
    if (!isPaymentValid()) {
      alert("Veuillez remplir toutes les informations de paiement.");
      return;
    }

    if (!user) {
      alert("Vous devez être connecté pour passer commande.");
      return;
    }

    setIsProcessing(true);

    try {
      // Préparer les données de la commande selon le schéma DB
      const orderData = {
        // Informations utilisateur
        user_id: user.id,

        // Adresse de livraison (concaténée pour shipping_address)
        shipping_address: `${shippingInfo.address}${shippingInfo.district ? ', ' + shippingInfo.district : ''}`,
        shipping_city: shippingInfo.city,
        shipping_country: shippingInfo.country,
        shipping_zip: shippingInfo.district || null, // Utilisation du district comme code postal

        // Montant total
        total: total,

        // Status par défaut
        status: 'en_attente',

        // Articles commandés
        items: cart.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
          size: item.size || null,
          unit_price: parseFloat(item.product.price),
          total_price: parseFloat(item.product.price) * item.quantity,
        })),

        // Informations de paiement
        payment: {
          amount: total,
          method: 'carte',
          status: 'en_attente',
        },

        // Informations client (pour référence)
        customer_info: {
          email: shippingInfo.email,
          phone: shippingInfo.phone,
          firstName: shippingInfo.firstName,
          lastName: shippingInfo.lastName,
          cardholderName: paymentInfo.cardholderName,
        },

        // Métadonnées additionnelles
        metadata: {
          shipping_method: shippingMethod,
          discount_code: discountCode || null,
          delivery_charge: deliveryCharge,
          subtotal: subtotal,
          order_source: "web",
        }
      };

      // Appel API pour créer la commande
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`, // Token d'authentification
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();

      // Succès - commande créée
      console.log('Commande créée avec succès:', result);

      // Sauvegarder les informations de commande
      setOrderId(result.order.id);
      setOrderNumber(result.order.order_number);

      setIsProcessing(false);
      setOrderPlaced(true);
      setCurrentStep(3);

      // Vider le panier après commande réussie
      clearCart();

    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      setIsProcessing(false);

      // Gestion des erreurs
      if (error instanceof Error) {
        alert(`Erreur lors de la commande: ${error.message}`);
      } else {
        alert('Une erreur inattendue s\'est produite. Veuillez réessayer.');
      }
    }
  };

  /* ---------------------------------------------------------------------- */
  /*                          Handlers pour cart                            */
  /* ---------------------------------------------------------------------- */
  const handleUpdateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    updateCartQuantity(productId, size, color, quantity);
  };

  const handleRemoveItem = (productId: string, size: string, color: string) => {
    removeFromCart(productId, size, color);
  };

  /* ---------------------------------------------------------------------- */
  /*                                  JSX                                   */
  /* ---------------------------------------------------------------------- */

  if (orderPlaced) {
    return (
      <OrderConfirmation
        orderNumber={orderNumber}
        orderId={orderId}
        shippingInfo={shippingInfo}
        shippingMethod={shippingMethod}
        cartItems={cart}
        subtotal={subtotal}
        deliveryCharge={deliveryCharge}
        total={total}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* En‑tête */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Commande</h1>
          <StepIndicator currentStep={currentStep} />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ---------- Colonne gauche: formulaires ---------- */}
          <div className="space-y-8">
            {currentStep === 1 && (
              <ShippingForm
                shippingInfo={shippingInfo}
                shippingMethod={shippingMethod}
                onShippingChange={(e) =>
                  setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                }
                onShippingMethodChange={setShippingMethod}
              />
            )}

            {currentStep === 2 && (
              <PaymentForm
                paymentInfo={paymentInfo}
                onPaymentChange={(e) =>
                  setPaymentInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                }
              />
            )}
          </div>

          {/* ---------- Colonne droite : résumé de commande ---------- */}
          <aside className="lg:pl-8">
            <OrderSummary
              cartItems={cart}
              subtotal={subtotal}
              deliveryCharge={deliveryCharge}
              total={total}
              discountCode={discountCode}
              onDiscountChange={(e) => setDiscountCode(e.target.value)}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />

            {/* ---------- Boutons ---------- */}
            <div className="mt-6 space-y-3">
              {currentStep === 1 && (
                <button
                  onClick={handleContinueToPayment}
                  className="w-full bg-yellow-400 text-black py-3 px-6 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
                >
                  Continuer vers le paiement
                </button>
              )}

              {currentStep === 2 && (
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Traitement en cours…
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Finaliser la commande
                    </>
                  )}
                </button>
              )}

              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep((step) => (step > 1 ? (step - 1) as 1 | 2 : step))}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour
                </button>
              )}

              {currentStep === 1 && (
                <button
                  onClick={() => window.history.back()}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour au panier
                </button>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;