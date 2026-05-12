import UserInformationForm from "@/components/settings/UserInformationForm";
import { useLocationUsers } from "@/hooks/useLocationUsers";
import { User } from "@/types/User";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const EditProfileScreen = () => {
    const { id } = useLocalSearchParams<{ id: string }>();

    const { data: users, isLoading: isUsersLoading } = useLocationUsers("30023");
    const user = users?.find((user: User) => user.id === id);

    const insets = useSafeAreaInsets();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    if (!user) {
        router.back();
        return null;
    }

    return (
        <>
            <UserInformationForm user={user} isOwner={false}/>
        </>
    );
};

export default EditProfileScreen;