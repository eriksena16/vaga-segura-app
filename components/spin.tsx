import { SpinIconProps } from "@/src/types/userTypes";
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

const SpinIcon: React.FC<SpinIconProps> = ({
  size = 24,
  color = "#fff",
  duration = 1000,
}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animation.start();

    // cleanup da animação quando o componente desmontar
    return () => animation.stop();
  }, [rotateAnim, duration]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <FontAwesome name="spinner" size={size} color={color} />
    </Animated.View>
  );
};

export default SpinIcon;
