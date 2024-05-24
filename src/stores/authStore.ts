import { BASE_URL } from "@/lib/api";
import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type userData = string | any;
type accessToken = string | any;

export const useAuthStore = createStore(
  persist(
    (set: any) => ({
      login: (
        userData: userData,
        accessToken: accessToken,
        apiKeyData: string
      ) =>
        set(() => ({
          isLoggedIn: true,
          user: userData,
          accessToken,
          apiKey: apiKeyData,
        })),
      revalidate: async (name: string, accessToken: string, apiKey: string) => {
        // get data field from user

        let res = await fetch(BASE_URL + "/holidaze/profiles/" + name, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
          },
        });
        let userData = await res.json();

        return set(() => ({ user: userData.data }));
      },

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
