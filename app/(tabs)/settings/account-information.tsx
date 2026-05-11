import UserInformationForm from "@/components/settings/UserInformationForm";
import { useAuthContext } from "@/context/AuthContext";
import React from "react";

const SettingsScreen = () => {
    const { user } = useAuthContext();
    return (
        <>
            <UserInformationForm user={user} />
        </>
    );
};



export default SettingsScreen;
