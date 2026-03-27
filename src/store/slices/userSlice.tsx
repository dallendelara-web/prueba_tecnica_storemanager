import { type StateCreator } from "zustand";
import { loginAPI } from "@/api/AuthAPI";
import { getProductsAPI } from "@/api/UsersAPI";
import type { LoginResponse, GetUsersResponse } from "@/types/User";

export interface UserSlice {
  loggedUserError: string | null | unknown;
  isLoadingLogin: boolean;
  logIN: (user: string, password: string)  => Promise<LoginResponse>;
  getUsersError: string | null | unknown;
  isLoadingGetUsers: boolean;
  getUsersSuccess: string | null | any;
  getUsers: (limit: string, skip: string)  => Promise<{ success: boolean; error?: string }>;
}

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set,
  get,
) => ({
  loggedUserError: null,
  isLoadingLogin: false,
  logIN: async (user: string, password: string): Promise<LoginResponse> => {
    // Set loading state
    set((state) => ({
       ...state, 
       isLoadingLogin: true, 
       loggedUserError: null ,
    }));
    
    try {
      const response = await loginAPI(user, password);

      if (response?.success == true) {
        set((state) => ({
          ...state,
          loggedUserError: null,
          data: response
        }));
        
      }else{
        set((state) => ({
          ...state,
          loggedUserError: response?.message
        }));
      }

      return response;

    } catch (error: any) {
      set((state) => ({ ...state, loggedUserError: error }));
      return { success: false, message: error.message || 'Error desconocido' };

    } finally {
      //Desactiva el modo de carga
      set((state) => ({ ...state, isLoadingLogin: false }));
    }
  },
  getUsersSuccess: null,
  getUsersError: null,
  isLoadingGetUsers: false,
  getUsers: async (limit: string, skip: string) => {
    set((state: any) => ({ ...state, isLoadingGetUsers: true, getUsersError: null }));
    try {
      const res = await getProductsAPI(limit, skip);
      console.log(res);
      if (res) {
        set((state) => ({
          ...state,
          getUsersError: null,
          getUsersSuccess: res,
        }));
      }
      return { success: true };
    } catch (err: any) {
      set((state: any) => ({ ...state, getUsersError: err || 'Error desconocido' }));
      return { success: false, error: err || 'Error desconocido' };
    } finally {
      set((state: any) => ({ ...state, isLoadingGetUsers: false }));
    }
  },
});
