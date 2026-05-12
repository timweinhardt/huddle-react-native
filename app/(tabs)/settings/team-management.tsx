import TeamManagement from "@/components/settings/TeamManagement";
import { useAuthContext } from "@/context/AuthContext";
import React from "react";

const UserManagementScreen = () => {
    const { user } = useAuthContext();
    return (
        <>
            <TeamManagement user={user} />
        </>
    );
};



export default UserManagementScreen;
