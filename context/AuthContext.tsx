import { authService } from "@/api/services/authService";
import { notificationService } from "@/api/services/notificationService";
import { UserAttributeKey } from "aws-amplify/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  isCheckingAuth: boolean;
  setIsLoggedIn: (value: boolean) => void;
  user: Partial<Record<UserAttributeKey, string>> | null;
  setUser: (user: Partial<Record<UserAttributeKey, string>> | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isCheckingAuth: true,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [user, setUser] = useState<Partial<
    Record<UserAttributeKey, string>
  > | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();

        if (currentUser) {
          const attributes = await authService.fetchUserAttributes();
          setUser(attributes);
          setIsLoggedIn(true);

          await notificationService.initializeForUser(currentUser.userId);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch {
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    initializeAuth();
  }, []);

  const value = { isLoggedIn, setIsLoggedIn, isCheckingAuth, user, setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
