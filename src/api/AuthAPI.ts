import { postRequest } from '../helpers/HTTP-Helper';
import type { LoginType, LoginResponse } from "@/types/User";

const API_URL_BASE = '/auth';

export const loginAPI = async (
    username: string, 
    password: string
): Promise<LoginResponse> => {
    // Real backend implementation
    try {
        const url = API_URL_BASE + '/login'
        const body = {
            "username": username,
            "password": password
        };
        
        const response = await postRequest(url , body, false, {});

        if (response?.status == 200 ||response?.status === 'success' || response?.code === 200) {
            return {
                success: true,
                status: "200",
                message: response?.message ?? 'Login exitoso',
                data: response?.data
            };
        }else {
            return {
                success: false,
                message: response?.message ?? response ?? 'Error en el login',
                data: []
            };
        }
        
    } catch (error: any) {
        return {
            success: false,
            status: "error",
            code: 500,
            message: "Error del servidor",
            data: error
        };
    }
};