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
  quantity: number;
}

// Type pour les utilisateurs
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
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

// Types pour l'authentification
export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
  country?: string;
  sport_type?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Type pour les réponses API
export interface ApiResponse<T> {
  status: "success" | "error";
  data?: T;
  message?: string;
}
