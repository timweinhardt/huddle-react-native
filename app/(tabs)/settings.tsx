import ProfileCard from "@/components/settings/ProfileCard";
import Heading from "@/components/shared/Heading";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SettingsScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Heading>Your Profile</Heading>
      <ProfileCard
        name="Tim Weinhardt"
        role="Team Leader"
        locations={["30023", "30003"]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
});

export default SettingsScreen;
