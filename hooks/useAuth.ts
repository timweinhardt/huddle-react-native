import { useAuthContext } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/services/authService";

interface LoginCredentials {
  email: string;
  password: string;
}

export function useLogin() {
  const { setIsLoggedIn } = useAuthContext();

  return useMutation({
    mutationFn: ({ email, password }: LoginCredentials) =>
      authService.login(email, password),
    onSuccess: ({ nextStep }) => {
      if (nextStep.signInStep === "DONE") {
        setIsLoggedIn(true);
      } else {
        // TODO
      }
    },
  });
}

export function useLogout() {
  const { setIsLoggedIn } = useAuthContext();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      setIsLoggedIn(false);
    },
  });
}
