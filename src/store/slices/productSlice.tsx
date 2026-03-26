import { type StateCreator } from "zustand";
import { getProductsAPI } from "@/api/ProductsAPI";
import type { GetProductsParams, GetProductsResponse } from "@/types/Products";

export interface ProductSlice {
  getProductsListError: string | null | unknown;
  isLoadingGetProductsList: boolean;
  getProductsListSuccess: string | null | any;
  getProductsList: (limit: string, skip: string)  => Promise<{ success: boolean; error?: string }>;
}

export const createProductSlice: StateCreator<ProductSlice, [], [], ProductSlice> = (
  set,
  get,
) => ({
  getProductsListSuccess: null,
  getProductsListError: null,
  isLoadingGetProductsList: false,
  getProductsList: async (limit: string, skip: string) => {
    set((state: any) => ({ ...state, isLoadingGetProductsList: true, getProductsListError: null }));
    try {
      const res = await getProductsAPI(limit, skip);
      console.log(res);
      if (res) {
        set((state) => ({
          ...state,
          getProductsListError: null,
          getProductsListSuccess: res,
        }));
      }
      return { success: true };
    } catch (err: any) {
      set((state: any) => ({ ...state, getProductsListError: err || 'Error desconocido' }));
      return { success: false, error: err || 'Error desconocido' };
    } finally {
      set((state: any) => ({ ...state, isLoadingGetProductsList: false }));
    }
  },
});
