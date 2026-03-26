import { postRequest, getRequest } from '../helpers/HTTP-Helper';
import type { GetProductsResponse } from "@/types/Products";

const API_URL_BASE = '/products';

export const getProductsAPI = async (
    limit: string, 
    skip: string,
    q?: string
): Promise<GetProductsResponse> => {
    try {
        const params = `?limit=${limit}&skip=${skip}`;
        const url = API_URL_BASE + params;
        
        const response = await getRequest(url , true, {});

        if (response?.status == 200 ||response?.status === 'success' || response?.code === 200) {
            return {
                success: true,
                status: "200",
                message: response?.message ?? 'Productos obtenidos con éxito',
                data: response?.data
            };
        }else {
            return {
                success: false,
                message: response?.message ?? response ?? 'Error al obtener productos',
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