import { Endpoint } from "../types/Endpoint";
import { fetchWithAuthorization } from "./BaseService";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

/**
 * Verifica si existe un Usuario por email.
 * 
 * @param email Denominación a verificar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en un boolean.
 */
export async function existsUsuarioByEmail(email: string, token: string): Promise<boolean> {
    try {
        const response = await fetchWithAuthorization(`${API_BASE_URL}/${Endpoint.Usuario}/exists/${email}`, "GET", token);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}