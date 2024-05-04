import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useSearchQueryStore = createStore(
  persist(
    (set: any) => ({
      // The store should have a max length of 5
      recentSearches: [],

      saveData: (data: any) => {
        set((state: any) => {
          // if the array is at max length, remove the last element
          if (state.recentSearches.length >= 3) {
            state.recentSearches.pop();
          }

          // if data is already in the array, remove it

          state.recentSearches = state.recentSearches.filter(
            (search: any) => search !== data
          );

          // if data is "" don't add it to the array
          if (data === "") {
            return state;
          }

          // add data to the array
          return {
            recentSearches: [data, ...state.recentSearches],
          };
        });
      },
    }),
    {
      name: "search-query-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
