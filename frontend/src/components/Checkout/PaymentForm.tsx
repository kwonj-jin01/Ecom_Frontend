import { Shield } from "lucide-react";
import { PaymentInfo } from "../../types";

// Composant Formulaire de Paiement
export const PaymentForm = ({ 
  paymentInfo, 
  onPaymentChange 
}: {
  paymentInfo: PaymentInfo;
  onPaymentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Informations de paiement</h2>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-emerald-500" />
          <span className="text-sm text-gray-600">Paiement sécurisé SSL</span>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Numéro de carte</label>
          <input
            type="text"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={paymentInfo.cardNumber}
            onChange={onPaymentChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date d'expiration</label>
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/AA"
              value={paymentInfo.expiryDate}
              onChange={onPaymentChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
            <input
              type="text"
              name="cvv"
              placeholder="123"
              value={paymentInfo.cvv}
              onChange={onPaymentChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nom du titulaire</label>
          <input
            type="text"
            name="cardholderName"
            placeholder="Nom complet"
            value={paymentInfo.cardholderName}
            onChange={onPaymentChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            required
          />
        </div>
      </div>
    </div>
  </div>
);