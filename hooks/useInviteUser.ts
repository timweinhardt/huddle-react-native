import { userService } from "@/api/services/userService";
import { queryClient } from "@/queryClient";
import { InviteUserRequest } from "@/types/User";
import { useMutation } from "@tanstack/react-query";
import { locationUsersKey } from "./useLocationUsers";

export function useInviteUser() {
  return useMutation({
    mutationFn: ({ email, first_name, last_name, memberships }: InviteUserRequest) =>
      userService.inviteUser({ email: email.trim(), first_name: first_name.trim(), last_name: last_name.trim(), memberships }),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: locationUsersKey("30023"),
      });
    },
  });
}
