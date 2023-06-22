import { URL_API_BASE } from "../constants";
import { Cliente } from "../types/Cliente";

export async function findAllClientesByRoles(roles: string[], token: string): Promise<Cliente[]> {
    try {
        const response = await fetch(`${URL_API_BASE}/clientes/byRoles/${roles.join(",")}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Cliente[];
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function findAllClientesByNombre(nombre: string, token: string): Promise<Cliente[]> {
    try {
        const response = await fetch(`${URL_API_BASE}/clientes/byNombre/${nombre}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Cliente[];
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function findAllClientesByApellido(apellido: string, token: string): Promise<Cliente[]> {
    try {
        const response = await fetch(`${URL_API_BASE}/clientes/byApellido/${apellido}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Cliente[];
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function findAllClientesByNombreAndApellido(nombre: string, apellido: string, token: string): Promise<Cliente[]> {
    try {
        const response = await fetch(`${URL_API_BASE}/clientes/byNombreAndApellido/${nombre}/${apellido}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Cliente[];
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function saveCliente(entity: Cliente, token: string): Promise<Cliente> {
    try {
        const response = await fetch(`${URL_API_BASE} / clientes`, {
            method: "POST",
            body: JSON.stringify(entity),
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.status === 201) {
            const data = await response.json() as Cliente;
            return data;
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function updateCliente(id: number, entity: Cliente, token: string): Promise<Cliente> {
    try {
        const response = await fetch(`${URL_API_BASE} / clientes/${id}}`, {
            method: "PUT",
            body: JSON.stringify(entity),
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.status === 201) {
            const data = await response.json() as Cliente;
            return data;
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function deleteCliente(id: number) {

}