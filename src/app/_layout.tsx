import { Stack } from "expo-router";
import { useNavigation } from "@react-navigation/native";
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
  const navigation = useNavigation<any>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (dataReturn?.token) {
        navigation.reset({ index: 0, routes: [{ name: '/principal/page' as never }] as any });
        return;
      } else {
        navigation.reset({ index: 0, routes: [{ name: '/(auth)/page' as never }] as any });
        return;
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return <Stack screenOptions={{ headerShown: false }}></Stack>;
}
