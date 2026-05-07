import ErrorModal from "@/components/shared/ErrorModal";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import TextField from "@/components/ui/TextField";
import { Apercu, Colors } from "@/constants/theme";
import { useLogin } from "@/hooks/useAuth";
import { isValidEmail } from "@/utils/string";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailPasswordError, setEmailPasswordError] = useState("");

  const { mutate: login, isPending } = useLogin();

  const enableSubmit = email.trim() !== "" && password.trim() !== "";

  const handleLogin = () => {
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    setPasswordError("");

    login(
      { email, password },
      {
        onSuccess: ({ nextStep }) => {
          if (nextStep.signInStep === "DONE") {
            // triggers Stack.Protected to redirect
          } else if (nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_SMS_CODE") {
            //router.push("/mfa"); // navigate to MFA screen if enabled
          }
        },
        onError: (error: Error) => {
          if (error.name === "NotAuthorizedException") {
            setEmailPasswordError("Incorrect email or password");
          } else if (error.name === "UserNotFoundException") {
            setEmailError("Could not find an account with this email");
          } else {
            setError(error.name);
            console.log(error);
          }
        },
      },
    );
  };

  const handleForgotPassword = () => {};

  return (
    <>
      {isPending ? <Spinner /> : null}
      <ErrorModal
        errorCode={error}
        visible={!!error}
        onClose={() => setError("")}
      />
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
              if (emailPasswordError) setEmailPasswordError("");
            }}
            error={emailPasswordError ? emailPasswordError : emailError}
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
            error={emailPasswordError ? emailPasswordError : passwordError}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError("");
              if (emailPasswordError) setEmailPasswordError("");
            }}
            autoComplete="off"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.buttonGroup}>
          <Button
            text="Log in"
            disabled={!enableSubmit}
            onPress={handleLogin}
          />
          <Button
            text="Forgot password?"
            variant="secondary"
            onPress={handleForgotPassword}
          />
        </View>
      </View>
    </>
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
