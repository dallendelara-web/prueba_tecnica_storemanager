// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AuthContextType {
  user: any;
  token: string | null;
  login: (data: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isLogged: boolean;
  isAuthenticated: boolean | null;
  asignacionDatos: any;
  perfilVistas: any;
  refreshUserData: (perfilId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<AuthContextType['isAuthenticated']>(false);
  const [asignacionDatos, setAsignacionDatos] = useState<AuthContextType['asignacionDatos']>("");
  const [perfilVistas, setPerfilVistas] = useState<AuthContextType['perfilVistas']>("");

  // Example: Load initial auth state from localStorage
  useEffect(() => {
    setValues();
  }, []);

  useEffect(() => {
    user?._id ? setIsLoading(false) : setIsLoading(true);
  }, [user]);

  const setValues = async () => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedAsignacionDatos = localStorage.getItem('asignacionDatos');
    const storedPerfilVistas = localStorage.getItem('perfilVistas');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setAsignacionDatos(storedAsignacionDatos);
      setPerfilVistas(storedPerfilVistas);
      setIsAuthenticated(true);
    }
  }

  const setAsignacionDatosFunc = async (data: any) => {
    const set = [];
    if(data?.length == 0 || data == null || data == undefined){
      return [];
    }

    data?.map((objeto: any, index: any) => {
      if(index == 0){
        let conces = [];
        let marcas = [];
        objeto?.concesionarios_info?.map((conc: any) => {
          conces.push(
            conc?.valor_concesionario
          );
        });
        objeto?.marcas_info?.map((marc: any) => {
          marcas.push(
            marc?.valor_marca
          );
        });

        return set.push({
          concesionarios : conces ?? [],
          marcas: marcas ?? []
        });
      }
    });

    return set[0];
  }

  const setPerfilVistasFunc = async (data: any) => {
    if(!data || data.length === 0) {
      return [];
    }
    return data;
  }

  const login = async (data: any) => {
    setIsLoading(true);
    const newUser = data;
    const datosAsigns = await setAsignacionDatosFunc(newUser?.asignaciones_datos);
    const datosPerfilVistas = await setPerfilVistasFunc(newUser?.perfil_vistas);

    setUser(newUser);
    setToken(newUser?.token);
    setAsignacionDatos(JSON.stringify(datosAsigns));
    setPerfilVistas(JSON.stringify(datosPerfilVistas));
    localStorage.setItem('asignacionDatos', JSON.stringify(datosAsigns));
    localStorage.setItem('perfilVistas', JSON.stringify(datosPerfilVistas));
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('token', newUser?.token);
    setIsLogged(true);
    setIsAuthenticated(true);

    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsLogged(false);
    setIsAuthenticated(false);
    setAsignacionDatos(null);
    setPerfilVistas(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('asignacionDatos');
    localStorage.removeItem('perfilVistas');
  };

  const refreshUserData = async (perfilId: string) => {
    try {
      
    } catch (error) {
      console.error('Error al actualizar datos del usuario:', error);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isLoading,
    isLogged,
    isAuthenticated,
    asignacionDatos,
    perfilVistas,
    refreshUserData
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