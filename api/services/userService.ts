import apiClient from "@/api/client";
import { authService } from "@/api/services/authService";
import { GetUsersByLocationId, User } from "@/types/User";

export const userService = {
  getUsersByLocationId: async (locationId: string): Promise<User[]> => {
    const response = await apiClient.get<GetUsersByLocationId>(
      `/locations/${locationId}/users`,
    );
    return response.data.users;
  },
  updateUser: async (userId: string, firstName: string | undefined, lastName: string | undefined, email: string | undefined, profilePicture: { base64: string; extension: string } | undefined): Promise<void> => {
    if (profilePicture) {
      const response = await apiClient.post<{ picture_url: string }>(`/users/${userId}/profile-picture`, profilePicture);
      await authService.updateUserAttributes(firstName, lastName, email, response.data.picture_url);
    } else {
      await authService.updateUserAttributes(firstName, lastName, email);
    }
  },
};
