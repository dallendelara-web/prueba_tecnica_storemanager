import { type StateCreator } from "zustand";
import { createPerfilVistaAPI, getPerfilVistasAPI, updatePerfilVistaAPI } from "../../api/PerfilVistasAPI";

export interface PerfilVistaData {
  _id: string;
  consultar: boolean;
  crear: boolean;
  modificar: boolean;
  eliminar_logic: boolean;
  id_perfil: string;
  id_vista: string;
  activo: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface PerfilVistaSlice {
  getPerfilVistasError: string | null | unknown;
  isLoadingGetPerfilVistas: boolean;
  getPerfilVistasSuccess: string | null | any;
  getPerfilVistas: ()  => Promise<{ success: boolean; error?: string }>;
  perfilVistaError: string | null | unknown;
  isLoadingPerfilVista: boolean;
  PerfilVistaSuccess: string | null | any;
  createPerfilVista: (data: any, refreshAuth?: (perfilId: string) => Promise<void>)  => Promise<{ success: boolean; error?: string }>;
  updatePerfilVista: (id: string, data: any, refreshAuth?: (perfilId: string) => Promise<void>)  => Promise<{ success: boolean; error?: string }>;
}

export const createPerfilVistaSlice: StateCreator<PerfilVistaSlice, [], [], PerfilVistaSlice> = (
  set,
) => ({
  getPerfilVistasSuccess: null,
  getPerfilVistasError: null,
  isLoadingGetPerfilVistas: false,
  getPerfilVistas: async () => {
    set((state: any) => ({ ...state, isLoadingGetPerfilVistas: true, getPerfilVistasError: null }));
    try {
      const res = await getPerfilVistasAPI();
      if (res) {
        set((state) => ({
          ...state,
          getPerfilVistasError: null,
          getPerfilVistasSuccess: res,
        }));
      }
      return { success: true };
    } catch (err: any) {
      set((state: any) => ({ ...state, getPerfilVistasError: err || 'Error desconocido' }));
      return { success: false, error: err || 'Error desconocido' };
    } finally {
      set((state: any) => ({ ...state, isLoadingGetPerfilVistas: false }));
    }
  },
  PerfilVistaSuccess: null,
  perfilVistaError: null,
  isLoadingPerfilVista: false,
  createPerfilVista: async (data: any, refreshAuth) => {
    set((state: any) => ({ ...state, isLoadingPerfilVista: true, perfilVistaError: null }));
    try {
      const res = await createPerfilVistaAPI(data);
      if (res) {
        set((state) => ({
          ...state,
          perfilVistaError: null,
          PerfilVistaSuccess: res,
        }));
      }
      // Actualizar localStorage si se proporciona la función refreshAuth
      if (refreshAuth && data.id_perfil) {
        await refreshAuth(data.id_perfil);
      }
      return { success: true };
    } catch (err: any) {
      set((state: any) => ({ ...state, perfilVistaError: err || 'Error desconocido' }));
      return { success: false, error: err || 'Error desconocido' };
    } finally {
      set((state: any) => ({ ...state, isLoadingPerfilVista: false }));
    }
  },
  updatePerfilVista: async (id: string, data: any, refreshAuth) => {
    set((state: any) => ({ ...state, isLoadingPerfilVista: true, perfilVistaError: null }));
    try {
      const res = await updatePerfilVistaAPI(id, data);
      if (res) {
        set((state) => ({
          ...state,
          perfilVistaError: null,
          PerfilVistaSuccess: res,
        }));
      }
      // Actualizar localStorage si se proporciona la función refreshAuth
      if (refreshAuth && data.id_perfil) {
        await refreshAuth(data.id_perfil);
      }
      return { success: true };
    } catch (err: any) {
      set((state: any) => ({ ...state, perfilVistaError: err || 'Error desconocido' }));
      return { success: false, error: err || 'Error desconocido' };
    } finally {
      set((state: any) => ({ ...state, isLoadingPerfilVista: false }));
    }
  },
});
