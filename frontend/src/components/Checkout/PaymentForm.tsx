import { Shield, Smartphone, CreditCard, Waves } from "lucide-react";
import { useState } from "react";
import { PaymentInfo } from "../../types";

// Types de paiement disponibles
const PAYMENT_METHODS = [
  { value: "card", label: "Carte Visa", icon: CreditCard },
  { value: "mobile_money", label: "Mobile Money", icon: Smartphone },
  { value: "wave", label: "Wave", icon: Waves },
];

// Composant principal
export const PaymentForm = ({
  paymentInfo,
  onPaymentChange,
}: {
  paymentInfo: PaymentInfo;
  onPaymentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [method, setMethod] = useState<"card" | "mobile_money" | "wave">("card");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Informations de paiement</h2>

        {/* Paiement sécurisé */}
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-emerald-500" />
          <span className="text-sm text-gray-600">Paiement sécurisé SSL</span>
        </div>

        {/* Sélection du mode de paiement */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {PAYMENT_METHODS.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setMethod(value as any)}
              type="button"
              className={`border rounded-lg px-4 py-3 flex items-center justify-center gap-2 text-sm font-medium transition-all ${
                method === value
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-gray-300 text-gray-600 hover:border-emerald-400"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Formulaire en fonction du choix */}
        {method === "card" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Numéro de carte</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={paymentInfo.cardNumber}
                onChange={onPaymentChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        )}

        {method === "mobile_money" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Numéro Mobile Money</label>
              <input
                type="tel"
                name="mobileNumber"
                placeholder="Ex: 0700000000"
                value={paymentInfo.mobileNumber}
                onChange={onPaymentChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom du titulaire</label>
              <input
                type="text"
                name="mobileName"
                placeholder="Nom associé"
                value={paymentInfo.mobileName}
                onChange={onPaymentChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        )}

        {method === "wave" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Numéro Wave</label>
              <input
                type="tel"
                name="waveNumber"
                placeholder="Ex: 0700000000"
                value={paymentInfo.waveNumber}
                onChange={onPaymentChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom du compte Wave</label>
              <input
                type="text"
                name="waveName"
                placeholder="Nom associé"
                value={paymentInfo.waveName}
                onChange={onPaymentChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
