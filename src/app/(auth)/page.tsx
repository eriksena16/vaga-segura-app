import { useState } from "react";
import { Image, SafeAreaView, Text, TextInput, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import Colors from "@/constants/Colors";
import { Ionicons } from '@expo/vector-icons'; // ícones para mostrar/ocultar senha

export default function Home() {
  const [form, setForm] = useState({ user: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // controla visibilidade

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.principalWhite }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.headerImg} resizeMode="contain" source={require("@/assets/images/car.png")} />
        </View>
        <Text style={styles.text}>Vaga Segura</Text>
        <Text style={styles.textSubtitle}>Seu aplicativo de gerenciamento de estacionamento.</Text>

        <View style={styles.form}>
          {/* Usuário */}
          <View style={styles.inputWrapper}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="default"
              onChangeText={user => setForm({ ...form, user })}
              placeholder="Usuário"
              placeholderTextColor={Colors.gray}
              style={styles.inputControl}
              value={form.user}
            />
          </View>

          {/* Senha */}
          <View style={styles.inputWrapper}>
            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={password => setForm({ ...form, password })}
              placeholder="********"
              placeholderTextColor={Colors.gray}
              style={styles.inputControl}
              secureTextEntry={!showPassword}  // 👈 alterna visibilidade
              value={form.password}
            />
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color={Colors.gray}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
