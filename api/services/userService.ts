import apiClient from "@/api/client";
import { authService } from "@/api/services/authService";
import { Role } from "@/types/Membership";
import { GetUsersByLocationId, User } from "@/types/User";

export const userService = {
    getUsersByLocationId: async (locationId: string): Promise<User[]> => {
        const response = await apiClient.get<GetUsersByLocationId>(
            `/locations/${locationId}/users`,
        );
        return response.data.users;
    },
    updateUser: async (isOwner: boolean = true, userId: string, firstName: string | undefined, lastName: string | undefined, email: string | undefined, profilePicture: { base64: string; extension: string } | undefined): Promise<void> => {
        if (profilePicture) {
            const response = await apiClient.post<{ picture_url: string }>(`/users/${userId}/profile-picture`, profilePicture);

            if (isOwner) {
                await authService.updateUserAttributes(firstName, lastName, email, response.data.picture_url);
            } else {
                await apiClient.patch(`/users/${userId}`, { first_name: firstName, last_name: lastName, email: email, picture_url: response.data.picture_url });
            }
        } else {
            if (isOwner) {
                await authService.updateUserAttributes(firstName, lastName, email);
            } else {
                await apiClient.patch(`/users/${userId}`, { first_name: firstName, last_name: lastName, email: email });
            }
        }
    },
    updateUserRole: async (userId: string, location_id: string, role: Role): Promise<void> => {
        await apiClient.put(`/locations/${location_id}/memberships/${userId}`, { roles: [role] });
    },
};