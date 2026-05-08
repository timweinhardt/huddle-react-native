import { useAuthContext } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/services/authService";

interface LoginCredentials {
  email: string;
  password: string;
}

export function useLogin() {
  const { setIsLoggedIn, setUser } = useAuthContext();

  return useMutation({
    mutationFn: ({ email, password }: LoginCredentials) =>
      authService.login(email, password),
    onSuccess: async ({ nextStep }) => {
      if (nextStep.signInStep === "DONE") {
        try {
          const attributes = await authService.fetchUserAttributes();
          setUser(attributes);
        } catch {
          setUser(null);
        }
        setIsLoggedIn(true);
      }
    },
  });
}

export function useLogout() {
  const { setIsLoggedIn, setUser } = useAuthContext();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      setUser(null);
      setIsLoggedIn(false);
    },
  });
}
