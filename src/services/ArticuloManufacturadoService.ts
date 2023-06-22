import { URL_API_BASE } from "../constants";
import { findImagenByName } from "./ImagenService";
import { ArticuloManufacturado } from "../types/ArticuloManufacturado";

export async function findAllArticuloManufacturados(token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/articulos-manufacturados`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as ArticuloManufacturado[];

        for (const item of data) {
            const newImagenUrl = await findImagenByName(item.imagen.nombre, token);
            item.imagen.imagenUrl = newImagenUrl || "";
        }

        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function findArticuloManufacturadoById(id: number, token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/articulos-manufacturados/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as ArticuloManufacturado;
        const newImagenUrl = await findImagenByName(data.imagen.nombre, token);
        data.imagen.imagenUrl = newImagenUrl || "";

        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function findAllArticuloManufacturadosByTermino(termino: string, token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/articulos-manufacturados/byTermino/${termino}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as ArticuloManufacturado[];

        for (const item of data) {
            const newImagenUrl = await findImagenByName(item.imagen.nombre, token);
            item.imagen.imagenUrl = newImagenUrl || "";
        }

        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}


export async function saveArticuloManufacturado(articuloManufacturado: ArticuloManufacturado, token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/articulos-manufacturados`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(articuloManufacturado),
        });

        const data = await response.json();
        const nuevoIdArticuloManufacturado = data.id; // Obtener el ID del nuevo artículo

        return nuevoIdArticuloManufacturado;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function updateArticuloManufacturado(id: number, articuloManufacturado: ArticuloManufacturado, token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/articulos-manufacturados/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(articuloManufacturado),
        });

        const data = await response.json();
        const nuevoIdArticuloManufacturado = data.id; // Obtener el ID del nuevo artículo

        return nuevoIdArticuloManufacturado;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}
