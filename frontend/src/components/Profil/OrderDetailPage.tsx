import React from "react";
import {
  ArrowLeft,
  
  CreditCard,
  
  MapPin,
  Package,
  Truck,
  User,
} from "lucide-react";
import type { Order } from "../../types";



/**
 * Détail d'une commande unique.
 */
export const OrderDetailPage: React.FC<{ order: Order; onBack: () => void }> = ({ order, onBack }) => (
  <div className="min-h-screen bg-gray-50">
    {/* Header */}
    <div className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-lg mr-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Détails de la commande {order.id}</h1>
            <p className="text-green-100 mt-1">Commande passée le {order.date}</p>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Informations principales */}
        <div className="lg:col-span-2 space-y-6">
          {/* Articles commandés */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Package className="w-5 h-5 mr-2 text-green-600" />
              Articles commandés
            </h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl">{item.image}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-gray-600">
                      {item.color} • {item.size} • Quantité: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{item.total.toFixed(2)}€</p>
                    <p className="text-sm text-gray-600">{item.price.toFixed(2)}€ / unité</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Adresses */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-green-600" />
              Adresses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Adresse de livraison</h3>
                <p className="text-gray-600">{order.customer.shippingAddress}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Adresse de facturation</h3>
                <p className="text-gray-600">{order.customer.billingAddress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Statut */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Statut de la commande</h2>
            <div className="text-center">
              <span className={`inline-block px-4 py-2 rounded-full text-lg font-semibold ${
                order.status === 'Paid' 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-blue-100 text-blue-800 border border-blue-200'
              }`}>
                {order.status}
              </span>
            </div>
          </div>

          {/* Informations client */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-green-600" />
              Client
            </h2>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-gray-900">{order.customer.name}</p>
                <p className="text-gray-600">{order.customer.email}</p>
                <p className="text-gray-600">{order.customer.phone}</p>
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm text-gray-600">
                  {order.customer.orderCount} commande(s) au total
                </p>
              </div>
            </div>
          </div>

          {/* Résumé financier */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-green-600" />
              Résumé
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Sous-total:</span>
                <span>{order.summary.subtotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Livraison:</span>
                <span>{order.summary.delivery.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes:</span>
                <span>{order.summary.tax.toFixed(2)}€</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-xl">
                <span className="text-gray-900">Total:</span>
                <span className="text-green-600">{order.summary.total.toFixed(2)}€</span>
              </div>
            </div>
          </div>

          {/* Livraison */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Truck className="w-5 h-5 mr-2 text-green-600" />
              Livraison
            </h2>
            <p className="text-gray-600">{order.courier}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default OrderDetailPage;
