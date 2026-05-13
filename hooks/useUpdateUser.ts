import { authService } from "@/api/services/authService";
import { userService } from "@/api/services/userService";
import { useAuthContext } from "@/context/AuthContext";
import { queryClient } from "@/queryClient";
import { useMutation } from "@tanstack/react-query";
import { locationUsersKey } from "./useLocationUsers";

type UserInformationFormValues = {
  isOwner: boolean;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: { base64: string; extension: string } | undefined;
};

export function useUpdateUser() {
  const { setUser } = useAuthContext();

  return useMutation({
    mutationFn: ({ isOwner, userId, firstName, lastName, email, profilePicture }: UserInformationFormValues) =>
      userService.updateUser(isOwner, userId, { first_name: firstName.trim(), last_name: lastName.trim(), email: email.trim() }, profilePicture),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: locationUsersKey("30023"),
      });
      const attributes = await authService.fetchUserAttributes();
      if (attributes) {
        setUser(attributes);
      }
    },
  });
}
