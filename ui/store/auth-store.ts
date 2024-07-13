import { Login, LoginPayload, SignUp, SignUpPayload, AuthResponse } from "@/util/api/auth-api";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  signup: (credentials: SignUpPayload) => Promise<void>;
  login: (credentials: LoginPayload) => Promise<void>;
  logout: () => void;
  error: string | undefined;
}
const useAuthStore = create<AuthStore>(

    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      refreshToken: null,
      error: undefined,
      signup: async (credentials: SignUpPayload) => {
        try {
          const data: AuthResponse = await SignUp(credentials);
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          set({
            isLoggedIn: true,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            error: undefined,
          });
        } catch (error) {
          set({ error: (error as Error).message });
          throw error;
        }
      },
      login: async (credentials: LoginPayload) => {
        try {
          const data: AuthResponse = await Login(credentials);
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          set({
            isLoggedIn: true,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            error: undefined,
          });
        } catch (error) {
          set({ error: (error as Error).message });
          throw error;
        }
      },
      logout: () => {
        set({
          isLoggedIn: false,
          accessToken: null,
          refreshToken: null,
        });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      },
    }),
);

export default useAuthStore;
