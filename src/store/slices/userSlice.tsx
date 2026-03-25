import { type StateCreator } from "zustand";
import { loginAPI } from "@/api/AuthAPI";
import type { LoginResponse } from "@/types/User";

export interface UserSlice {
  loggedUserError: string | null | unknown;
  isLoadingLogin: boolean;
  logIN: (user: string, password: string)  => Promise<LoginResponse>;
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
});
