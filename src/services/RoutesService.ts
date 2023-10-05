import { Endpoint } from "../types/Endpoint";
import { fetchWithAuthorization } from "./BaseService";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

/**
 * Verifica si un usuario tiene autorización para acceder a una ruta específica.
 * 
 * @param route Ruta para verificar la autorización.
 * @param token Token de autenticación.
 * @returns  Una promesa que se resuelve en un valor booleano.
 */
export async function findIsAuthorized(route: string, token: string): Promise<boolean> {
    try {
        const response = await fetchWithAuthorization(`${API_BASE_URL}/${Endpoint.Routes}/${route}`, "GET", token);

        if (response.status === 204) {
            return true;
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        return false;
    }
}