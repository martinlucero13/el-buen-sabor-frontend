import { Endpoint } from "../types/Endpoint";
import { DetallePedido } from "../types/DetallePedido";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

/** 
* Obtiene DetallesPedidos, buscados por su pedidoId.
*
* @param id Id del Pedido a buscar.
* @param token Token de autenticación.
* @returns Una promesa que se resuelve en una lista de DetallePedidos.
*/
export async function findDetallesByPedidoId(id: number, token: string): Promise<DetallePedido[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/${Endpoint.DetallePedido}/pedido/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json() as DetallePedido[];
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Guarda un una lista de DetallePedido con el stock actualizado.
 * 
 * @param entity Lista con los DetallesPedidos a guardar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en una lista de DetallePedido guardado.
 */
export async function saveCompraArticulos(token: string | null, entity: DetallePedido[]) {
    try {
        const response = await fetch(`${API_BASE_URL}/${Endpoint.DetallePedido}/comprar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(entity),
        });

        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as DetallePedido[];
        return data;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Guarda una lista de DetallesPedidos.
 * 
 * @param entity DetallesPedidos a guardar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en la lista de DetallesPedidos guardada.
 */
export async function saveDetallePedido(token: string | null, entity: DetallePedido[]) {
    try {
        const response = await fetch(`${API_BASE_URL}/${Endpoint.DetallePedido}/saveFull`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(entity),
        });

        if (response.status !== 201) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as DetallePedido[];
        return data;
    } catch (error) {
        console.error(error);
    }
}
