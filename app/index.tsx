import LoginForm from "@/components/auth/LoginForm";
import React from "react";
import {
  ImageBackground,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";

const LoginScreen = () => {
  const offset = { closed: 0, opened: Platform.OS === "ios" ? 20 : 20 };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/waffle-fry-pattern.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          <KeyboardStickyView offset={offset} style={styles.footerContainer}>
            <LoginForm />
          </KeyboardStickyView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  footerContainer: {
    position: "absolute",
    width: "100%",
    bottom: Platform.OS === "ios" ? 0 : 100,
  },
});

export default LoginScreen;
