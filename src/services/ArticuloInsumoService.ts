import { Endpoint } from "../types/Endpoint";
import { ArticuloInsumo, ArticuloInsumoUpdate } from "../types/ArticuloInsumo";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

/**
 * Actualiza el Stock de un Artículo Insumo por su ID.
 * 
 * @param id ID del Artículo Insumo a Actualizar.
 * @param entity Artículo Manufacturado Update a actualizar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en el Artículo Insumo actualizado.
 */
export async function updateStockArticuloInsumo(id: number, entity: ArticuloInsumoUpdate, token: string): Promise<ArticuloInsumo> {
    try {
        const response = await fetch(`${API_BASE_URL}/${Endpoint.ArticuloInsumo}/updateStock/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(entity)
        });

        if (response.status === 201) {
            const data = await response.json() as ArticuloInsumo;
            return data;
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}