import { URL_API_BASE } from "../constants";
import { findImagenByName } from "./ImagenService";
import { ArticuloManufacturado } from "../types/ArticuloManufacturado";
import { Pedido } from "../types/Pedido";

export async function findAllPedidos(token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/pedidos`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Pedido[];

        /*for (const item of data) {
            const newImagenUrl = await findImagenByName(item.imagen.nombre, token);
            item.imagen.imagenUrl = newImagenUrl || "";
        }*/

        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function findPedidoById(id: number, token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/pedidos/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Pedido;

        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function findAllPedidosByTermino(termino: string, token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/pedidos/byTermino/${termino}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Pedido[];


        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}


export async function savePedido(pedido: Pedido, token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/pedidos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(pedido),
        });

        const data = await response.json();
        const nuevoIdPedido = data.id; // Obtener el ID del nuevo artículo

        return nuevoIdPedido;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function updatePedido(id: number, pedido: Pedido, token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/pedidos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(pedido),
        });

        const data = await response.json();
        const nuevoIdPedido = data.id; // Obtener el ID del nuevo artículo

        return nuevoIdPedido;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}
