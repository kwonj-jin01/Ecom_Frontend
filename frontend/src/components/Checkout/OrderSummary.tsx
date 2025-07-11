import React from "react";
import { Plus, Minus } from "lucide-react";
import { CartItem } from "../../context/CartContext";


// Composant Résumé de Commande
export const OrderSummary = ({ 
  cartItems, 
  subtotal, 
  deliveryCharge, 
  total, 
  discountCode,
  onDiscountChange,
  onUpdateQuantity,
  onRemoveItem 
}: {
  cartItems: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  discountCode: string;
  onDiscountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  onRemoveItem: (productId: string, size: string, color: string) => void;
}) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
    <h2 className="text-lg font-semibold text-gray-900 mb-6">Résumé de commande</h2>
    
    <div className="space-y-4 mb-6">
      {cartItems.map(item => (
        <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={item.product.thumbnail} 
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <button
              onClick={() => onRemoveItem(item.product.id, item.size, item.color)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              ×
            </button>
          </div>
          
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 text-sm">{item.product.title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-4 h-4 bg-black rounded-full"></span>
              <span className="text-sm text-gray-600">{item.color}</span>
              <span className="text-sm text-gray-600">•</span>
              <span className="text-sm text-gray-600">{item.size}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <button
                onClick={() => onUpdateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-8 text-center text-sm">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <span className="text-emerald-600 font-medium ml-2">{parseFloat(item.product.price).toFixed(2)}€</span>
          </div>
        </div>
      ))}
    </div>

    <div className="border-t pt-4">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Code promo"
          value={discountCode}
          onChange={onDiscountChange}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
        />
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
          Appliquer
        </button>
      </div>
    </div>

    <div className="space-y-3 mb-6">
      <div className="flex justify-between">
        <span className="text-gray-600">Sous-total</span>
        <span className="font-medium">{subtotal.toFixed(2)}€</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Frais de livraison</span>
        <span className="font-medium">{deliveryCharge.toFixed(2)}€</span>
      </div>
      <div className="flex justify-between text-lg font-semibold pt-3 border-t">
        <span>Total</span>
        <span className="text-emerald-600">{total.toFixed(2)}€</span>
      </div>
    </div>
  </div>
);