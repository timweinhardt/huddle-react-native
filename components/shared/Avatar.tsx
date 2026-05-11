import UserIcon from "@/assets/icons/user.svg";
import { Colors } from "@/constants/theme";
import { Image, ImageProps } from "expo-image";
import React from "react";
import { ImageSourcePropType, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type AvatarProps = {
  avatarUrl?: string | ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  cachePolicy?: ImageProps["cachePolicy"];
};

const Avatar: React.FC<AvatarProps> = ({
  avatarUrl,
  style,
  cachePolicy = "disk",
}) => {
  return (
    <View style={[styles.container, style]}>
      {avatarUrl ? (
        <Image
          source={avatarUrl}
          style={styles.image}
          contentFit="cover"
          cachePolicy={cachePolicy}
          onError={() => {
            console.log("error loading avatar");
          }}
        />
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

export default Avatar;
