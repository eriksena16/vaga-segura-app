// components/CustomButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from "react-native";

type ButtonSize = "small" | "medium" | "large";

interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  color?: string;
  size?: ButtonSize;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  color = "#3B82F6", // cor padrão (azul)
  size = "medium", // tamanho padrão
}) => {
  return (
    <TouchableOpacity
      style={[styles.base, styles[size], { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={[styles.text, size === "small" && { fontSize: 14 }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
  small: {
    padding: 8,
  },
  medium: {
    padding: 12,
  },
  large: {
    padding: 16,
  },
});

export default CustomButton;
