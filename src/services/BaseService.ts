import { Base } from "../types/Base";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

/**
 * Maneja la autorización de una respuesta HTTP.
 * 
 * @param response Respuesta HTTP a manejar.
 * @returns La misma respuesta recibida.
 */
export function handleAuthorization(response: Response): Response {
    if (response.status === 401 || response.status === 403) {
        window.location.href = "/unauthorized";
    }

    return response;
}

/**
 * Realiza una solicitud HTTP con autorización y devuelve la respuesta.
 * 
 * @param endpoint Endpoint de la API para la entidad deseada.
 * @param method Método HTTP utilizado para la solicitud (GET, POST, PUT, DELETE, etc.).
 * @param token Token de autorización (opcional).
 * @param body Body de la solicitud (opcional).
 * @returns Una promesa que se resuelve en la respuesta de la solicitud.
 */
export async function fetchWithAuthorization<T>(endpoint: string, method: string, token?: string, body?: T): Promise<Response> {
    try {
        const headers: HeadersInit = {};

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        if (body) {
            headers["Content-Type"] = "application/json";
        }

        const response = await fetch(endpoint, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        return handleAuthorization(response);
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Obtiene todos los elementos de una entidad especifica.
 * 
 * @param endpoint Endpoint de la API para la entidad deseada.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en una lista de elementos de la entidad especificada.
 */
export async function findAll<T extends Base>(endpoint: string, token?: string): Promise<T[]> {
    try {
        const response = await fetchWithAuthorization(`${API_BASE_URL}/${endpoint}`, "GET", token);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as T[];
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Obtiene todos los elementos de una entidad (simple) especifica.
 * 
 * @param endpoint Endpoint de la API para la entidad deseada.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en una lista de elementos de la entidad especificada.
 */
export async function findAllSimple<T extends Base>(endpoint: string, token?: string): Promise<T[]> {
    try {
        const response = await fetchWithAuthorization(`${API_BASE_URL}/${endpoint}/simple`, "GET", token);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as T[];
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Obtiene todos los elementos de una entidad (simple) especifica que se encuentren activos.
 * 
 * @param endpoint Endpoint de la API para la entidad deseada.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en una lista de elementos de la entidad especificada.
 */
export async function findAllSimpleActivos<T extends Base>(endpoint: string, token?: string): Promise<T[]> {
    try {
        const response = await fetchWithAuthorization(`${API_BASE_URL}/${endpoint}/activos`, "GET", token);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as T[];
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Obtiene un elemento de una entidad específica por su ID.
 * 
 * @param endpoint Endpoint de la API para la entidad deseada.
 * @param id ID de la entidad a buscar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve con un elemento de la entidad especificada.
 */
export async function findById<T extends Base>(endpoint: string, id: number, token?: string): Promise<T> {
    try {
        const response = await fetchWithAuthorization(`${API_BASE_URL}/${endpoint}/${id}`, "GET", token);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as T;
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Obtiene un elemento de una entidad (simple) específica por su ID.
 * 
 * @param endpoint Endpoint de la API para la entidad deseada.
 * @param id ID de la entidad a buscar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve con un elemento de la entidad especificada.
 */
export async function findSimpleById<T extends Base>(endpoint: string, id: number, token?: string): Promise<T> {
    try {
        const response = await fetchWithAuthorization(`${API_BASE_URL}/${endpoint}/simple/${id}`, "GET", token);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as T;
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Guarda un nuevo elemento de una entidad específica.
 * 
 * @param endpoint Endpoint de la API para la entidad deseada.
 * @param entity Entidad a guardar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve con el elemento guardado de la entidad especificada.
 */
export async function save<T extends Base>(endpoint: string, entity: T, token: string): Promise<T> {
    try {
        const response = await fetchWithAuthorization(`${API_BASE_URL}/${endpoint}`, "POST", token, entity);

        if (response.status === 201) {
            const data = await response.json() as T;
            return data;
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Actualiza un elemento de una entidad específica por su ID.
 * 
 * @param endpoint Endpoint de la API para la entidad deseada.
 * @param id ID de la entidad a actualizar.
 * @param entity Entidad con los datos actualizados.
 * @param token Token de autenticación.
 * @returns  Una promesa que se resuelve con el elemento actualizado de la entidad especificada.
 */
export async function update<T extends Base>(endpoint: string, id: number, entity: T, token: string): Promise<T> {
    try {
        const response = await fetchWithAuthorization(`${API_BASE_URL}/${endpoint}/${id}`, "PUT", token, entity);

        if (response.status === 201) {
            const data = await response.json() as T;
            return data;
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Actualiza el estado de un elemento de una entidad específica por su ID.
 * 
 * @param endpoint Endpoint de la API para la entidad deseada.
 * @param id ID de la entidad a actualizar.
 * @param token Token de autenticación.
 * @returns  Una promesa que se resuelve con el elemento actualizado de la entidad especificada.
 */
export async function updateEstado<T extends Base>(endpoint: string, id: number, token: string): Promise<T> {
    try {
        const response = await fetchWithAuthorization(`${API_BASE_URL}/${endpoint}/updateEstado/${id}`, "PUT", token);

        if (response.status === 201) {
            const data = await response.json() as T;
            return data;
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Elimina un elemento de una entidad específica por su ID.
 * 
 * @param endpoint Endpoint de la API para la entidad deseada.
 * @param id ID de la entidad a eliminar.
 * @param token Token de autenticación.
 */
export async function remove(endpoint: string, id: number, token: string): Promise<void> {
    try {
        const response = await fetchWithAuthorization(`${API_BASE_URL}/${endpoint}/${id}`, "DELETE", token);

        if (response.status !== 204) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}