import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

function MainLayout() {
  const { dataReturn} = useAuth();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (dataReturn?.token) {
        router.replace("/principal/page");
        return;
      } else {
        router.replace("/(auth)/page");
        return;
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return <Stack screenOptions={{ headerShown: false }}></Stack>;
}
