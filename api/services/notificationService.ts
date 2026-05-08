import apiClient from "@/api/client";
import { UserPushToken } from "@/types/Notification";

export const notificationService = {
  registerPushToken: async (userPushToken: UserPushToken): Promise<void> => {
    await apiClient.post<void>(
      `/register_push_token`,
      userPushToken,
    );
  },
};
