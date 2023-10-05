import { Auth0Rol } from "../types/Rol";
import { Endpoint } from "../types/Endpoint";
import { Auth0Usuario } from "../types/Usuario";
import { handleAuthorization } from "./BaseService";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

/**
 * Obtiene los roles de un Usuario de Auth0.
 * 
 * @param auth0Id auth0Id del Usuario a buscar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en una lista de roles de Auth0.
 */
export async function findAuth0RolesByUsuarioId(auth0Id: string, token: string): Promise<Auth0Rol[]> {
    try {
        const encoded = encodeURIComponent(auth0Id).replaceAll('|', '%7C');

        const response = await fetch(`${API_BASE_URL}/${Endpoint.Auth0}/roles/byUsuarioId/${encoded}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Auth0Rol[];
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Obtiene la cantidad de veces que ha ingresado un Usuario de Auth0.
 * 
 * @param auth0Id auth0Id del Usuario a buscar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve con el número de logins.
 */
export async function findLoginsByUsuarioId(auth0Id: string, token: string): Promise<number> {
    try {
        const encoded = encodeURIComponent(auth0Id).replaceAll('|', '%7C');

        const response = await fetch(`${API_BASE_URL}/${Endpoint.Auth0}/usuarios/logingsById/${encoded}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
        });

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

/**
 * Guarda un nuevo usuario de Auth0.
 * 
 * @param entity Auth0Usuario a guardar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve con el auth0Id del nuevo Usuario.
 */
export async function saveAuth0Usuario(entity: Auth0Usuario, token: string): Promise<string> {
    try {
        const response = await fetch(`${API_BASE_URL}/${Endpoint.Auth0}/usuarios`, {
            method: "POST",
            body: JSON.stringify(entity),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
        });

        handleAuthorization(response);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const usuarioId = data.user_id;
        return usuarioId;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Asigna un Usuario de Auth0 a un Rol de Auth0.
 * 
 * @param auth0Id auth0Id del Usuario a asignar. 
 * @param auth0RolId auth0RolId del Rol. 
 * @param token Token de autenticación.
 */
export async function asignarAuth0UsuarioARol(auth0Id: string, auth0RolId: string, token: string): Promise<void> {
    try {
       const requestBody = { usuarios: [auth0Id] };

        const response = await fetch(`${API_BASE_URL}/${Endpoint.Auth0}/usuarios/saveRol/${auth0RolId}`, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
        });

        handleAuthorization(response);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Reenvía el correo de verificación para un Usuario registrado en Auth0.
 * 
 * @param auth0Id auth0Id del Usuario. 
 * @param token Token de autenticación.
 */
export async function resendVerificationEmail(auth0Id: string, token: string): Promise<Response> {
    try {
        const encoded = encodeURIComponent(auth0Id).replaceAll('|', '%7C');

        const response = await fetch(`${API_BASE_URL}/${Endpoint.Auth0}/resendVerificationEmail/${encoded}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return response;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Actualiza el estado de blocked de un Usuario de Auth0.
 * 
 * @param auth0Id auth0Id del Usuario.
 * @param bloqueado Estado booleano a actualizar.
 * @param token Token de autenticación.
 */
export async function updateEstadoAuth0Usuario(auth0Id: string, bloqueado: boolean, token: string): Promise<void> {
    try {
        const encoded = encodeURIComponent(auth0Id).replaceAll('|', '%7C');

        const requestBody = { bloqueado: bloqueado };

        const response = await fetch(`${API_BASE_URL}/${Endpoint.Auth0}/usuarios/updateEstado/${encoded}`, {
            method: "PATCH",
            body: JSON.stringify(requestBody),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
        });

        handleAuthorization(response);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Actualiza el email de un Usuario de Auth0.
 * 
 * @param auth0Id auth0Id del Usuario. 
 * @param email Email a actualizar.
 * @param token Token de autenticación.
 */
export async function updateEmailAuth0Usuario(auth0Id: string, email: string, token: string): Promise<void> {
    try {
        const encoded = encodeURIComponent(auth0Id).replaceAll('|', '%7C');

        const requestBody = { email: email };

        const response = await fetch(`${API_BASE_URL}/${Endpoint.Auth0}/usuarios/updateEmail/${encoded}`, {
            method: "PATCH",
            body: JSON.stringify(requestBody),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
        });

        const responseVerificationEmail = await resendVerificationEmail(auth0Id, token);

        if (!response.ok || responseVerificationEmail.status !== 201) {
            throw new Error(`HTTP error! status: ${response.status}. HTTP error! status: ${responseVerificationEmail.status}`);
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Actualiza la contraseña de un Usuario de Auth0.
 * 
 * @param auth0Id auth0Id del Usuario. 
 * @param clave Contraseña a actualizar.
 * @param token Token de autenticación.
 */
export async function updateClaveAuth0Usuario(auth0Id: string, clave: string, token: string): Promise<void> {
    try {
        const encoded = encodeURIComponent(auth0Id).replaceAll('|', '%7C');

        const requestBody = { clave: clave };

        const response = await fetch(`${API_BASE_URL}/${Endpoint.Auth0}/usuarios/updateClave/${encoded}`, {
            method: "PATCH",
            body: JSON.stringify(requestBody),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Elimina Roles de Auth0 de un Usuario de Auth0.
 * 
 * @param auth0Id auth0Id del Usuario. 
 * @param roles Lista de Auth0Rol a eliminar.
 * @param token Token de autenticación.
 */
export async function deleteRolesFromAuth0Usuario(auth0Id: string, auth0Roles: Auth0Rol[], token: string): Promise<void> {
    try {
        const encoded = encodeURIComponent(auth0Id).replaceAll('|', '%7C');

        const rolesId = auth0Roles.map(rol => rol.id);
        const requestBody = { roles: rolesId };

        const response = await fetch(`${API_BASE_URL}/${Endpoint.Auth0}/usuarios/deleteRoles/${encoded}`, {
            method: "DELETE",
            body: JSON.stringify(requestBody),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
        });

        handleAuthorization(response);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}