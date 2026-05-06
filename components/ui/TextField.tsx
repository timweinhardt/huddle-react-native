import EyeOffIcon from "@/assets/icons/eye-off-outline.svg";
import EyeIcon from "@/assets/icons/eye-outline.svg";
import { Apercu, Colors } from "@/constants/theme";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

interface TextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  containerStyle,
  style,
  secureTextEntry,
  ...rest
}) => {
  const [passwordHidden, setPasswordHidden] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordHidden((prev) => !prev);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          error ? styles.inputContainerError : null,
        ]}
      >
        <TextInput
          style={[styles.input]}
          placeholderTextColor={Colors.textMuted}
          secureTextEntry={secureTextEntry ? passwordHidden : false}
          clearTextOnFocus={false}
          {...rest}
        />
        {secureTextEntry && (
          <Pressable
            style={styles.hidePasswordButton}
            onPress={togglePasswordVisibility}
          >
            {passwordHidden ? (
              <EyeIcon width={24} height={24} color={Colors.muted} />
            ) : (
              <EyeOffIcon width={24} height={24} fill={Colors.muted} />
            )}
          </Pressable>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontFamily: Apercu.regular,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainerError: {
    borderColor: Colors.primary,
  },
  errorText: {
    color: Colors.primary,
    fontFamily: Apercu.medium,
    fontSize: 12,
    marginTop: 4,
  },
  input: {
    padding: 20,
    fontSize: 16,
    fontFamily: Apercu.regular,
    color: Colors.textPrimary,
    flex: 1,
  },
  hidePasswordButton: {
    padding: 15,
  },
});

export default TextField;
