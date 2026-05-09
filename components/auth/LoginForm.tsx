import ErrorModal from "@/components/shared/ErrorModal";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import TextField from "@/components/ui/TextField";
import { Apercu, Colors } from "@/constants/theme";
import { useLogin } from "@/hooks/useAuth";
import { isValidEmail } from "@/utils/string";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, StyleSheet, Text, View } from "react-native";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    clearErrors,
    setError: setFieldError,
    formState: { isValid, errors, isDirty },
  } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
    reValidateMode: "onSubmit",
  });

  const onSubmit = ({ email, password }: LoginFormValues) => {
    Keyboard.dismiss();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    login(
      { email, password },
      {
        onSuccess: ({ nextStep }) => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          if (
            nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
          ) {
            router.navigate("/new-password");
          }
        },
        onError: (error: Error) => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          switch (error.name) {
            case "NotAuthorizedException":
              setFieldError("password", {
                message: "Incorrect password",
              });
              break;

            case "UserNotFoundException":
              setFieldError("email", {
                message: "Could not find an account with this email",
              });
              break;

            default:
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
      <Spinner isVisible={isPending} />
      <ErrorModal
        errorCode={error}
        visible={!!error}
        onClose={() => setError("")}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Log in</Text>
        <View>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              validate: (v) =>
                isValidEmail(v) || "Please enter a valid email address",
            }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Email Address"
                placeholder="Enter your email"
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  if (errors.email) {
                    clearErrors("email");
                  }
                }}
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                textContentType="emailAddress"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{ required: "Password is required" }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Password"
                placeholder="Enter your password"
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  if (errors.password) {
                    clearErrors("password");
                  }
                }}
                error={errors.password?.message}
                textContentType="password"
                autoCorrect={false}
                autoComplete="password"
                secureTextEntry={true}
              />
            )}
          />
        </View>
        <View style={styles.buttonGroup}>
          <Button
            text="Log in"
            disabled={!isDirty || isPending || !isValid}
            onPress={handleSubmit(onSubmit)}
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
