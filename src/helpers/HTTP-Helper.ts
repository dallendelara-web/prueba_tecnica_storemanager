import axios, { type AxiosRequestConfig } from "axios";
import Config from '../constants/config';

// Configura la instancia de axios
const apiClient = axios.create({
  baseURL: Config?.urlBase, // Cambia esta URL a la base de tu API
  timeout: 10000, // Tiempo de espera opcional
  headers: {
    "Content-Type": "application/json",
  },
});

const apiClientMulti = axios.create({
  baseURL: Config?.urlBase,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
  },
});

// Helper general para manejar solicitudes HTTP
const httpRequest = async (
  method: AxiosRequestConfig["method"],
  url: string,
  data = {},
  requiresAuth = false,
  headers = {}
) => {
  interface Config {
    method: AxiosRequestConfig["method"];
    url: string;
    data?: any; // Este campo puede ser opcional si no se usa en todas las solicitudes
    headers?: { [key: string]: string };
  }

  const config: Config = {
    method: method,
    url: url,
    data: method !== "GET" ? data : undefined,
    headers: {
      ...headers,
    },
  };
  console.log(`Solicitud ${method} a: ${url}`);

  if (requiresAuth) {
    try {
      const token = obtenerToken();
      console.log("Token obtenido:", token ? `${token.substring(0, 20)}...` : "NO ENCONTRADO");
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
        console.log("Header Authorization agregado");
      } else {
        console.error("No se obtuvo token para autenticación");
      }
    } catch (tokenError) {
      console.error("Error al obtener token:", tokenError);
    }
  }

  try {
    console.log("📤 CONFIG FINAL:", {
      method: config.method,
      url: config.url,
      hasAuth: !!config.headers?.Authorization
    });
    const response = await apiClient(config);
    console.log("✅ Respuesta recibida:", response.status);
    console.log("📦 Datos recibidos:", response.data);
    return response;
  } catch (error: any) {
    console.error(`Error en la Solicitud ${method} a: ${url}`, error);
    if (error.response) {
      console.error("Respuesta de error:", error.response);
      console.error("📛 Mensaje del backend:", error.response.data?.message || error.response.data);
      console.error("📛 Status:", error.response.status, error.response.statusText);
      // Retornar el objeto completo de error del backend
      return error.response.data;
    }
    throw error;
  }
};

const httpRequestMulti = async ( 
  method: AxiosRequestConfig['method'], 
  url:string, data = {}, 
  requiresAuth = false
) => {
  interface Config {
    method:  AxiosRequestConfig['method'];
    url: string;
    data?: any; // Este campo puede ser opcional si no se usa en todas las solicitudes
    headers?: { [key: string]: string }
  }

  const config:Config = {
    method: method,
    url: url,
    data: method !== 'GET' ? data : undefined,
  };

  if (requiresAuth) {
    const token = await obtenerToken(); 
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  try {
    const response = await apiClientMulti(config);
    return response.data;
  } catch (error:any) {
    //console.error('Error en la solicitud HTTP:', error.response.data);
    throw error;
  }
};

// Función para obtener el token de localStorage
const obtenerToken = (): string | null => {
  try {
    // Primero intentar obtener el token directamente
    let token = localStorage.getItem("refreshToken");
    if (token) {
      // Limpiar el token de espacios y comillas
      token = token.trim().replace(/^["']|["']$/g, '');
      console.log("🔑 Token encontrado en localStorage (directo)");
      console.log("📋 Token (primeros 50 chars):", token.substring(0, 50));
      return token;
    }

    // Si no está el token directamente, intentar obtener userData
    const userDataStr = localStorage.getItem("userData");
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      if (userData?.token) {
        let token = userData.token.trim().replace(/^["']|["']$/g, '');
        console.log("🔑 Token encontrado en userData");
        console.log("📋 Token (primeros 50 chars):", token.substring(0, 50));
        return token;
      }
    }

    // Último intento: obtener del objeto user
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user?.token) {
        let token = user.token.trim().replace(/^["']|["']$/g, '');
        console.log("🔑 Token encontrado en user");
        console.log("📋 Token (primeros 50 chars):", token.substring(0, 50));
        return token;
      }
    }

    console.warn("⚠️ No se encontró token en localStorage");
    console.log("🔍 Contenido de localStorage:", {
      hasToken: !!localStorage.getItem("token"),
      hasUser: !!localStorage.getItem("user"),
      hasUserData: !!localStorage.getItem("userData")
    });
    return null;
  } catch (e) {
    console.error("❌ Error al obtener token de localStorage:", e);
    return null;
  }
};

// Funciones específicas para cada tipo de solicitud
const getRequest = (url: string, requiresAuth = false, headers = {}) => {
  return httpRequest("GET", url, {}, requiresAuth, headers);
};

const postRequest = (
  url: string,
  data: any,
  requiresAuth = false,
  headers = {}
) => {
  return httpRequest("POST", url, data, requiresAuth, headers);
};

const putRequest = (
  url: string,
  data: any,
  requiresAuth = false,
  headers = {}
) => {
  return httpRequest("PUT", url, data, requiresAuth, headers);
};

const patchRequest = (
  url: string,
  data: any,
  requiresAuth = false,
  headers = {}
) => {
  return httpRequest("PATCH", url, data, requiresAuth, headers);
};

const deleteRequest = (url: string, requiresAuth = false, headers = {}) => {
  return httpRequest("DELETE", url, {}, requiresAuth, headers);
};

const postRequestMulti = (url:string, data:any, requiresAuth = false) => {
  return httpRequestMulti('POST', url, data, requiresAuth);
};

const putRequestMulti = (url:string, data:any, requiresAuth = false) => {
  return httpRequestMulti('PUT', url, data, requiresAuth);
};

export { deleteRequest, getRequest, postRequest, putRequest, patchRequest, postRequestMulti, putRequestMulti };
