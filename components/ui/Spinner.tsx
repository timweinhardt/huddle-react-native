import { Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Circle } from "react-native-animated-spinkit";

interface SpinnerProps {
  isVisible: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.overlay} pointerEvents="auto">
      <Circle size={64} color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(255,255,255,0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    elevation: 999,
  },
});

export default Spinner;
