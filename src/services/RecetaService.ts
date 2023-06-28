import { Receta } from '../types/Receta';
import { URL_API_BASE } from "../constants";
import { GenericService } from './GenericService';

export async function findByArticuloManufacturadoId(id: number, token: string): Promise<Receta> {
    return GenericService<Receta>(`receta/byArticuloManufacturado/${id}`, "GET", token);
  }
  
  export async function saveReceta(entity: Receta, token: string): Promise<Receta> {
    return GenericService<Receta>("receta", "POST", token, entity);
  }
  
  export async function updateReceta(id: number, entity: Receta, token: string): Promise<Receta> {
    return GenericService<Receta>(`receta/${id}`, "PUT", token, entity);
  }

