import { TextStyles } from "@/constants/theme";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Avatar from "../shared/Avatar";
import Card from "../ui/Card";

interface PostCardProps {
  authorName: string;
  avatarUrl?: string;
  title: string;
  date: string;
  content: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const PostCard: React.FC<PostCardProps> = ({
  authorName,
  avatarUrl,
  title,
  date,
  content,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <Card style={styles.card}>
        <View style={styles.header}>
          <Avatar avatarUrl={avatarUrl}></Avatar>
          <Text style={styles.author}>{authorName}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.content} numberOfLines={4}>
          {content}
        </Text>
        <Text style={styles.seeMore}>Tap to see more</Text>
      </Card>
    </TouchableOpacity>
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
  author: {
    fontFamily: TextStyles.label.fontFamily,
    fontSize: TextStyles.label.fontSize,
    color: TextStyles.label.color,
  },
  title: {
    fontFamily: TextStyles.title.fontFamily,
    fontSize: TextStyles.title.fontSize,
    color: TextStyles.title.color,
  },
  date: {
    fontFamily: TextStyles.meta.fontFamily,
    fontSize: TextStyles.meta.fontSize,
    color: TextStyles.meta.color,
  },
  content: {
    fontFamily: TextStyles.body.fontFamily,
    fontSize: TextStyles.body.fontSize,
    color: TextStyles.body.color,
    lineHeight: 22,
  },
  seeMore: {
    fontFamily: TextStyles.hint.fontFamily,
    fontSize: TextStyles.hint.fontSize,
    color: TextStyles.hint.color,
    marginTop: 2,
  },
});

export default PostCard;
