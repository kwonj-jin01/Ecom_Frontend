import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import QuantitySelector from '../components/shared/QuantitySelector';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();
  
  useEffect(() => {
    document.title = 'Your Cart - Chance Baaba';
    window.scrollTo(0, 0);
  }, []);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Your Shopping Cart</h1>
        
        {cart.items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="bg-gray-100 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link
              to="/products"
              className="bg-[#1A5276] hover:bg-[#154360] text-white py-3 px-6 rounded-full font-medium transition-colors inline-flex items-center"
            >
              Browse Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">{cart.totalItems} Items in Your Cart</h2>
                    <button
                      onClick={clearCart}
                      className="text-[#C0392B] hover:text-red-700 text-sm font-medium flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear Cart
                    </button>
                  </div>
                  
                  <div className="divide-y">
                    {cart.items.map(item => {
                      const { product, quantity } = item;
                      const discountedPrice = product.discountPercentage
                        ? product.price * (1 - product.discountPercentage / 100)
                        : product.price;
                      
                      return (
                        <div key={product.id} className="py-6 flex flex-col sm:flex-row">
                          <div className="sm:w-24 sm:h-24 h-28 w-full mb-4 sm:mb-0">
                            <img
                              src={product.thumbnail}
                              alt={product.title}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                          
                          <div className="flex-1 sm:ml-6 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between">
                                <Link to={`/products/${product.id}`} className="text-lg font-semibold text-gray-800 hover:text-[#1A5276]">
                                  {product.title}
                                </Link>
                                <div className="text-right">
                                  <div className="font-bold text-gray-800">
                                    {formatPrice(discountedPrice * quantity)}
                                  </div>
                                  {product.discountPercentage && (
                                    <div className="text-sm text-gray-500 line-through">
                                      {formatPrice(product.price * quantity)}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm mt-1">{product.brand}</p>
                            </div>
                            
                            <div className="flex justify-between items-end mt-4">
                              <div>
                                <QuantitySelector
                                  quantity={quantity}
                                  onChange={(newQuantity) => updateQuantity(product.id, newQuantity)}
                                  max={product.stock}
                                />
                              </div>
                              <button
                                onClick={() => removeItem(product.id)}
                                className="text-gray-500 hover:text-[#C0392B] transition-colors"
                                aria-label="Remove item"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="bg-gray-50 px-6 py-4 border-t">
                  <Link 
                    to="/products" 
                    className="text-[#1A5276] hover:text-[#154360] font-medium flex items-center"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
                  
                  <div className="space-y-3 text-gray-600 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium text-gray-800">{formatPrice(cart.totalPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-medium text-gray-800">{cart.totalPrice >= 100 ? 'Free' : formatPrice(10)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span className="font-medium text-gray-800">{formatPrice(cart.totalPrice * 0.10)}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{formatPrice(cart.totalPrice + (cart.totalPrice < 100 ? 10 : 0) + (cart.totalPrice * 0.10))}</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">Including VAT/GST</p>
                  </div>
                  
                  <button
                    className="w-full bg-[#1A5276] hover:bg-[#154360] text-white py-3 px-6 rounded-full font-medium transition-colors flex items-center justify-center"
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                  
                  <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">We Accept</h3>
                    <div className="flex space-x-2">
                      <div className="bg-white p-2 rounded border border-gray-200">
                        <svg className="h-6" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="36" height="24" rx="3" fill="#016FD0"/>
                          <path d="M18.2851 8H23V16" stroke="white" strokeWidth="2"/>
                          <path d="M13 8L18 16" stroke="white" strokeWidth="2"/>
                          <path d="M8 8H13L18 16" stroke="white" strokeWidth="2"/>
                        </svg>
                      </div>
                      <div className="bg-white p-2 rounded border border-gray-200">
                        <svg className="h-6" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="36" height="24" rx="3" fill="#EB001B"/>
                          <circle cx="13.5" cy="12" r="6.5" fill="#FF5F00"/>
                          <circle cx="22.5" cy="12" r="6.5" fill="#F79E1B"/>
                        </svg>
                      </div>
                      <div className="bg-white p-2 rounded border border-gray-200">
                        <svg className="h-6" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="36" height="24" rx="3" fill="#0C4EA2"/>
                          <path d="M13.3 13.5C14.4046 13.5 15.3 12.6046 15.3 11.5C15.3 10.3954 14.4046 9.5 13.3 9.5C12.1954 9.5 11.3 10.3954 11.3 11.5C11.3 12.6046 12.1954 13.5 13.3 13.5Z" fill="#FFFFFF"/>
                          <path d="M21.2 13.5C22.3046 13.5 23.2 12.6046 23.2 11.5C23.2 10.3954 22.3046 9.5 21.2 9.5C20.0954 9.5 19.2 10.3954 19.2 11.5C19.2 12.6046 20.0954 13.5 21.2 13.5Z" fill="#FFFFFF"/>
                        </svg>
                      </div>
                      <div className="bg-white p-2 rounded border border-gray-200">
                        <svg className="h-6" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="36" height="24" rx="3" fill="#FFFFFF"/>
                          <path d="M14.2 9C15.3046 9 16.2 10.1193 16.2 11.5C16.2 12.8807 15.3046 14 14.2 14C13.0954 14 12.2 12.8807 12.2 11.5C12.2 10.1193 13.0954 9 14.2 9Z" fill="#21A2DE"/>
                          <path d="M22.2 9C23.3046 9 24.2 10.1193 24.2 11.5C24.2 12.8807 23.3046 14 22.2 14C21.0954 14 20.2 12.8807 20.2 11.5C20.2 10.1193 21.0954 9 22.2 9Z" fill="#EFC75E"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;