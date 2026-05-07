import { userService } from "@/api/services/userService";
import { useAuthContext } from "@/context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const locationUsersKey = (locationId: string) => [
  "locationUsers",
  locationId,
];

export function useBootstrapLocationUsers(locationId: string) {
  const queryClient = useQueryClient();
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    if (!isLoggedIn) return;
    queryClient.prefetchQuery({
      queryKey: locationUsersKey(locationId),
      queryFn: () => userService.getUsersByLocationId(locationId),
      staleTime: 1000 * 60 * 10, // 10 minutes
    });
  }, [isLoggedIn, locationId, queryClient]);
}
