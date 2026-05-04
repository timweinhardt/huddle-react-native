import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface CardProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const CustomButton: React.FC<CardProps> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
});

export default CustomButton;
