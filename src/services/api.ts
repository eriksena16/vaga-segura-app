import axios, { AxiosError } from "axios";
import { NEXT_PUBLIC_API_URL } from "../utils/endpoints";

const api = axios.create({
  baseURL: NEXT_PUBLIC_API_URL
});

export function setupResponseInterceptor(logout: () => void){
  api.interceptors.response.use(
    (response) => response, 
    (error: AxiosError) => {
      if(error.response?.status ===401){
        logout();
      }
      return Promise.reject(error);
    }
  )
}

export function setupApiToken(token : string | undefined){
  if(token){
    api.defaults.headers.common["Authorization"] = `${token}`;
  }else{
    delete api.defaults.headers.common["Authorization"];
  }
}

export default api;
