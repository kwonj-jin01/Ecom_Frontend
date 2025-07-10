import { useState } from "react";
import api from "../services/api";
import { User } from "../types";

export interface AuthHook {
  login: (email: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone?: string,
    country?: string,
    sportType?: string
  ) => Promise<boolean>; // 👈 Return type ajouté ici
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  user: User | null;
}

export const useAuth = (): AuthHook => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("auth_token")
  );
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    const { data } = await api.post("/login", { email, password });
    localStorage.setItem("auth_token", data.token);
    setIsAuthenticated(true);
    setUser(data.user);

    console.info("Logged in:", data.user);
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone?: string,
    country?: string,
    sportType?: string
  ): Promise<boolean> => {
    try {
      const { data } = await api.post("/register", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirmation: password,
        phone,
        country,
        sport_type: sportType,
      });

      setUser(data.user);

      console.info("Registered:", data.user);
      return true; // ✅ succès
    } catch (error) {
      console.error("Registration error:", error);
      return false; // ❌ erreur
    }
  };

  const logout = async (): Promise<void> => {
    await api.post("/logout");
    localStorage.removeItem("auth_token");
    setIsAuthenticated(false);
    setUser(null);
  };

  return { login, register, logout, isAuthenticated, user };
};
