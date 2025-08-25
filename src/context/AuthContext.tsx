import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/userTypes";

export interface DataProps {
  token: string;         // JWT
  userDto?: User | null;
}

interface AuthContextProps {
  dataReturn: DataProps | null;
  login: (dataprops: DataProps | null) => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>; // Novo helper
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [dataReturn, setData] = useState<DataProps | null>(null);
  const STORAGE_KEY = "@VagaSeguraToken";

  useEffect(() => {
    async function getStorageData() {
      const storageData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storageData) {
        setData(JSON.parse(storageData));
      }
    }
    getStorageData();
  }, []);

  async function login(dataprops: DataProps | null) {
    setData(dataprops);
    if (dataprops) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataprops));
    }
  }

  async function logout() {
    setData(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }

  async function getToken(): Promise<string | null> {
    if (dataReturn?.token) return dataReturn.token;
    const storageData = await AsyncStorage.getItem(STORAGE_KEY);
    if (storageData) {
      const parsed: DataProps = JSON.parse(storageData);
      return parsed.token;
    }
    return null;
  }

  return (
    <AuthContext.Provider value={{ dataReturn, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
