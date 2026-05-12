import UserIcon from "@/assets/icons/user.svg";
import { Colors } from "@/constants/theme";
import { Image, ImageProps } from "expo-image";
import React from "react";
import { ImageSourcePropType, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type AvatarProps = {
  avatarUrl?: string | ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  cachePolicy?: ImageProps["cachePolicy"];
  size?: number;
};

const Avatar: React.FC<AvatarProps> = ({
  avatarUrl,
  style,
  cachePolicy = "disk",
  size = 28,
}) => {
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {avatarUrl ? (
        <Image
          source={avatarUrl}
          style={[{ width: size, height: size }]}
          contentFit="cover"
          cachePolicy={cachePolicy}
          onError={() => {
            console.log("error loading avatar");
          }}
        />
      ) : (
          <UserIcon width={size * 0.75} height={size * 0.75} color={Colors.muted} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 28,
    height: 28,
    backgroundColor: Colors.border,
    borderRadius: 128,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderStyle: "solid",
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
  },
  icon: {
    color: Colors.muted,
  },
});

export default Avatar;
