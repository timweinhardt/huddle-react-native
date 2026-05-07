import WarningIcon from "@/assets/icons/warning.svg";
import Button from "@/components/ui/Button";
import { Apercu, Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

interface ErrorModalProps {
  title?: string;
  subtitle?: string;
  errorCode: string;
  visible: boolean;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  title = "Sorry!",
  subtitle = "An unexpected error has occurred. Please try again later.",
  errorCode,
  visible,
  onClose,
}) => {
  return (
    <Modal
      isVisible={visible}
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={200}
      backdropOpacity={0.4}
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <View style={styles.background}>
        <View style={styles.container}>
          <WarningIcon width={60} height={60} fill={Colors.warning} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          {errorCode && (
            <Text style={styles.subtitle}>{`(Error: ${errorCode})`}</Text>
          )}
          <Button style={styles.button} text="Okay" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    gap: 15,
    borderRadius: 8,
    padding: 20,
    position: "absolute",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    fontFamily: Apercu.medium,
    fontSize: 18,
    color: Colors.accent,
  },
  subtitle: {
    textAlign: "center",
    fontFamily: Apercu.regular,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  button: {
    alignSelf: "stretch",
  },
});

export default ErrorModal;
