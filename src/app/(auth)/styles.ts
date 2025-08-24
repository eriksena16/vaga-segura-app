import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    marginTop: 70,
    marginBottom: 36,
    alignItems: "center",
  },
  headerImg: {
    width: 80,
    height: 80,
  },
  text: {
    fontSize: 35,
    color: Colors.blackBlue,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "center",
  },
  textSubtitle: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: "center",
    marginBottom: 24,
  },
  form: {
    width: "100%",
    alignItems: "center",

  },
  inputWrapper: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    flexDirection: "row",      // para o ícone ficar na mesma linha
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  inputControl: {
    flex: 1,                  // ocupa o espaço restante
    fontSize: 16,
    color: Colors.blackBlue,
  },
  iconButton: {
    marginLeft: 8,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.blackBlue,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: Colors.principalWhite,
    fontSize: 18,
    fontWeight: "bold",
  },
});
