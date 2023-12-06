import { Endpoint } from "../types/Endpoint";
import { fetchWithAuthorization } from "./BaseService";
import { FiltroRubro, Rubro, TipoRubro } from "../types/Rubro";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

/**
 * Obtiene una lista de Rubros por tipo (Insumo o Producto).
 * 
 * @param tipo El tipo de Rubro para filtrar la búsqueda.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en una lista de Rubros.
 */
export async function findRubrosByTipo(tipo: TipoRubro, token: string): Promise<Rubro[]> {
    try {
        const bool = tipo === TipoRubro.INSUMO ? true : false;

        const response = await fetchWithAuthorization(`${API_BASE_URL}/${Endpoint.Rubro}/${FiltroRubro.TIPO}/${bool}`, "GET", token);        

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Rubro[];
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Verifica si existe un Rubro por denominación.
 * 
 * @param denominacion Denominación a verificar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en un boolean.
 */
export async function existsRubroByDenominacion(denominacion: string, token: string): Promise<boolean> {
    try {
        const response = await fetchWithAuthorization(`${API_BASE_URL}/${Endpoint.Rubro}/${FiltroRubro.EXISTE}/${denominacion}`, "GET", token);

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