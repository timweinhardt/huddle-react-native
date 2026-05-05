import { TextStyles } from "@/constants/theme";
import React from "react";
import { StyleProp, StyleSheet, Text, ViewStyle } from "react-native";

interface HeadingProps {
  children: string;
  style?: StyleProp<ViewStyle>;
}

const Heading: React.FC<HeadingProps> = ({ children, style }) => {
  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    marginTop: 40,
    marginBottom: 15,
    color: TextStyles.heading.color,
    fontFamily: TextStyles.heading.fontFamily,
    fontSize: TextStyles.heading.fontSize,
  },
});

export default Heading;
