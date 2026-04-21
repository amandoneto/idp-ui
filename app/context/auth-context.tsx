"use client";

import React, { createContext, useContext, useState, useTransition, ReactNode, useEffect } from "react";
import { authApi } from "@/lib/api/auth";
import { User } from "@/types/user";
import { LoginCredentials } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isPending: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

import Cookies from "js-cookie";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Hydrate auth state on mount
  useEffect(() => {
    const hydrate = async () => {
      // Check if we have a token before trying to hydrate
      const token = Cookies.get("auth_token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await authApi.getMe();
        setUser(data.user || data);
      } catch (error) {
        console.error("Auth hydration failed:", error);
        Cookies.remove("auth_token");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    hydrate();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    return new Promise<void>((resolve, reject) => {
      startTransition(async () => {
        try {
          const data = await authApi.login(credentials);
          const userData = data.user || data;
          
          if (userData?.token) {
            // Save token in secure cookie
            Cookies.set("auth_token", userData.token, { 
              expires: 7, 
              secure: true, 
              sameSite: "strict" 
            });
          }

          setUser(userData);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  };

  const logout = () => {
    Cookies.remove("auth_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isPending, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
