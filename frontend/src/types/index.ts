// Types
export interface Product {
  id: string;
  title: string;
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  gender: string;
  thumbnail: string;
  image: string;
  hoverImage?: string;
  images: string[];
  colors: string[];
  isNew: boolean;
  isBestSeller?: boolean;
  bestSeller?: boolean;
  inStock?: boolean;
  isOnSale?: boolean;
  originalPrice?: number;
  discount?: number;
  promotion?: string | null;
  sizes?: string[]; // 👈 Ajout de cette ligne
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface CartItem extends Product {
  quantity: number;
  size: string;
}

export interface NavigationItem {
  title: string;
  href: string;
  children?: {
    title: string;
    href: string;
    featured?: boolean;
  }[];
}

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
