import  {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

/* -------------------------------------------------------------------------- */
/*                                  Types                                     */
/* -------------------------------------------------------------------------- */

export interface Product {
  id: string;
  name: string;
  title: string;        // ← Added for consistency with components
  price: string;        // ← Changed to string to match component usage
  image: string;
  thumbnail: string;    // ← Added for consistency with components
  description?: string;
  category?: string;
}

export interface CartItem {
  product: Product;     // ← Changed to nested product structure
  quantity: number;
  size: string;         // ← Made required as components expect it
  color: string;        // ← Made required as components expect it
}

interface CartContextType {
  cart: CartItem[];

  /* Actions */
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateCartQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;

  /* Sélecteurs / Helpers */
  getSubtotal: () => number;
  getTotalPrice: () => number;     // alias pour compatibilité
  getTotalCartItems: () => number;
}

/* -------------------------------------------------------------------------- */
/*                                 Contexte                                   */
/* -------------------------------------------------------------------------- */

const CartContext = createContext<CartContextType | undefined>(undefined);

/* -------------------------------------------------------------------------- */
/*                                 Provider                                   */
/* -------------------------------------------------------------------------- */

export const CartProvider = ({ children }: { children: ReactNode }) => {
  /* Chargement initial depuis localStorage (optionnel) */
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  /* Persistance automatique (optionnel) */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ------------------------------ Actions --------------------------------- */

  const addToCart = (product: Product, size: string, color: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => 
        item.product.id === product.id && 
        item.size === size && 
        item.color === color
      );
      
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && 
          item.size === size && 
          item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, { product, quantity: 1, size, color }];
    });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart((prev) => prev.filter((item) => 
      !(item.product.id === productId && item.size === size && item.color === color)
    ));
  };

  const updateCartQuantity = (productId: string, size: string, color: string, quantity: number) => {
    setCart((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => 
          !(item.product.id === productId && item.size === size && item.color === color)
        );
      }
      
      return prev.map((item) =>
        item.product.id === productId && 
        item.size === size && 
        item.color === color
          ? { ...item, quantity }
          : item
      );
    });
  };

  const clearCart = () => setCart([]);

  /* ----------------------------- Sélecteurs ------------------------------ */

  const getSubtotal = () =>
    cart.reduce((total, item) => total + parseFloat(item.product.price) * item.quantity, 0);

  const getTotalCartItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  /* --------------------------- Valeur exposée ---------------------------- */

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getSubtotal,
    getTotalPrice: getSubtotal, // alias
    getTotalCartItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/* -------------------------------------------------------------------------- */
/*                                   Hook                                     */
/* -------------------------------------------------------------------------- */

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};