import ChevronLeftIcon from "@/assets/icons/chevron-left.svg";
import ErrorModal from "@/components/shared/ErrorModal";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import TextField from "@/components/ui/TextField";
import { Apercu, Colors } from "@/constants/theme";
import { useCreatePost } from "@/hooks/useCreatePost";
import { router } from "expo-router";
import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewRef,
} from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type CreatePostFormValues = {
  title: string;
  message: string;
};

const CreatePostScreen = () => {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<KeyboardAwareScrollViewRef>(null);
  const { mutate, isPending, isError, error, reset } = useCreatePost();

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { isValid, errors, isDirty },
  } = useForm<CreatePostFormValues>({
    defaultValues: { title: "", message: "" },
    reValidateMode: "onSubmit",
  });

  const onSubmit = ({ title, message }: CreatePostFormValues) => {
    Keyboard.dismiss();
    mutate(
      {
        location_id: "30023",
        title,
        content: message,
      },
      {
        onSuccess: () => {
          router.back();
        },
      },
    );
  };

  const handleBackButton = () => {
    router.back();
  };

  return (
    <>
      <Spinner isVisible={isPending} />
      <ErrorModal
        visible={isError}
        errorCode={error instanceof Error ? error.message : "Unknown error"}
        onClose={reset}
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
          <Controller
            control={control}
            name="title"
            rules={{
              required: "Title is required",
            }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Title"
                placeholder="Enter the post title"
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  if (errors.title) {
                    clearErrors("title");
                  }
                }}
                error={errors.title?.message}
                keyboardType="default"
              />
            )}
          />
          <Controller
            control={control}
            name="message"
            rules={{
              required: "Message is required",
            }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Message"
                placeholder="Type something..."
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  if (errors.message) {
                    clearErrors("message");
                  }
                }}
                error={errors.message?.message}
                style={styles.contentTextField}
                onFocus={() => {
                  scrollViewRef.current?.scrollToEnd({
                    animated: true,
                  });
                }}
                multiline
                keyboardType="default"
              />
            )}
          />
        </View>
        <Button
          text="Create Post"
          disabled={!isDirty || isPending || !isValid}
          onPress={handleSubmit(onSubmit)}
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
