import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  
} from 'react';
import { AxiosError } from 'axios';
import { authAPI } from '../services/api';

/* ───── Types ────────────────────────────────────────────── */
export interface User {
  id: string;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  country?: string;
  sport_type?: string;
  avatar?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  country?: string;
  sportType?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  loading: boolean;
  isAuthenticated: boolean;
}

/* ───── Constantes ───────────────────────────────────────── */
const TOKEN_KEY = 'auth_token';
const TOKEN_EXPIRES_KEY = 'token_expires_at';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ───── Utilitaires ──────────────────────────────────────── */
const isTokenExpired = (): boolean => {
  const expiresAt = localStorage.getItem(TOKEN_EXPIRES_KEY);
  if (!expiresAt) return true;
  
  const now = new Date().getTime();
  const expiry = new Date(expiresAt).getTime();
  
  // Considérer comme expiré si moins de 5 minutes restantes
  return (expiry - now) < 5 * 60 * 1000;
};

const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRES_KEY);
};

/* ───── Provider ─────────────────────────────────────────── */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const clearSession = useCallback(() => {
    clearAuthData();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const fetchUser = useCallback(async (): Promise<boolean> => {
    try {
      console.log('📥 Fetching user...');
      const { data } = await authAPI.getUser();
      
      if (data.success && data.user) {
        console.log('✅ User fetched:', data.user);
        setUser(data.user);
        setIsAuthenticated(true);
        
        // Mettre à jour l'expiration du token si fournie
        if (data.token_expires_at) {
          localStorage.setItem(TOKEN_EXPIRES_KEY, data.token_expires_at);
        }
        
        return true;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.warn('⚠️ Failed to fetch user:', error);
      clearSession();
      return false;
    }
  }, [clearSession]);

  const refreshToken = useCallback(async (): Promise<boolean> => {
    try {
      console.log('🔄 Refreshing token...');
      const { data } = await authAPI.refresh();
      
      if (data.success && data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(TOKEN_EXPIRES_KEY, data.expires_at);
        console.log('✅ Token refreshed successfully');
        return true;
      }
      
      return false;
    } catch (error) {
      console.warn('⚠️ Token refresh failed:', error);
      clearSession();
      return false;
    }
  }, [clearSession]);

  // Vérification périodique du token
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      
      if (!token) {
        setLoading(false);
        return;
      }

      // Vérifier si le token est expiré
      if (isTokenExpired()) {
        console.log('🔄 Token expired, attempting refresh...');
        const refreshed = await refreshToken();
        
        if (!refreshed) {
          setLoading(false);
          return;
        }
      }

      // Récupérer les données utilisateur
      await fetchUser();
      setLoading(false);
    };

    checkAuth();

    // Vérification périodique toutes les 10 minutes
    const interval = setInterval(async () => {
      if (isTokenExpired() && isAuthenticated) {
        console.log('🔄 Periodic token refresh...');
        await refreshToken();
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchUser, refreshToken, isAuthenticated]);

  const login = async ({ email, password }: LoginCredentials) => {
    try {
      setLoading(true);
      const { data } = await authAPI.login({ email, password });
      
      if (data.success) {
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(TOKEN_EXPIRES_KEY, data.expires_at);
        
        setUser(data.user);
        setIsAuthenticated(true);
        
        console.log('✅ Login successful:', data.user);
        return { success: true };
      } else {
        return { success: false, error: data.message || 'Login failed' };
      }
    } catch (e) {
      const err = e as AxiosError<{ message: string; success: boolean }>;
      console.error('❌ Login failed:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Login failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      const response = await authAPI.register({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
        password_confirmation: data.password,
      });
      
      if (response.data.success) {
        console.log('✅ Registration successful');
        return { success: true };
      } else {
        return { success: false, error: response.data.message || 'Registration failed' };
      }
    } catch (e) {
      const err = e as AxiosError<{ message: string; success: boolean }>;
      console.error('❌ Registration failed:', err);
      return {
        success: false,
        error: err.response?.data?.message || 'Registration failed',
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authAPI.logout();
      console.log('✅ Logout successful');
    } catch (error) {
      console.warn('⚠️ Logout error:', error);
    } finally {
      clearSession();
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      refreshToken,
      loading, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
