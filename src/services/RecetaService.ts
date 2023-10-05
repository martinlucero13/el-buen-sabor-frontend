import { Receta } from "../types/Receta";
import { Endpoint } from "../types/Endpoint";
import { fetchWithAuthorization } from "./BaseService";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

/**
 * Obtiene una receta asociada a un Artículo Manufacturado por su ID.
 * 
 * @param id ID del Artículo Nanufacturado para el cual se desea obtener la receta.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en la receta asociada al Artículo Manufacturado.
 */
export async function findRecetaByArticuloManufacturado(id: number, token: string): Promise<Receta> {
    try {
        const response = await fetchWithAuthorization(`${API_BASE_URL}/${Endpoint.Receta}/byArticuloManufacturado/${id}`, "GET", token);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Receta;
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}