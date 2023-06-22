import { URL_API_BASE } from "../constants";
import { UnidadMedida } from "../types/UnidadMedida";

export async function findAllUnidadMedida(token: string): Promise<UnidadMedida[]> {
    try {
        const response = await fetch(`${URL_API_BASE}/unidad-medida`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as UnidadMedida[];
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function findUnidadMedidaById(id: number, token: string): Promise<UnidadMedida> {
    try {
        const response = await fetch(`${URL_API_BASE}/unidad-medida/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as UnidadMedida;
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function saveUnidadMedida(entity: UnidadMedida, token: string): Promise<UnidadMedida> {
    try {
        const response = await fetch(`${URL_API_BASE}/unidad-medida`, {
            method: "POST",
            body: JSON.stringify(entity),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            }
        });

        if (response.status === 201) {
            const data = await response.json() as UnidadMedida;
            return data;
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function updateUnidadMedida(id: number, entity: UnidadMedida, token: string): Promise<UnidadMedida> {
    try {
        const response = await fetch(`${URL_API_BASE}/unidad-medida/${id}`, {
            method: "PUT",
            body: JSON.stringify(entity),
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.status === 201) {
            const data = await response.json() as UnidadMedida;
            return data;
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}