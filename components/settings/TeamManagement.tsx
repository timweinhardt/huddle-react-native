import ChevronLeftIcon from "@/assets/icons/chevron-left.svg";
import ProfileCardThin from "@/components/settings/ProfileCardThin";
import ErrorModal from "@/components/shared/ErrorModal";
import RouteHeading from "@/components/shared/RouteHeading";
import SubHeading from "@/components/shared/SubHeading";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { Colors, TextStyles } from "@/constants/theme";
import { useLocationUsers } from "@/hooks/useLocationUsers";
import { RoleLabels } from "@/types/Membership";
import { UserAttributeKey } from "aws-amplify/auth";
import { router } from "expo-router";
import { useState } from "react";
import { RefreshControl, SectionList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TeamManagementProps = {
    user: Partial<Record<UserAttributeKey, string>> | null;
};

const TeamManagement = ({ user }: TeamManagementProps) => {
    const insets = useSafeAreaInsets();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { data: users, isLoading: isUsersLoading, refetch, isRefetching } = useLocationUsers("30023");

    const activeUsers = users?.filter((user) => user.is_active && user.is_confirmed) ?? [];
    const invitedUsers = users?.filter((user) => user.is_active && !user.is_confirmed) ?? [];
    const locationId = "30023";
    const handleBackButton = () => {
        router.back();
    };

    const sections = [
        {
            key: "active",
            title: `Active (${activeUsers.length})`,
            data: activeUsers,
        },
        {
            key: "invited",
            title: `Invited (${invitedUsers.length})`,
            data: invitedUsers,
        },
    ];

    return (
        <View>
            <Spinner isVisible={isUsersLoading || loading} />
            <ErrorModal
                errorCode={error}
                visible={!!error}
                onClose={() => setError("")}
            />
            <SectionList
                style={{
                    paddingTop: insets.top,
                    paddingHorizontal: 20,
                    paddingBottom: 20
                }}
                refreshControl={
                    <RefreshControl
                        progressViewOffset={insets.top}
                        refreshing={isRefetching}
                        onRefresh={refetch}
                        colors={[Colors.muted]}
                        tintColor={Colors.muted}
                    />
                }
                sections={sections}
                keyExtractor={(item, index) => item.id ?? `${item.first_name}-${item.last_name}-${index}-${item.avatar_url}`}
                ListHeaderComponent={() => (
                    <>
                        <Button
                            text="Back"
                            onPress={handleBackButton}
                            style={styles.backButton}
                            contentStyle={styles.backButtonContent}
                            variant="transparent"
                            iconLeft={ChevronLeftIcon}
                        />
                        <RouteHeading>Team Management</RouteHeading>
                    </>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <SubHeading>{title}</SubHeading>
                )}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => router.navigate(`/settings/${item.id}`)} activeOpacity={0.6}>
                        <ProfileCardThin
                            name={`${item.first_name} ${item.last_name}`}
                            avatarUrl={item.avatar_url ?? undefined}
                            locations={item.memberships.map((membership) => membership.location_id)}
                            role={
                                item.memberships
                                    .find((membership) => membership.location_id === locationId)
                                    ?.roles.map((role) => RoleLabels[role])
                                    .join(", ") ?? ""
                            }
                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({  
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

export default TeamManagement;