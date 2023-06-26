import { URL_API_BASE } from "../constants";
import { UnidadMedida } from "../types/UnidadMedida";
import { GenericService } from "./GenericService";

export async function findAllUnidadMedida(token: string): Promise<UnidadMedida[]> {
    return GenericService<UnidadMedida[]>("unidad-medida", "GET", token);
  }
  
  export async function findUnidadMedidaById(id: number, token: string): Promise<UnidadMedida> {
    return GenericService<UnidadMedida>(`unidad-medida/${id}`, "GET", token);
  }
  
  export async function saveUnidadMedida(entity: UnidadMedida, token: string): Promise<UnidadMedida> {
    return GenericService<UnidadMedida>("unidad-medida", "POST", token, entity);
  }
  
  export async function updateUnidadMedida(id: number, entity: UnidadMedida, token: string): Promise<UnidadMedida> {
    return GenericService<UnidadMedida>(`unidad-medida/${id}`, "PUT", token, entity);
  }
