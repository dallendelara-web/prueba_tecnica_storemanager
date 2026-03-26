import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { createUserSlice, type UserSlice } from "./slices/userSlice";
import { createProductSlice, type ProductSlice } from "./slices/productSlice";
 
type StoreState = UserSlice & ProductSlice;

export const useStore = create<StoreState>()(
  persist(
    (set, get, api) => ({
      ...createUserSlice(set, get, api),
      ...createProductSlice(set, get, api),
    }),
    {
      name: "storedData",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
