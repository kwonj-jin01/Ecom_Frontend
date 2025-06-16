export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
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

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  gender: string;
  image: string;
  hoverImage?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  colors: string[];
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