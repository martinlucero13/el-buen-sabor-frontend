import { Endpoint } from "../types/Endpoint";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

/**
 * Busca una Imagen por su nombre y devuelve su URL.
 * 
 * @param nombre Nombre de la Imagen a buscar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en un string que representa la URL de la Imagen.
 */
export async function findImagenByName(nombre: string): Promise<string> {
    try {
        const response = await fetch(`${API_BASE_URL}/${Endpoint.Imagen}/byName/${nombre}`, {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.blob();
        const imagenUrl = URL.createObjectURL(data);

        return imagenUrl;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}