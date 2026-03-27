import { getRequest } from '../helpers/HTTP-Helper';
import type { GetProductsResponse } from "@/types/Products";
import type { GetUsersResponse } from "@/types/User";

const API_URL_BASE = '/users';

export const getUsersAPI = async (
    limit: string, 
    skip: string
): Promise<GetUsersResponse> => {
    try {
        const params = `?limit=${limit}&skip=${skip}`;
        const url = API_URL_BASE + params;
        
        const response = await getRequest(url , true, {});

        if (response?.status == 200 ||response?.status === 'success' || response?.code === 200) {
            return {
                success: true,
                status: "200",
                message: response?.message ?? 'Usuarios obtenidos con éxito',
                data: response?.data
            };
        }else {
            return {
                success: false,
                message: response?.message ?? response ?? 'Error al obtener usuarios',
                data: []
            };
        }
        
    } catch (error: any) {
        return {
            success: false,
            status: "500",
            message: "Error del servidor",
            data: error
        };
    }
};

export const getUserDetailsAPI = async (
    id: string
): Promise<GetUsersResponse> => {
    try {
        const params = `/${id}/carts`;
        const url = API_URL_BASE + params;
        
        const response = await getRequest(url , true, {});

        if (response?.status == 200 ||response?.status === 'success' || response?.code === 200) {
            return {
                success: true,
                status: "200",
                message: response?.message ?? 'Detalles de usuario obtenidos con éxito',
                data: response?.data
            };
        }else {
            return {
                success: false,
                message: response?.message ?? response ?? 'Error al obtener el detalle del usuario',
                data: []
            };
        }
        
    } catch (error: any) {
        return {
            success: false,
            status: "500",
            message: "Error del servidor",
            data: error
        };
    }
};