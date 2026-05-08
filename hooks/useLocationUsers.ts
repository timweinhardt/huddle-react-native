import { userService } from "@/api/services/userService";
import { useQuery } from "@tanstack/react-query";

export const locationUsersKey = (locationId: string) => [
  "locationUsers",
  locationId,
];

export function useLocationUsers(locationId: string) {
  return useQuery({
    queryKey: locationUsersKey(locationId),
    queryFn: () => userService.getUsersByLocationId(locationId),
    enabled: !!locationId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useUserName(locationId: string, userId?: string) {
  const { data } = useLocationUsers(locationId);

  const user = data?.find((u) => u.id === userId);

  return {
    firstName: user?.first_name,
    lastName: user?.last_name,
    fullName: user ? `${user.first_name} ${user.last_name}` : "Unknown User",
  };
}
