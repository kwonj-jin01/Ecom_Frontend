import { CheckCircle } from 'lucide-react';
import { ShippingInfo } from "../../types";
import { StepIndicator } from "./StepIndicator";
import { CartItem } from '../../context/CartContext';

// Props du composant
interface OrderConfirmationProps {
  orderNumber: string;
  orderId: string;
  shippingInfo: ShippingInfo;
  shippingMethod: string;
  cartItems: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
}

// Composant Page de Confirmation
export const OrderConfirmation = ({
  orderNumber,
  orderId,
  shippingInfo,
  shippingMethod,
  cartItems,
  subtotal,
  deliveryCharge,
  total
}: OrderConfirmationProps) => (
  <div className="min-h-screen bg-white">
    <div className="max-w-4xl mx-auto px-4 py-8">
      <StepIndicator currentStep={3} />

      <div className="max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">Merci pour votre commande</h1>
        <p className="text-gray-600 mb-2">
          Commande #{orderNumber}
        </p>
        <p className="text-gray-600 mb-8">
          La confirmation de commande a été envoyée à {shippingInfo.email || 'votre adresse e-mail'}
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Numéro de commande</span>
            <span className="text-gray-900 font-medium">{orderNumber}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Date de transaction</span>
            <span className="text-gray-900">{new Date().toLocaleDateString('fr-FR')}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Mode de paiement</span>
            <span className="text-gray-900">Carte de crédit</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Mode de livraison</span>
            <span className="text-gray-900">
              {shippingMethod === 'free' ? 'Livraison gratuite' :
                shippingMethod === 'regular' ? 'Livraison standard' : 'Livraison express'}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Statut</span>
            <span className="text-orange-600 font-medium">En attente</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Votre commande</h3>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex items-center gap-4">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1 text-left">
                  <h4 className="font-medium text-gray-900">{item.product.title || item.product.name}</h4>
                  <p className="text-sm text-gray-600">
                    {item.color && `${item.color} • `}
                    {item.size && `${item.size} • `}
                    Quantité: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-600 font-medium">{parseFloat(item.product.price).toFixed(2)} XOF</p>
                  <p className="text-sm text-gray-600">×{item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 mb-8">
          <div className="flex justify-between">
            <span className="text-gray-600">Sous-total</span>
            <span className="text-gray-900">{subtotal.toFixed(2)} XOF</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Frais de livraison</span>
            <span className="text-gray-900">{deliveryCharge.toFixed(2)} XOF</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-2">
            <span>Total</span>
            <span className="text-emerald-600">{total.toFixed(2)} XOF</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => window.location.href = '/mes-commandes'}
            className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            Voir mes commandes
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-yellow-400 text-black py-3 px-6 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
          >
            Continuer mes achats
          </button>
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Que se passe-t-il maintenant ?</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Vous recevrez un email de confirmation sous peu</li>
            <li>• Votre commande sera traitée dans les 24h</li>
            <li>• Vous serez notifié à chaque étape de livraison</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);