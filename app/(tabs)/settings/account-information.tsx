import ChevronLeftIcon from "@/assets/icons/chevron-left.svg";
import RouteHeading from "@/components/shared/RouteHeading";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Spinner from "@/components/ui/Spinner";
import TextField from "@/components/ui/TextField";
import { TextStyles } from "@/constants/theme";
import { useAuthContext } from "@/context/AuthContext";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SettingsScreen = () => {
    const insets = useSafeAreaInsets();
    const { user } = useAuthContext();

    const [isLoading, setIsLoading] = useState(false);

    const [firstName, setFirstName] = useState(user?.given_name);
    const [lastName, setLastName] = useState(user?.family_name);


    const handleBackButton = () => {
        router.back();
    };

    const handleChangeEmail = () => {
        console.log("change email");
    };

    const handleChangeProfilePicture = () => {
        console.log("change profile picture");
    };

    const handleUpdateProfile = () => {
        console.log("update profile");
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            router.back();
        }, 1000);
    };

    return (
        <>
            {isLoading && <Spinner />}
            <View style={[styles.container, { paddingTop: insets.top }]}>
                <Button
                    text="Back"
                    onPress={handleBackButton}
                    style={styles.backButton}
                    contentStyle={styles.backButtonContent}
                    variant="transparent"
                    iconLeft={ChevronLeftIcon}
                />
                <RouteHeading>Account Information</RouteHeading>
                <Text style={[TextStyles.largeLabel, styles.label]}>First Name</Text>
                <TextField
                    style={styles.textFieldContainer}
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                />
                <Text style={[TextStyles.largeLabel, styles.label]}>Last Name</Text>
                <TextField
                    style={styles.textFieldContainer}
                    value={lastName}
                    onChangeText={(text) => setFirstName(text)}
                />
                <Text style={[TextStyles.largeLabel, styles.label]}>Email</Text>
                <Card style={styles.emailCard}>
                    <Text
                        style={[styles.textField, styles.emailText]}
                        numberOfLines={1}
                        ellipsizeMode="middle"
                    >
                        {user?.email}
                    </Text>
               
                    <Button
                        text="Change"
                        onPress={handleChangeEmail}
                        style={styles.changeButton}
                        variant="secondaryMono"
                    />
                </Card>
                <Text style={[TextStyles.largeLabel, styles.label]}>Profile Picture</Text>
                <Card style={styles.emailCard}>
                    <Text>Change profile picture</Text>
                    <Button
                        text="Choose image"
                        onPress={handleChangeProfilePicture}
                        style={styles.changeButton}
                        variant="secondaryMono"
                    />
                </Card>
                <Button
                    variant="primary"
                    text="Update Profile"
                    onPress={handleUpdateProfile}
                    style={styles.updateProfileButton}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
    updateProfileButton: {
        marginTop: 20
    },
    textFieldContainer: {
        padding: 16,
    },
    emailText: {
        maxWidth: "70%",
    },
    footer: {
        padding: 20,
        flexDirection: "row",
    },
    buttonText: {
        fontFamily: TextStyles.body.fontFamily,
        fontSize: TextStyles.body.fontSize,
        color: TextStyles.body.color,
    },
    changeButton: {
        alignSelf: "flex-end",
    },
    backButton: {
      marginTop: 30,
      alignSelf: "flex-start",
      marginBottom: 10,
    },
    backButtonContent: {
      paddingLeft: 0,
    },
    label: {
        marginBottom: 6,
    },
    textField: {
        fontFamily: TextStyles.body.fontFamily,
        fontSize: TextStyles.body.fontSize,
        color: TextStyles.body.color,
    },
    emailCard: {
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
});

export default SettingsScreen;
