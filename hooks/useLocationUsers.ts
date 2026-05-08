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

export function useLocationUser(locationId: string, userId?: string) {
  const { data } = useLocationUsers(locationId);

  const user = data?.find((u) => u.id === userId);

  const membership = user?.memberships.find(
    (m) => m.location_id === locationId,
  );

  const firstName = user?.first_name;
  const lastName = user?.last_name;

  const locationIds = user?.memberships.map((m) => m.location_id) ?? [];

  return {
    user,
    userId: user?.id,
    firstName,
    lastName,
    fullName: user ? `${firstName} ${lastName}` : undefined,
    roles: membership?.roles ?? [],
    membership,
    locationIds,
  };
}
