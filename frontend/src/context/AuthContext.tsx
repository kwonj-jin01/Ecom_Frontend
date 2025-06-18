import { createContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../services/api';
import { AxiosError } from 'axios';

export interface User { id: number; name: string; email: string; avatar?: string; }
interface LoginCredentials { email: string; password: string; }
interface RegisterData { name: string; email: string; password: string; password_confirmation: string; }

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps { children: ReactNode; }

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) checkAuth();
    else setLoading(false);
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authAPI.getUser();
      setUser(response.data);
    } catch {
      localStorage.removeItem('auth_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const res = await authAPI.login(credentials);
      localStorage.setItem('auth_token', res.data.token);
      setUser(res.data.user);
      return { success: true };
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      return {
        success: false,
        error: err.response?.data?.message || 'Login failed',
      };
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const res = await authAPI.register(data);
      localStorage.setItem('auth_token', res.data.token);
      setUser(res.data.user);
      return { success: true };
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      return {
        success: false,
        error: err.response?.data?.message || 'Registration failed',
      };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.warn('Logout failed:', error);
    } finally {
      localStorage.removeItem('auth_token');
      setUser(null);
    }
  };


  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
