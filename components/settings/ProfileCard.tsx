import { TextStyles } from "@/constants/theme";
import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import Avatar from "../shared/Avatar";
import Card from "../ui/Card";

interface ProfileCardProps {
  name: string;
  avatarUrl?: string;
  locations: string[];
  role: string;
  style?: StyleProp<ViewStyle>;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  avatarUrl,
  locations,
  role,
  style,
}) => {
  return (
    <Card style={[styles.card, style]}>
      <View style={styles.header}>
        <Avatar avatarUrl={avatarUrl} />
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.role}>{role}</Text>
        <Text style={styles.locations}>
          Location{locations.length > 1 ? "s" : ""} {locations.join(", ")}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 9,
  },
  card: {
    padding: 15,
    gap: 9,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  footer: {
    gap: 4,
  },
  name: {
    fontFamily: TextStyles.title.fontFamily,
    fontSize: TextStyles.title.fontSize,
    color: TextStyles.title.color,
  },
  role: {
    fontFamily: TextStyles.meta.fontFamily,
    fontSize: TextStyles.meta.fontSize,
    color: TextStyles.meta.color,
  },
  locations: {
    fontFamily: TextStyles.meta.fontFamily,
    fontSize: TextStyles.meta.fontSize,
    color: TextStyles.meta.color,
  },
});

export default ProfileCard;
