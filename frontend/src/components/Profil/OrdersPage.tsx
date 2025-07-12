import React from "react";
import { Calendar, CreditCard, Eye, Package, ShoppingBag, Truck, User } from "lucide-react";
import { Order } from "../../types";




export const OrdersPage: React.FC<{ orders: Order[]; onOrderClick: (id: string) => void }> = ({ orders, onOrderClick }) => (
  <div className="min-h-screen bg-gray-50">
    {/* Header avec gradient */}
    <div className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center">
          <ShoppingBag className="w-8 h-8 mr-3" />
          <h1 className="text-3xl font-bold">Mes Commandes</h1>
        </div>
        <p className="text-green-100 mt-2">Gérez et suivez toutes vos commandes</p>
      </div>
    </div>

    {/* Stats rapides */}
    <div className="max-w-7xl mx-auto px-6 -mt-4 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Commandes</p>
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Package className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Commandes Livrées</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.status === 'Delivered').length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-gray-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Montant Total</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.reduce((sum, order) => sum + order.summary.total, 0).toFixed(2)}€
              </p>
            </div>
            <div className="bg-gray-100 p-3 rounded-full">
              <CreditCard className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Liste des commandes */}
    <div className="max-w-7xl mx-auto px-6 pb-8">
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
          >
            {/* Header de la commande */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Package className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{order.id}</h3>
                    <p className="text-gray-600 flex items-center mt-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      {order.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end mb-2">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${order.status === 'Paid'
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenu de la commande */}
            <div className="px-6 py-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Informations générales */}
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Package className="w-5 h-5 mr-3 text-gray-500" />
                    <span className="font-medium">{order.summary.itemCount} article(s)</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Truck className="w-5 h-5 mr-3 text-gray-500" />
                    <span>{order.courier}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <User className="w-5 h-5 mr-3 text-gray-500" />
                    <span>{order.customer.name}</span>
                  </div>
                </div>

                {/* Résumé financier */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Résumé</h4>
                  <div className="space-y-2 text-sm">
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
                    <div className="border-t pt-2 flex justify-between font-bold text-gray-900">
                      <span>Total:</span>
                      <span className="text-green-600">{order.summary.total.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col justify-center">
                  <button
                    onClick={() => onOrderClick(order.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    Voir les détails
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default OrdersPage;
