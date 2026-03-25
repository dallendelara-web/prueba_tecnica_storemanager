import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { createUserSlice, type UserSlice } from "./slices/userSlice";
 
type StoreState = UserSlice;

export const useStore = create<StoreState>()(
  persist(
    (set, get, api) => ({
  ...createUserSlice(set, get, api),
    }),
    {
      name: "storedData",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        loggedUser: state.loggedUser,
      }),
    }
  )
);
