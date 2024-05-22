import { createStore } from "zustand";

export const useVenueStore = createStore((set: any) => ({
  pages: [],

  setPages: (page: any, data: any) =>
    set((state: any) => {
      // if the page does not exist, create a new page
      return {
        pages: {
          ...state.pages,
          [page]: data,
        },
      };
    }),
  updatePages: (page: any, data: any) =>
    set((state: any) => {
      return {
        pages: {
          ...state.pages,
          [page]: data,
        },
      };
    }),
}));
