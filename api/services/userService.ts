import apiClient from "@/api/client";
import { GetUsersByLocationId, User } from "@/types/User";

export const userService = {
  getUsersByLocationId: async (locationId: string): Promise<User[]> => {
    const response = await apiClient.get<GetUsersByLocationId>(
      `/locations/${locationId}/users`,
    );
    return response.data.users;
  },
};
