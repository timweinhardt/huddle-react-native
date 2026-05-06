import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";

import { CustomFonts } from "@/constants/theme";
import React from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

const InitialLayout = () => {
  const isLoggedIn = false;

  return (
    <Stack>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};

export default function RootLayout() {
  useFonts(CustomFonts);

  return (
    <KeyboardProvider>
      <SafeAreaProvider>
        <InitialLayout />
      </SafeAreaProvider>
    </KeyboardProvider>
  );
}
