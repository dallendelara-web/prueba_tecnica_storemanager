// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AuthContextType {
  user: any;
  token: string | null;
  refreshToken: string | null;
  login: (data: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isLogged: boolean;
  isAuthenticated: boolean | null;
  refreshTokenFunction: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<AuthContextType['isAuthenticated']>(false);

  // Example: Load initial auth state from localStorage
  useEffect(() => {
    setValues();
  }, []);

  useEffect(() => {
    user?.id ? setIsLoading(false) : setIsLoading(true);
  }, [user]);

  const setValues = async () => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setRefreshToken(storedRefreshToken);
      setIsAuthenticated(true);
    }
  }

  const login = async (data: any) => {
    setIsLoading(true);
    const newUser = data;

    setUser(newUser);
    setToken(newUser?.accessToken);
    setRefreshToken(newUser?.refreshToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('token', newUser?.accessToken);
    localStorage.setItem('refreshToken', newUser?.refreshToken);
    setIsLogged(true);
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsLogged(false);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };

  const refreshTokenFunction = async (token: string) => {
    try {
      setRefreshToken(token);
      localStorage.setItem('refreshToken', token);
      
    } catch (error) {
      console.error('Error al actualizar token del usuario:', error);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    refreshToken,
    login,
    logout,
    isLoading,
    isLogged,
    isAuthenticated,
    refreshTokenFunction
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};