import { userService } from "@/api/services/userService";
import ChevronLeftIcon from "@/assets/icons/chevron-left.svg";
import Avatar from "@/components/shared/Avatar";
import ErrorModal from "@/components/shared/ErrorModal";
import BottomModal from "@/components/ui/BottomModal";
import Button from "@/components/ui/Button";
import CheckboxInput from "@/components/ui/CheckboxInput";
import Spinner from "@/components/ui/Spinner";
import { TextStyles } from "@/constants/theme";
import { useLocationUsers } from "@/hooks/useLocationUsers";
import { LocationLabels } from "@/types/Location";
import { HiddenRoles, Role, RoleLabels } from "@/types/Membership";
import { User } from "@/types/User";
import { getHighestRole } from "@/utils/roles";
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const ProfileDetailsScreen = () => {
    const { id } = useLocalSearchParams<{ id: string }>();

    const { data: users, isLoading: isUsersLoading, refetch: refetchUsers } = useLocationUsers("30023");
    const user = users?.find((user: User) => user.id === id);

    const insets = useSafeAreaInsets();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role>(Role.TEAM_MEMBER);

    useEffect(() => {
        if (!user) return;
        const membership = user.memberships.find((m) => m.location_id === "30023");
        setSelectedRole(getHighestRole(membership?.roles ?? []) as Role);
    }, [user]);

    if (!user) {
        router.back();
        return null;
    }

    const roleBottomSheetRef = useRef<BottomSheetModal>(null);
    const handleBackButton = () => {
        router.back();
    };

    const handleEditProfile = () => {
        router.navigate(`/settings/${id}/edit`);
    };

    const handleSetRole = () => {
        roleBottomSheetRef.current?.present();
    };
    const handleDeleteUser = () => {
        console.log("delete user");
    };

    const saveRole = async () => {
        console.log("save role", selectedRole);
        try {
            await userService.updateUserRole(user.id, "30023", selectedRole);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            refetchUsers();
        } catch (error) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            console.log("error updating user role", error);
        }
    };

    return (
        <View style={styles.container}>
            <Spinner isVisible={isUsersLoading || loading} />
            <BottomModal 
                ref={roleBottomSheetRef as React.RefObject<BottomSheetModal>} 
                onSave={saveRole}
                headerText="Set Role"
                closeButtonText="Save"
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalSectionLabel}>Role</Text>
                    <View style={styles.modalList}>
                        {Object.values(Role).filter((value: Role) => !HiddenRoles.includes(value)).map((value: Role) => (
                            <CheckboxInput<Role>
                                key={value}
                                label={RoleLabels[value]}
                                optionKey={value}
                                selected={selectedRole === value}
                                onPress={setSelectedRole}
                            />
                        ))}
                    </View>
                </View>
            </BottomModal>
   
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

                <View style={styles.userInfoContainer}>
                    <Avatar avatarUrl={user.avatar_url ?? undefined} size={128} />
                    <View style={styles.userInfoTextContainer}>
                        <Text style={styles.userName}>{`${user.first_name} ${user.last_name}`}</Text>
                        <Text style={styles.userEmail}>{user.email}</Text>
                        {user.memberships
                            .filter((membership) => membership.location_id === "30023")
                            .map((membership, idx) => (
                                <View key={idx} style={[styles.userRoleLocationContainer, { marginTop: idx > 0 ? 0 : 8 }]}>
                                    <Text style={styles.userLocation}>
                                        {LocationLabels[membership.location_id] ?? membership.location_id}
                                    </Text>
                                    <Text style={styles.userLocationSeparator}>•</Text>
                                    <Text style={styles.userRole}>
                                        {membership.roles.map((role) => RoleLabels[role] ?? role).join(", ")}
                                    </Text>
                                </View>
                        ))}
                   

                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                        variant="secondary"
                        text="Edit Profile"
                        onPress={handleEditProfile}
                    />
                    <Button
                        variant="secondary"
                        text="Set Role"
                        onPress={handleSetRole}
                    />
                    <Button
                        variant="primary"
                        text="Delete User"
                        onPress={handleDeleteUser}
                    />
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonsContainer: {
        marginTop: 24,
        gap: 10,
    },
    userInfoContainer: {
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    userInfoTextContainer: {
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
    },
    userRoleLocationContainer: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    userLocationSeparator: {
        fontFamily: TextStyles.subTitle.fontFamily,
        fontSize: TextStyles.subTitle.fontSize,
        color: TextStyles.subTitle.color,
    },
    userLocation: {
        fontFamily: TextStyles.subTitle.fontFamily,
        fontSize: TextStyles.subTitle.fontSize,
        color: TextStyles.subTitle.color,
    },
    userRole: {
        fontFamily: TextStyles.subTitle.fontFamily,
        fontSize: TextStyles.subTitle.fontSize,
        color: TextStyles.subTitle.color,
    },
    userName: {
        fontFamily: TextStyles.heading.fontFamily,
        fontSize: TextStyles.heading.fontSize,
        color: TextStyles.heading.color,
    },
    userEmail: {
        fontFamily: TextStyles.body.fontFamily,
        fontSize: TextStyles.body.fontSize,
        color: TextStyles.body.color,
    },
    container: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100%",
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
    modalContent: {
        width: "100%",
        alignSelf: "stretch",
    },
    modalSectionLabel: {
        fontFamily: TextStyles.body.fontFamily,
        fontSize: TextStyles.subHeading.fontSize,
        color: TextStyles.subHeading.color,
        marginBottom: 10,
        alignSelf: "flex-start",
    },
    modalList: {
        width: "100%",
        gap: 8,
    },
});

export default ProfileDetailsScreen;