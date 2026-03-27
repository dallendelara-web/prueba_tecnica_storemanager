import { type StateCreator } from "zustand";
import { getProductsAPI, getProductsByCategoryAPI, geCategoriestProductsAPI, createProductAPI } from "@/api/ProductsAPI";
import type { GetProductsParams, GetProductsResponse } from "@/types/Products";

export interface ProductSlice {
  getProductsListError: string | null | unknown;
  isLoadingGetProductsList: boolean;
  getProductsListSuccess: string | null | any;
  getProductsList: (limit: string, skip: string)  => Promise<{ success: boolean; error?: string }>;
  getProductsByCategoryError: string | null | unknown;
  isLoadingGetProductsByCategory: boolean;
  getProductsByCategory: (categoryName: string, limit: string, skip: string)  => Promise<{ success: boolean; error?: string }>;
  getCategoriesProductsError: string | null | unknown;
  isLoadingGetCategoriesProducts: boolean;
  getCategoriesProductsSuccess: string | null | any;
  getCategoriesProducts: ()  => Promise<{ success: boolean; error?: string }>;
  createProductError: string | null | unknown;
  isLoadingCreateProduct: boolean;
  createProductSuccess: string | null | any;
  createProducts: ()  => Promise<{ success: boolean; error?: string }>;
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
  getProductsByCategoryError: null,
  isLoadingGetProductsByCategory: false,
  getProductsByCategory: async (categoryName: string, limit: string, skip: string) => {
    set((state: any) => ({ ...state, isLoadingGetProductsByCategory: true, getProductsByCategoryError: null }));
    try {
      const res = await getProductsByCategoryAPI(categoryName, limit, skip);
      console.log(res);
      if (res) {
        set((state) => ({
          ...state,
          getProductsByCategoryError: null,
          getProductsListSuccess: res,
        }));
      }
      return { success: true };
    } catch (err: any) {
      set((state: any) => ({ ...state, getProductsByCategoryError: err || 'Error desconocido' }));
      return { success: false, error: err || 'Error desconocido' };
    } finally {
      set((state: any) => ({ ...state, isLoadingGetProductsByCategory: false }));
    }
  },
  getCategoriesProductsSuccess: null,
  getCategoriesProductsError: null,
  isLoadingGetCategoriesProducts: false,
  getCategoriesProducts: async () => {
    set((state: any) => ({ ...state, isLoadingGetCategoriesProducts: true, getCategoriesProductsError: null }));
    try {
      console.log("HOLIIIIIIIIII")
      const res = await geCategoriestProductsAPI();
      console.log("CATEGORIAS RESPONSE API");
      console.log(res);
      if (res) {
        set((state) => ({
          ...state,
          getCategoriesProductsError: null,
          getCategoriesProductsSuccess: res,
        }));
      }
      return { success: true };
    } catch (err: any) {
      set((state: any) => ({ ...state, getCategoriesProductsError: err || 'Error desconocido' }));
      return { success: false, error: err || 'Error desconocido' };
    } finally {
      set((state: any) => ({ ...state, isLoadingGetCategoriesProducts: false }));
    }
  },
  createProductSuccess: null,
  createProductError: null,
  isLoadingCreateProduct: false,
  createProducts: async () => {
    set((state: any) => ({ ...state, isLoadingCreateProduct: true, createProductError: null }));
    try {
      const res = await createProductAPI();
      console.log("CREATE RESPONSE API");
      console.log(res);
      if (res) {
        set((state) => ({
          ...state,
          createProductError: null,
          createProductSuccess: res,
        }));
      }
      return { success: true };
    } catch (err: any) {
      set((state: any) => ({ ...state, createProductError: err || 'Error desconocido' }));
      return { success: false, error: err || 'Error desconocido' };
    } finally {
      set((state: any) => ({ ...state, isLoadingCreateProduct: false }));
    }
  },
});
