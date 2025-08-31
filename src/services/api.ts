import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { NEXT_PUBLIC_API_URL } from "../utils/endpoints";

const api = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
});

// Interceptor para adicionar o token automaticamente
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `${token}`;
  }
  return config;
});

export function setupResponseInterceptor(logout: () => void) {
  api.interceptors.response.use(
    (response) => {
      // Aqui você pode tratar sucesso de forma centralizada, se quiser
      if (response.data && !response.data.success && response.data.resons) {
        return Promise.reject(new Error(response.data.resons.join(", ")));
      }
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        logout();
      }

      if (error.response?.data) {
        const apiData = error.response.data as any;
        if (apiData.resons) {
          return Promise.reject(new Error(apiData.resons.join(", ")));
        }
      }

      return Promise.reject(error);
    }
  );
}

// Função para forçar setar ou remover token manualmente, se necessário
export async function setupApiToken(token?: string) {
  if (token) {
    await AsyncStorage.setItem("accessToken", token);
    api.defaults.headers.common["Authorization"] = `${token}`;
  } else {
    await AsyncStorage.removeItem("accessToken");
    delete api.defaults.headers.common["Authorization"];
  }
}

export default api;
