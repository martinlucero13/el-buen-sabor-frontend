import { Receta } from '../types/Receta';
import { URL_API_BASE } from "../constants";

export async function findByArticuloManufacturadoId(id: number, token: string): Promise<Receta> {
    try {
        const response = await fetch(`${URL_API_BASE}/receta/byArticuloManufacturado/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

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

export async function saveReceta(entity: Receta, token: string): Promise<Receta> {
    try {
        const response = await fetch(`${URL_API_BASE}/receta`, {
            method: "POST",
            body: JSON.stringify(entity),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            }
        });

        if (response.status === 201) {
            const data = await response.json() as Receta;
            return data;
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function updateReceta(id: number, entity: Receta, token: string): Promise<Receta> {
    try {
        const response = await fetch(`${URL_API_BASE}/receta/${id}`, {
            method: "PUT",
            body: JSON.stringify(entity),
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.status === 201) {
            const data = await response.json() as Receta;
            return data;
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}