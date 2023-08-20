import { Endpoint } from "../types/Endpoint";
import { RankingCliente, RankingMonetarios, RankingProducto } from "../types/Estadistica";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

/** 
* Obtiene Ranking de los Productos.
*
* @param fechaInicio Fecha inicio de los productos a buscar.
* @param fechaFin Fecha fin de los productos a buscar.
* @param token Token de autenticación.
* @returns Una promesa que se resuelve en una lista de Productos.
*/
export async function findRankingProductos(fechaInicio: Date | null, fechaFin: Date | null, token: string){
    try {
      const queryParams = new URLSearchParams();
      if (fechaInicio) {
        queryParams.append('fechaInicio', fechaInicio.toISOString());
      }
      if (fechaFin) {
        queryParams.append('fechaFin', fechaFin.toISOString());
      }
  
      const response = await fetch(`${API_BASE_URL}/${Endpoint.DetallePedido}/rankingProductos?${queryParams}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
  
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json() as RankingProducto[];
      
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(`Error! ${error}`);
    }
}

/** 
* Obtiene Ranking de los Clientes.
*
* @param fechaInicio Fecha inicio de los clientes a buscar.
* @param fechaFin Fecha fin de los clientes a buscar.
* @param token Token de autenticación.
* @returns Una promesa que se resuelve en una lista de Clientes.
*/
export async function findRankingClientes(fechaInicio: Date | null, fechaFin: Date | null, token: string){
  try {
    const queryParams = new URLSearchParams();
    if (fechaInicio) {
      queryParams.append('fechaInicio', fechaInicio.toISOString());
    }
    if (fechaFin) {
      queryParams.append('fechaFin', fechaFin.toISOString());
    }

    const response = await fetch(`${API_BASE_URL}/${Endpoint.DetallePedido}/rankingClientes?${queryParams}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json() as RankingCliente[];

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error! ${error}`);
  }
}

/** 
* Obtiene un objeto(MovimientoMonetario) con las ganancias, ingresos y gastos.
*
* @param fechaInicio Fecha inicio de los productos a buscar.
* @param fechaFin Fecha fin de los productos a buscar.
* @param token Token de autenticación.
* @returns Una promesa que se resuelve en un objeto de tipo MovimientosMonetarios.
*/
export async function findMovimientosMonetarios(fechaInicio: Date | null, fechaFin: Date | null, token: string){
  try {
    const queryParams = new URLSearchParams();
    if (fechaInicio) {
      queryParams.append('fechaInicio', fechaInicio.toISOString());
    }
    if (fechaFin) {
      queryParams.append('fechaFin', fechaFin.toISOString());
    }

    const response = await fetch(`${API_BASE_URL}/${Endpoint.DetallePedido}/movMonetarios?${queryParams}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json() as RankingMonetarios;

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error! ${error}`);
  }
}