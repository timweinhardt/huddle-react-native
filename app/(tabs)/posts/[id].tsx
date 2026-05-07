import ChevronLeftIcon from "@/assets/icons/chevron-left.svg";
import Avatar from "@/components/shared/Avatar";
import ErrorModal from "@/components/shared/ErrorModal";
import Button from "@/components/ui/Button";
import { Colors, TextStyles } from "@/constants/theme";
import { useUserName } from "@/hooks/useLocationUsers";
import { usePost } from "@/hooks/usePost";
import { formatLongDateTime } from "@/utils/string";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Circle } from "react-native-animated-spinkit";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PostScreen = () => {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: post, error, isLoading, isRefetching, refetch } = usePost(id);

  const { fullName: authorName } = useUserName("30023", post?.author_id);

  const [isErrorVisible, setIsErrorVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsErrorVisible(true);
    }
  }, [error]);

  const handleBackButton = () => {
    router.back();
  };

  const handleErrorClose = () => {
    setIsErrorVisible(false);
    router.back();
  };

  return (
    <>
      <ErrorModal
        errorCode={error?.message ?? ""}
        visible={!!error && isErrorVisible}
        onClose={handleErrorClose}
        subtitle="We're having some trouble loading this post. Please try again later."
      />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top },
        ]}
        refreshControl={
          <RefreshControl
            progressViewOffset={insets.top}
            refreshing={isRefetching}
            onRefresh={refetch}
            colors={[Colors.muted]}
            tintColor={Colors.muted}
          />
        }
      >
        <View style={[styles.container]}>
          <Button
            text="Back"
            onPress={handleBackButton}
            style={styles.backButton}
            contentStyle={styles.backButtonContent}
            variant="transparent"
            iconLeft={ChevronLeftIcon}
          />
          {isLoading && (
            <View style={styles.loadingContainer}>
              <Circle size={64} color={Colors.primary} />
            </View>
          )}
          {!isLoading && post ? (
            <>
              <View style={styles.header}>
                <Avatar avatarUrl={""}></Avatar>
                <Text style={styles.author} numberOfLines={1}>
                  {authorName}
                </Text>
              </View>
              <Text style={styles.title}>{post.title}</Text>
              <Text style={styles.date}>
                {formatLongDateTime(post.created_at)}
              </Text>
              <Text style={styles.content}>{post.content}</Text>
            </>
          ) : null}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 60,
    flexGrow: 1,
  },
  container: {
    gap: 9,
  },
  backButton: {
    marginTop: 30,
    alignSelf: "flex-start",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonContent: {
    paddingLeft: 0,
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
    fontSize: TextStyles.title.fontSize + 2,
    color: TextStyles.title.color,
  },
  date: {
    fontFamily: TextStyles.meta.fontFamily,
    fontSize: TextStyles.meta.fontSize,
    color: TextStyles.meta.color,
  },
  content: {
    marginTop: 6,
    fontFamily: TextStyles.body.fontFamily,
    fontSize: TextStyles.body.fontSize + 2,
    color: TextStyles.body.color,
    lineHeight: 24,
  },
});

export default PostScreen;
