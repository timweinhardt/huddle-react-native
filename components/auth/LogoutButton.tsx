import ExitIcon from "@/assets/icons/exit.svg";
import Button from "@/components/ui/Button";
import { useLogout } from "@/hooks/useAuth";
import React from "react";
import { StyleSheet } from "react-native";

const Card: React.FC = () => {
  const { mutate: logout } = useLogout();
  const handleLogOut = () => {
    logout();
  };

  return (
    <Button
      iconLeft={ExitIcon}
      variant="transparent"
      text="Sign out"
      onPress={handleLogOut}
      style={styles.button}
      contentStyle={styles.buttonContent}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
  },
  buttonContent: {
    paddingLeft: 7,
  },
});

export default Card;
