import ChevronLeftIcon from "@/assets/icons/chevron-left.svg";
import Avatar from "@/components/shared/Avatar";
import ErrorModal from "@/components/shared/ErrorModal";
import RouteHeading from "@/components/shared/RouteHeading";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Spinner from "@/components/ui/Spinner";
import TextField from "@/components/ui/TextField";
import { TextStyles } from "@/constants/theme";
import pickProfilePicture from "@/hooks/useImagePicker";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { User } from "@/types/User";
import { isValidEmail } from "@/utils/string";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type UserInformationFormProps = {
    user: User;
    isOwner: boolean;
};

type UserInformationFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: { base64: string; extension: string } | undefined;
};

const UserInformationForm = ({ user, isOwner }: UserInformationFormProps) => {
    const insets = useSafeAreaInsets();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { mutate: updateUser, isPending } = useUpdateUser();
    const [profilePicturePreview, setProfilePicturePreview] = useState<string | undefined>(undefined);

    const {
        control,
        handleSubmit,
        setError: setFieldError,
        setValue,
        formState: { errors },
    } = useForm<UserInformationFormValues>({
        defaultValues: { firstName: user?.first_name || "", lastName: user?.last_name || "", email: user?.email || "", profilePicture: undefined },
        reValidateMode: "onSubmit",
    });

    const handleBackButton = () => {
        router.back();
    };

    const handleChangeProfilePicture = async () => {
        setLoading(true);
        const profilePicture = await pickProfilePicture();
        setLoading(false);
        if (!profilePicture) return;
        setValue("profilePicture", profilePicture);
   
        setProfilePicturePreview(profilePicture.base64);
    };

    const onSubmit = ({
        firstName,
        lastName,
        email,
        profilePicture,
    }: UserInformationFormValues) => {
        Keyboard.dismiss();

        if (!user?.id) {
            return;
        }
        updateUser(
            {
                isOwner,
                userId: user.id,
                firstName,
                lastName,
                email,
                profilePicture,
            },
            {
                onSuccess: (data) => {
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                    router.back();
                },
                onError: (error: Error) => {
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                    console.log(error);
                    switch (error.name) {
                        case "AliasExistsException":
                            setFieldError("email", {
                                message: error.message,
                            });
                            break;
                        default:
                            setError(error.name);
                    }
                },
            }
        )
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Spinner isVisible={isPending || loading} />
                <ErrorModal
                    errorCode={error}
                    visible={!!error}
                    onClose={() => setError("")}
                />
                <View style={{ paddingTop: insets.top }}>
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
                    <Controller
                        control={control}
                        name="firstName"
                        rules={{ required: "First name is required" }}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <TextField
                                    style={styles.textFieldContainer}
                                    value={value}
                                    onChangeText={(text) => onChange(text)}
                                    error={errors.firstName?.message}
                                />
                            </>
                        )}
                    />
                    <Text style={[TextStyles.largeLabel, styles.label]}>Last Name</Text>
                    <Controller
                        control={control}
                        name="lastName"
                        rules={{ required: "Last name is required" }}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <TextField
                                    style={styles.textFieldContainer}
                                    value={value}
                                    onChangeText={(text) => onChange(text)}
                                    error={errors.lastName?.message}
                                />
                            </>
                        )}
                    />
                    <Text style={[TextStyles.largeLabel, styles.label]}>Email</Text>
                    <Controller
                        control={control}
                        name="email"
                        rules={{ required: "Email is required", validate: (v) => isValidEmail(v) || "Please enter a valid email address" }}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <TextField
                                    style={styles.textFieldContainer}
                                    value={value}
                                    onChangeText={(text) => onChange(text)}
                                    error={errors.email?.message}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    autoComplete="email"
                                    textContentType="emailAddress"
                                />
                            </>
                        )}
                    />
                    <Text style={[TextStyles.largeLabel, styles.label]}>Profile Picture</Text>
                    <Card style={styles.emailCard}>
                        <Text style={styles.textField}>Change profile picture</Text>
                        {profilePicturePreview && (
                            <Avatar avatarUrl={{uri: profilePicturePreview}} />
                        )}
                        <Button
                            text="Choose image"
                            onPress={handleChangeProfilePicture}
                            style={styles.changeButton}
                            variant="secondaryMono"
                        />
                    </Card>
                </View>
                <Button
                    variant="primary"
                    text="Update Profile"
                    onPress={handleSubmit(onSubmit)}
                    style={styles.updateProfileButton}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100%",
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

export default UserInformationForm;