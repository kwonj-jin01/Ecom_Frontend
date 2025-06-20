// types/auth.ts
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