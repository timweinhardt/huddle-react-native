import UserIcon from "@/assets/icons/user.svg";
import { Colors } from "@/constants/theme";
import React from "react";
import { Image, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface PostCardProps {
  avatarUrl?: string;
  style?: StyleProp<ViewStyle>;
}

const PostCard: React.FC<PostCardProps> = ({ avatarUrl, style }) => {
  return (
    <View style={[styles.container, style]}>
      {avatarUrl ? (
        <Image source={{ uri: avatarUrl }} style={styles.image} />
      ) : (
        <UserIcon style={styles.icon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 28,
    height: 28,
    backgroundColor: Colors.border,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderStyle: "solid",
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: 28,
    height: 28,
  },
  icon: {
    maxWidth: 22,
    maxHeight: 22,
    color: Colors.muted,
  },
});

export default PostCard;
