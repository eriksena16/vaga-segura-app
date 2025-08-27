import Colors from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require("@/assets/images/car.png")} />
        <Text style={styles.font}>Vaga Segura</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.principalWhite,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    resizeMode: "contain",
    height: 200,
  },
  font: {
    fontSize: 40,
    color: Colors.blackBlue,
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 30,
  },
});
