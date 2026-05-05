import PostCard from "@/components/posts/PostCard";
import Heading from "@/components/shared/Heading";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  const data = [
    {
      id: "1",
      title: "Inclement Weather Update",
      author: "Tim Weinhardt",
      date: "Jan 5th, 2026",
      avatarUrl: "https://i.imgur.com/1jO6lgG.jpeg",
      content:
        "Please be advised that we will be having a delayed opening. Please check Slack before you come in to work to ensure you are still required. Stay tuned for more details.",
    },
    {
      id: "2",
      title: "Inclement Weather Update",
      author: "Olivia Efford",
      date: "Jan 5th, 2026",
      content:
        "Please be advised that we will be having a delayed opening. Please check Slack before you come in to work to ensure you are still required. Stay tuned for more details.",
    },
    {
      id: "3",
      title: "Inclement Weather Update",
      author: "Ekampreet Kaur",
      date: "Jan 5th, 2026",
      content:
        "Please be advised that we will be having a delayed opening. Please check Slack before you come in to work to ensure you are still required. Stay tuned for more details.",
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        style={{ paddingTop: insets.top }}
        contentContainerStyle={styles.listContainer}
        data={data}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => <Heading>Latest Announcements</Heading>}
        renderItem={({ item }) => (
          <PostCard
            authorName={item.author}
            avatarUrl={item.avatarUrl}
            title={item.title}
            date={item.date}
            content={item.content}
            onPress={() => {}}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
    gap: 10,
    flexGrow: 1,
  },
});

export default HomeScreen;
