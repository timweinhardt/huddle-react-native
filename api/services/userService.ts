import apiClient from "@/api/client";
import { authService } from "@/api/services/authService";
import { DeleteMembershipRequest } from "@/types/Membership";
import { GetUsersByLocationId, InviteUserRequest, UpdateUserRequest, UpdateUserRoleRequest, UploadProfilePictureRequest, User } from "@/types/User";

export const userService = {
    getUsersByLocationId: async (locationId: string): Promise<User[]> => {
        const response = await apiClient.get<GetUsersByLocationId>(
            `/locations/${locationId}/users`,
        );
        return response.data.users;
    },
    updateUser: async (isOwner: boolean = true, userId: string, profileInfo: UpdateUserRequest, profilePicture: UploadProfilePictureRequest | undefined): Promise<void> => {
        if (profilePicture) {
            const response = await apiClient.post<{ picture_url: string }>(`/users/${userId}/profile-picture`, profilePicture);

            if (isOwner) {
                await authService.updateUserAttributes(profileInfo.first_name, profileInfo.last_name, profileInfo.email, response.data.picture_url);
            } else {
                profileInfo.picture_url = response.data.picture_url;
                await apiClient.patch(`/users/${userId}`, profileInfo);
            }
        } else {
            if (isOwner) {
                await authService.updateUserAttributes(profileInfo.first_name, profileInfo.last_name, profileInfo.email);
            } else {
                await apiClient.patch(`/users/${userId}`, profileInfo);
            }
        }
    },
    updateUserRole: async (userId: string, location_id: string, payload: UpdateUserRoleRequest): Promise<void> => {
        await apiClient.put(`/locations/${location_id}/memberships/${userId}`, payload);
    },
    deleteUserMembership: async ({ userId, location_id }: DeleteMembershipRequest): Promise<void> => {
        await apiClient.delete(`/locations/${location_id}/memberships/${userId}`);
    },
    inviteUser: async (payload: InviteUserRequest): Promise<void> => {
        await apiClient.post(`/users/invite`, payload);
    },
};