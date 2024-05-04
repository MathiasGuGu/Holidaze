import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type userData = string | any;
type accessToken = string | any;

export const useAuthStore = createStore(
  persist(
    (set: any) => ({
      login: (userData: userData, accessToken: accessToken) =>
        set(() => ({ isLoggedIn: true, user: userData, accessToken })),
      logout: () =>
        set(() => {
          return {
            isLoggedIn: false,
            user: null,
            accessToken: null,
          };
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
