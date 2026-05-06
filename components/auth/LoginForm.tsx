import isValidEmail from "@/app/utils/string";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { Apercu, Colors } from "@/constants/theme";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const enableSubmit = email.trim() !== "" && password.trim() !== "";

  const handleLogin = () => {
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
  };

  const handleForgotPassword = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      <View>
        <TextField
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (emailError) setEmailError("");
          }}
          error={emailError}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          textContentType="emailAddress"
        />
        <TextField
          label="Password"
          placeholder="Enter your password"
          value={password}
          textContentType="password"
          autoCorrect={false}
          onChangeText={setPassword}
          autoComplete="off"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonGroup}>
        <Button text="Log in" disabled={!enableSubmit} onPress={handleLogin} />
        <Button
          text="Forgot password?"
          variant="secondary"
          onPress={handleForgotPassword}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    gap: 10,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 32,
    fontFamily: Apercu.bold,
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  buttonGroup: {
    gap: 10,
  },
});

export default LoginForm;
