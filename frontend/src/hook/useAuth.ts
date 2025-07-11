// useAuth.ts
import { useState, useEffect } from "react";
import { authAPI } from "../services/api";
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
    sportType?: string,
    newsletter?: boolean
  ) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

export const useAuth = (): AuthHook => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize auth state on mount
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setIsAuthenticated(true);
      // Optionally fetch user data here
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await authAPI.getUser();
      setUser(data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
      // If fetching user fails, clear auth state
      localStorage.removeItem("auth_token");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };
  /* ------------------------------------------------------------------ */
  /*                               LOGIN                                */
  /* ------------------------------------------------------------------ */
  const login = async (email: string, password: string): Promise<void> => {
    try {
      const { data } = await authAPI.login({ email, password });

      localStorage.setItem("auth_token", data.token);
      setIsAuthenticated(true);
      setUser(data.user);

      console.info("Logged in:", data.user);
    } catch (error) {
      console.error("Login error:", error);
      throw error; // Re-throw to handle in component
    }
  };

  /* ------------------------------------------------------------------ */
  /*                             REGISTER                               */
  /* ------------------------------------------------------------------ */
  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone?: string,
    country?: string,
    sportType?: string,
    newsletter?: boolean
  ): Promise<boolean> => {
    try {
      const registerData = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim().toLowerCase(),
        password,
        password_confirmation: password, // Laravel typically requires this
        phone: phone || null,
        country: country || null,
        sport_type: sportType || null,
        newsletter: newsletter || false,
      };

      console.log("Sending registration data:", registerData);

      const { data } = await authAPI.register(registerData);

      console.info("Registration successful:", data);

      // Don't auto-login after registration, let user login manually
      return true;
    } catch (error) {
      console.error("Registration error:", error);

      // Re-throw the error so the component can handle it properly
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("auth_token");
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return {
    login,
    register,
    logout,
    isAuthenticated,
    user,
    loading,
  };
};
