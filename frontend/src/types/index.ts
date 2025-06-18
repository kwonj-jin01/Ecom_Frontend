export interface Product {
  id: string;
  title: string;
  name: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  sizes?: string[];
  quantity?: number; // utilisé dans le panier

  gender: "male" | "female" | "unisex";
  thumbnail: string;
  image: string;
  images: string[];
  colors: string[];
  isNew?: boolean;
  bestSeller?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface CartItem {
  product: Product;
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
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginData {
  email: string;
  password: string;
}
