// context/AuthContext.tsx
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { authAPI } from '../services/api';
import { AxiosError } from 'axios';

/* ───── Types ────────────────────────────────────────────── */
export interface User {
  id: string | number;
  name: string;
  email: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
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
  login: (
    credentials: LoginCredentials,
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    data: RegisterData,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loading: boolean;
}

/* ───── Constantes ───────────────────────────────────────── */
const TOKEN_KEY = 'authToken';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

/* ───── Provider ─────────────────────────────────────────── */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /* Helpers */
  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await authAPI.getUser(); // GET /user
      setUser(data);
    } catch {
      clearSession();
    } finally {
      setLoading(false);
    }
  }, [clearSession]);

  /* Bootstrapping (refresh / F5) */
  useEffect(() => {
    if (localStorage.getItem(TOKEN_KEY)) fetchUser();
    else setLoading(false);
  }, [fetchUser]);

  /* Actions */
  const login = async ({
    email,
    password,
  }: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data } = await authAPI.login({ email, password });
      localStorage.setItem(TOKEN_KEY, data.token);
      setUser(data.user);
      return { success: true };
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      return { success: false, error: err.response?.data?.message || 'Login failed' };
    }
  };

  /** ⚠️ Pas d’auto‑login après inscription : on laisse l’UI rediriger vers /login */
  const register = async (
    {
      firstName,
      lastName,
      email,
      password,
      phone,
      country,
      sportType,
    }: RegisterData,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      await authAPI.register({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirmation: password,
        phone,
        country,
        sport_type: sportType,
      });
      return { success: true };
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      return {
        success: false,
        error: err.response?.data?.message || 'Registration failed',
      };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } finally {
      clearSession();
    }
  };

  /* Context value */
  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
