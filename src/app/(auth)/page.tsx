import ErrorModal from "@/components/errorModal";
import SpinIcon from "@/components/spin";
import Colors from "@/constants/Colors";
import { useAuth } from "@/src/context/AuthContext";
import { loginUser } from "@/src/services/userService";
import { defaultErroProps } from "@/src/types/errorTypes";
import { UserLogin } from "@/src/types/userTypes";
import { delay } from "@/src/utils/delay";
import { useFormState } from "@/src/utils/useStatePersolaize";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { useState } from "react";
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function Login() {
  const { login } = useAuth();

  const { state: form, updateField } = useFormState<UserLogin>({
    userName: "",
    passWord: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [onClickButton, setClickButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { state: returnError, updateField: updateErrorField } = useFormState<defaultErroProps>({
    errors: { errors: [""], success: false },
    returnError: false,
  });

  async function getUser() {
    setClickButton(true);

    if (!form || form.userName.length < 2 || form.passWord.length < 6) {
      updateErrorField("returnError", true);
      updateErrorField("errors", { success: false, errors: ["Senha ou Username incorretos"] });
      setClickButton(false);
      return;
    }

    try {
      const response = await loginUser(form);

      login({ token: response.token });
      await delay(2000);
      router.replace('/principal/page');

    } catch (error: any) {
      if (error instanceof Error) {
        setErrorMessage(error.message); // pega a mensagem do throw
      } else {
        setErrorMessage("Ocorreu um erro inesperado.");
      }
    }
    finally {
      setModalVisible(false);
      setClickButton(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.principalWhite }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.headerImg}
            resizeMode="contain"
            source={require("@/assets/images/car.png")}
          />
        </View>

        <Text style={styles.text}>Vaga Segura</Text>
        <Text style={styles.textSubtitle}>
          Seu aplicativo de gerenciamento de estacionamento.
        </Text>

        <View style={styles.form}>
          {/* Usuário */}
          <View style={styles.inputWrapper}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="default"
              onChangeText={(e) => updateField("userName", e)}
              placeholder="Usuário"
              placeholderTextColor={Colors.gray}
              style={styles.inputControl}
              value={form?.userName ?? ""}
            />
          </View>

          {/* Senha */}
          <View style={styles.inputWrapper}>
            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={(e) => updateField("passWord", e)}
              placeholder="********"
              placeholderTextColor={Colors.gray}
              style={styles.inputControl}
              secureTextEntry={!showPassword}
              value={form?.passWord ?? ""}
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

          <TouchableOpacity style={styles.button} onPress={getUser} disabled={onClickButton}>
            {onClickButton ? <SpinIcon /> : <Text style={styles.buttonText}>Entrar</Text>}
          </TouchableOpacity>

          {/* Exibir erros */}
          {errorMessage && (
                 <ErrorModal
                   visible={!!errorMessage}
                   message={errorMessage}
                   onClose={() => setErrorMessage(null)}
                 />
               )}
        </View>
      </View>
    </SafeAreaView>
  );
}
