import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FeedbackScreen = () => {
  return (
      <View style={styles.container}>
        <Text>Feedback</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedbackScreen;