import ChevronLeftIcon from "@/assets/icons/chevron-left.svg";
import ErrorModal from "@/components/shared/ErrorModal";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import TextField from "@/components/ui/TextField";
import { Apercu, Colors } from "@/constants/theme";
import { useCreatePost } from "@/hooks/useCreatePost";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewRef,
} from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CreatePostScreen = () => {
  const insets = useSafeAreaInsets();

  const { mutate, isPending, error } = useCreatePost();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const scrollViewRef = useRef<KeyboardAwareScrollViewRef>(null);

  const enableSubmit =
    title.trim() !== "" && content.trim() !== "" && !isPending;

  useEffect(() => {
    if (error) {
      setIsErrorVisible(true);
    }
  }, [error]);

  const handleBackButton = () => {
    router.back();
  };

  const handleSubmit = () => {
    mutate(
      {
        location_id: "30023",
        title,
        content,
      },
      {
        onSuccess: () => {
          router.back();
        },
        onError: () => {
          setIsErrorVisible(true);
        },
      },
    );
  };

  return (
    <>
      {isPending ? <Spinner /> : null}
      <ErrorModal
        visible={isErrorVisible}
        errorCode={error instanceof Error ? error.message : "Unknown error"}
        onClose={() => setIsErrorVisible(false)}
        subtitle="We couldn't create your post. Please try again later."
      />
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.container, { paddingTop: insets.top }]}
      >
        <Button
          text="Back"
          onPress={handleBackButton}
          style={styles.backButton}
          contentStyle={styles.backButtonContent}
          variant="transparent"
          iconLeft={ChevronLeftIcon}
        />
        <Text style={styles.title}>Create New Post</Text>
        <View>
          <TextField
            label="Title"
            placeholder="Enter the post title"
            value={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
            keyboardType="default"
            autoCapitalize="none"
          />
          <TextField
            label="Message"
            placeholder="Type something..."
            value={content}
            onChangeText={(text) => {
              setContent(text);
            }}
            keyboardType="default"
            multiline
            style={styles.contentTextField}
            onFocus={() => {
              scrollViewRef.current?.scrollToEnd({
                animated: true,
              });
            }}
          />
        </View>
        <Button
          text="Create Post"
          disabled={!enableSubmit}
          onPress={handleSubmit}
        ></Button>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 9,
  },
  backButton: {
    marginTop: 30,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backButtonContent: {
    paddingLeft: 0,
  },
  title: {
    fontFamily: Apercu.bold,
    fontSize: 20,
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  contentTextField: {
    height: 200,
  },
});

export default CreatePostScreen;
