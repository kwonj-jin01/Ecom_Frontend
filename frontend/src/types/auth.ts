// types/index.ts or types/auth.ts
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  country?: string;
  sport_type?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string | null;
  country?: string | null;
  sport_type?: string | null;
  newsletter?: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData extends LoginFormData {
  firstName: string;
  lastName: string;
  phone: string;
  confirmPassword: string;
  country: string;
  sportType: string;
  agreeTerms: boolean;
  newsletter: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}