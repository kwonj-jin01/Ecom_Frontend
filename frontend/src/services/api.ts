import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { LoginData, RegisterData } from "../types/auth";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Flag pour éviter les boucles infinies lors du refresh
let isRefreshing = false;
type FailedRequest = {
  resolve: (value: string | null) => void;
  reject: (reason?: unknown) => void;
};

let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  
  failedQueue = [];
};

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}
// Intercepteur pour gérer les réponses et les erreurs 401
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Éviter la récursion infinie pour les routes d'auth
      if (originalRequest.url?.includes('/login') || 
          originalRequest.url?.includes('/register') ||
          originalRequest.url?.includes('/refresh')) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // Si on est déjà en train de rafraîchir, attendre
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const token = localStorage.getItem("auth_token");
        
        if (!token) {
          throw new Error("No token available");
        }

        // Tentative de rafraîchissement du token avec Sanctum
        const response = await api.post("/refresh");

        if (response.data.success && response.data.token) {
          const newToken = response.data.token;
          
          localStorage.setItem("auth_token", newToken);
          localStorage.setItem("token_expires_at", response.data.expires_at);

          // Traiter la queue des requêtes en attente
          processQueue(null, newToken);

          // Retry la requête originale
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }
          
          return api(originalRequest);
        } else {
          throw new Error("Token refresh failed");
        }

      } catch (refreshError) {
        // Échec du rafraîchissement, déconnecter l'utilisateur
        processQueue(refreshError, null);
        
        console.warn("Token refresh failed, logging out user");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("token_expires_at");
        
        // Rediriger vers la page de connexion
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          window.location.href = "/login";
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data: RegisterData) => api.post("/register", data),
  login: (data: LoginData) => api.post("/login", data),
  logout: () => api.post("/logout"),
  getUser: () => api.get("/user"),
  refresh: () => api.post("/refresh"),
  
  // Nouvelles méthodes pour la gestion des tokens
  getTokens: () => api.get("/tokens"),
  revokeAllTokens: () => api.delete("/tokens"),
};

// Utilitaires pour vérifier l'expiration du token
export const tokenUtils = {
  isTokenExpired: (): boolean => {
    const expiresAt = localStorage.getItem("token_expires_at");
    if (!expiresAt) return true;
    
    const now = new Date().getTime();
    const expiry = new Date(expiresAt).getTime();
    
    // Considérer comme expiré si moins de 5 minutes restantes
    return (expiry - now) < 5 * 60 * 1000;
  },
  
  getTokenExpirationTime: (): Date | null => {
    const expiresAt = localStorage.getItem("token_expires_at");
    return expiresAt ? new Date(expiresAt) : null;
  },
  
  clearAuthData: () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("token_expires_at");
  }
};

export default api;