import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
  signIn,
  signOut,
} from "aws-amplify/auth";

export const authService = {
  login: async (email: string, password: string) => {
    const { isSignedIn, nextStep } = await signIn({
      username: email,
      password,
    });
    return { isSignedIn, nextStep };
  },

  logout: async (global = false) => {
    await signOut({ global });
  },

  getToken: async () => {
    const session = await fetchAuthSession();
    return session.tokens?.accessToken?.toString() ?? null;
  },

  getCurrentUser: async () => {
    try {
      return await getCurrentUser();
    } catch {
      return null;
    }
  },

  fetchUserAttributes: async () => {
    try {
      return await fetchUserAttributes();
    } catch {
      return null;
    }
  },
};
