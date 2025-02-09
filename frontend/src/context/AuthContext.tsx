import React, { createContext, useState } from "react";

interface AuthContextType {
  token: string;
  customerId: string;
  login: (token: string, customerId: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string>(localStorage.getItem("token") || "");
  const [customerId, setCustomerId] = useState<string>(localStorage.getItem("customerId") || "");

  const login = (token: string, customerId: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("customerId", customerId);
    setToken(token);
    setCustomerId(customerId);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("customerId");
    setToken("");
    setCustomerId("");
  };

  return (
    <AuthContext.Provider value={{ token, customerId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
