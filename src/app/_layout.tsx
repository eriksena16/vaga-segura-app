import { Stack, router } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { isTokenValid } from "../utils/jwt";

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

function MainLayout() {
  const { dataReturn } = useAuth();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (dataReturn?.token && isTokenValid(dataReturn.token)) {
        router.replace("/principal/page"); 
      } else {
        router.replace("/(auth)/page"); 
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [dataReturn]);

  return <Stack screenOptions={{ headerShown: false }} />;
}


