import PostForm from "@/components/posts/PostForm";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function EditPostScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <PostForm mode="edit" postId={id} />;
}
