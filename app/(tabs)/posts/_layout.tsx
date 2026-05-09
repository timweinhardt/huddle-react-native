import { Stack } from "expo-router";

export default function PostsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]/index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]/edit" options={{ headerShown: false }} />
      <Stack.Screen
        name="create"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
