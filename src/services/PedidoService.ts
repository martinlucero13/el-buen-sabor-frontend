import { Endpoint } from "../types/Endpoint";
import { EstadoPedido } from "../types/EstadoPedido";
import { Pedido } from "../types/Pedido";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

/**
 * Obtiene una lista de Pedidos por su clienteId.
 * 
 * @param clienteId ClienteId de los Pedidos a buscar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve con una lista de Pedidos.
 */
export async function findPedidosByCliente(clienteId: number, token: string): Promise<Pedido[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/${Endpoint.Pedidos}/byCliente/${clienteId}`, {
      method: "GET",
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as Pedido[];
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error! ${error}`);
  }
}

/**
 * Obtiene el tiempo estimado de un Pedido.
 * 
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en un tiempo estimado del Pedido.
 */
export async function findTiempoEstimado(token: string): Promise<number> {
  try {
    const response = await fetch(`${API_BASE_URL}/${Endpoint.Pedidos}/tiempoCocina`, {
      method: "GET",
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as number;
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error! ${error}`);
  }
}

/** 
* Obtiene Pedidos, buscados por su estado.
*
* @param estado Estado del Pedido a buscar.
* @param token Token de autenticación.
* @returns Una promesa que se resuelve en una lista de Pedidos.
*/
export async function findPedidosByEstado(estado: string | null, token: string): Promise<Pedido[]> {
  try {
    const params = new URLSearchParams();
    if (estado) {
      params.append('estado', estado);
    }

    const response = await fetch(`${API_BASE_URL}/${Endpoint.Pedidos}/filtrados?${params}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json() as Pedido[];

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error! ${error}`);
  }
};

/**
 * Guarda un Pedido.
 * 
 * @param entity Pedido a guardar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en el Pedido guardado.
 */
export async function savePedido(token: string | null, entity: Pedido) {
  try {
    const response = await fetch(`${API_BASE_URL}/${Endpoint.Pedidos}/saveFull`, {
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

    const data = await response.json() as Pedido;
    return data;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Actualiza un Estado del Pedido.
 * 
 * @param numeroPedido a actualizar.
 * @param nuevoEstado Nuevo estado del Pedido.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en el Estado del Pedido actualizado. 
 */
export async function updateEstadoPedido(id: number, nuevoEstado: EstadoPedido, token: string): Promise<Pedido> {
  try {
    const response = await fetch(`${API_BASE_URL}/${Endpoint.Pedidos}/updateEstado/${id}?estado=${nuevoEstado}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    if (response.status !== 201) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as Pedido;
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error! ${error}`);
  }
}

/**
 * Actualiza el Tiempo del Pedido.
 * 
 * @param id Id del Pedido que se quiera actualizar el Tiempo.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en el Tiempo de un pedido actualizado. 
 */
export async function updateTiempoPedido(id: number, nuevoTiempo: string, token: string): Promise<Pedido> {
  try {
    const response = await fetch(`${API_BASE_URL}/${Endpoint.Pedidos}/updateTiempo/${id}?tiempo=${nuevoTiempo}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    if (response.status !== 201) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as Pedido;
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error! ${error}`);
  }
}
/**
 * Actualiza el Stock del Pedido.
 * 
 * @param id Id del Pedido que se quiera restaurar el Stock.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en el Stock de un pedido actualizado. 
 */
export async function updateRestaurarStock(id: number, token: string): Promise<Pedido> {
  try {
    const response = await fetch(`${API_BASE_URL}/${Endpoint.Pedidos}/cancelarPedido/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as Pedido;
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error! ${error}`);
  }
}