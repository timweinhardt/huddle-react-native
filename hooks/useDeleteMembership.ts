import { userService } from "@/api/services/userService";
import { DeleteMembershipRequest } from "@/types/Membership";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { locationUsersKey } from "./useLocationUsers";

export function useDeleteMembership() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, location_id }: DeleteMembershipRequest) => 
      userService.deleteUserMembership({ userId, location_id }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: locationUsersKey("30023"),
      });
    },
  });
}
