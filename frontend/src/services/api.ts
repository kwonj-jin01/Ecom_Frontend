//api.ts
import axios from "axios";
import { LoginData, RegisterData } from "../types/auth";
const API_URL = import.meta.env.VITE_API_URL; // ex. http://127.0.0.1:8000/api

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false, // Mets true si tu passes par cookies/Csrf
});

// Ajout automatique du Bearer
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Déconnexion douce si 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data: RegisterData) => api.post("/register", data),
  login: (data: LoginData) => api.post("/login", data),
  logout: () => api.post("/logout"),
  getUser: () => api.get("/user"),
};

export default api;
