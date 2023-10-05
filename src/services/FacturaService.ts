import { Endpoint } from "../types/Endpoint";
import { Factura } from "../types/Factura";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

/**
 * Obtiene una Factura por el id del Pedido.
 * 
 * @param pedidoId pedidoId del pedido a buscar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en una Factura.
 */
export async function findFacturaByPedido(pedidoId: number, token: string): Promise<Factura> {
  try {
    const response = await fetch(`${API_BASE_URL}/${Endpoint.Factura}/byPedido/${pedidoId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as Factura;
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error! ${error}`);
  }
}

/**
 * Guarda una Factura.
 * 
 * @param entity Factura a guardar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en la Factura guardada.
 */
export async function saveFactura(token: string, factura: Factura) {
  try {
    const response = await fetch(API_BASE_URL + '/facturas/save-factura', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(factura),
    });

    const data = await response.json() as Factura;

    if (response.status !== 201) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Actualiza la fecha de baja de la Factura.
 * 
 * @param id Id de la factura a actualizar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en la fecha que se dio de baja la Factura. 
 */
export async function updateFechaBaja(id: number, token: string): Promise<Factura> {
  try {
    const response = await fetch(`${API_BASE_URL}/${Endpoint.Factura}/updateFecha/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    if (response.status !== 201) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as Factura;
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error! ${error}`);
  }
}