import React, { createContext, useContext, useState, ReactNode } from "react";
import { mockUser } from "@/data/mockData";
import { UserProfile } from "@/data/types";

interface AuthContextType {
  user: UserProfile | null;
  isAdmin: boolean;
  login: (email: string, password: string, name?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (email: string, _password: string) => {
    if (email === "admin@smartdisposal.com") {
      setUser({ ...mockUser, name: "Admin User", email });
      setIsAdmin(true);
    } else {
      setUser({ ...mockUser, email });
      setIsAdmin(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
