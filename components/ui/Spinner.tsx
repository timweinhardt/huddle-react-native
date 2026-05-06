import { Colors } from "@/constants/theme";
import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Circle } from "react-native-animated-spinkit";

const Spinner: React.FC = () => {
  return (
    <Modal transparent={true} visible={true}>
      <View style={styles.background}>
        <Circle size={64} color={Colors.primary} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Spinner;
