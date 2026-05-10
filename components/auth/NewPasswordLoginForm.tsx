import ErrorModal from "@/components/shared/ErrorModal";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import TextField from "@/components/ui/TextField";
import { Apercu, Colors } from "@/constants/theme";
import { useLoginNewPassword } from "@/hooks/useAuth";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, StyleSheet, Text, View } from "react-native";

type NewPasswordLoginFormValues = {
  newPassword: string;
  repeatedNewPassword: string;
};

const NewPasswordLoginForm = () => {
  const router = useRouter();
  const { mutate: login, isPending } = useLoginNewPassword();
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    watch,
    setError: setFieldError,
    clearErrors,
    formState: { isValid, errors, isDirty },
  } = useForm<NewPasswordLoginFormValues>({
    defaultValues: { newPassword: "", repeatedNewPassword: "" },
    reValidateMode: "onSubmit",
  });

  const password = watch("newPassword");

  const onSubmit = ({
    newPassword,
    repeatedNewPassword,
  }: NewPasswordLoginFormValues) => {
    Keyboard.dismiss();
    login(
      { newPassword },
      {
        onSuccess: () => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        },
        onError: (error: Error) => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          switch (error.name) {
            case "InvalidPasswordException":
              setFieldError("newPassword", {
                message: error.message.replace(
                  "Password does not conform to policy: ",
                  "",
                ),
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

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <Spinner isVisible={isPending} />
      <ErrorModal
        errorCode={error}
        visible={!!error}
        onClose={() => setError("")}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>Let’s create a new password for you</Text>
        <View>
          <Controller
            control={control}
            name="newPassword"
            rules={{ required: "Password is required" }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="New Password"
                placeholder="Enter a new password"
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  if (errors.newPassword) {
                    clearErrors("newPassword");
                  }
                }}
                error={errors.newPassword?.message}
                textContentType="password"
                autoCorrect={false}
                autoComplete="password"
                secureTextEntry={true}
              />
            )}
          />
          <Controller
            control={control}
            name="repeatedNewPassword"
            rules={{
              required: "New Password",
              validate: (value) =>
                value === password || "Passwords do not match",
            }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Confirm New Password"
                placeholder="Re-enter your new password"
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  if (errors.repeatedNewPassword) {
                    clearErrors("repeatedNewPassword");
                  }
                }}
                error={errors.newPassword?.message}
                textContentType="password"
                autoCorrect={false}
                autoComplete="password-new"
                secureTextEntry={true}
              />
            )}
          />
        </View>
        <View style={styles.buttonGroup}>
          <Button
            text="Continue"
            disabled={!isDirty || isPending || !isValid}
            onPress={handleSubmit(onSubmit)}
          />
          <Button text="Go Back" variant="secondary" onPress={handleGoBack} />
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
  },
  subtitle: {
    fontSize: 18,
    fontFamily: Apercu.medium,
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  buttonGroup: {
    gap: 10,
  },
});

export default NewPasswordLoginForm;
