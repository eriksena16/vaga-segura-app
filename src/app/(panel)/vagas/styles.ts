import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
        padding: 20,
    },
    card: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,

        // efeito 3D (sombra superior + sombra inferior)
        shadowColor: "#000",
        shadowOffset: { width: -3, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 8,

        borderWidth: 1,
        borderColor: "#e5e7eb",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: Colors.secundaryBlue,
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: "#333",
        marginRight: 10,
        borderRadius: 10
    },
    checked: {
        backgroundColor: Colors.secundaryBlue,
    },
    checkboxLabel: {
        fontSize: 16,
    },
});
