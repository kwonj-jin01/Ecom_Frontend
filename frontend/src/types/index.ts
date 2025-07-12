// Types de base pour les produits
export interface Product {
  id: string;
  title: string;
  name: string;
  description: string;
  stock: string;
  price: string; // API returns string
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
  details: ProductDetail[];
  about: string;
  images: string[];
  created_at: string;
  updated_at: string;
}

// Type pour les détails du produit
export interface ProductDetail {
  label: string;
  value: string;
}

// Type pour les tailles avec stock
export interface ProductSize {
  id: string;
  size: string;
  stock: number;
}

// Type pour les couleurs avec code hex
export interface ProductColor {
  id: string;
  name: string;
  hex?: string;
}

// Type pour les produits avec données détaillées
export interface ProductDetailData extends Product {
  specifications: ProductDetail[];
  full_description: string;
  available_sizes: ProductSize[];
  available_colors: ProductColor[];
}

// Type pour les données processées côté client
export interface ProcessedProduct
  extends Omit<Product, "price" | "original_price" | "discount" | "rating"> {
  price: number;
  original_price: number;
  discount: number;
  rating: number;
  image: string;
  images: string[];
}

// Type pour les catégories
export interface Category {
  id: string;
  name: string;
  image: string;
}

// Type pour les éléments du panier
export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}
export interface ShippingInfo {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  district: string;
  country: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  mobileNumber: string;
  mobileName: string;
  waveNumber: string;
}
// Type pour les utilisateurs
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  country?: string;
  sportType?: string;
}

// Type pour la navigation
export interface NavigationItem {
  title: string;
  href: string;
  children?: {
    title: string;
    href: string;
    featured?: boolean;
  }[];
}

// Type pour les réponses API
export interface ApiResponse<T> {
  status: "success" | "error";
  data?: T;
  message?: string;
}

// ---------------------------------------------------------------------------
// Shared TypeScript types for the user‑profile / e‑commerce demo application
// ---------------------------------------------------------------------------

// --------------------------- Navigation & Layout ---------------------------
export type PageKey =
  | "profile"
  | "orders"
  | "order-detail"
  | "favorites"
  | "settings";

// ------------------------------ Mega‑Menu ----------------------------------
export interface MenuSection {
  title: string;
  items: string[];
}
// Types
export interface Favorite {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}
export interface MenuEntry {
  sections: MenuSection[];
  bottomLinks?: string[];
}

export type MenuData = Record<string, MenuEntry>;
// -------------------------------- Payment ----------------------------------

// --------------------------- Profil / Utilisateur --------------------------
export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
}

// ------------------------------ Commandes ----------------------------------
export interface OrderItem {
  id: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  total: number;
  image: string;
}

export interface OrderSummary {
  subtotal: number;
  delivery: number;
  tax: number;
  total: number;
  itemCount: number;
}

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
  orderCount: number;
  shippingAddress: string;
  billingAddress: string;
}

export interface Order {
  id: string;
  date: string;
  status: string;
  statusColor: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    orderCount: number;
    shippingAddress: string;
    billingAddress: string;
  };
  items: Array<{
    id: string;
    name: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
    total: number;
    image: string;
  }>;
  summary: {
    subtotal: number;
    delivery: number;
    tax: number;
    total: number;
    itemCount: number;
  };
  courier: string;
}

// -------------------------------- Favoris ----------------------------------
export interface Favorite {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

// ---------------------------------------------------------------------------
// Ajoute d'autres types ici au fur et à mesure que l'application grandit.
// ---------------------------------------------------------------------------
