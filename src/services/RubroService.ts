import { URL_API_BASE } from "../constants";
import { Rubro } from "../types/Rubro";
import { GenericService } from "./GenericService";

export async function findAllRubro(token: string): Promise<Rubro[]> {
    return GenericService<Rubro[]>("rubros", "GET", token);
  }
  
  export async function findAllParents(token: string): Promise<Rubro[]> {
    return GenericService<Rubro[]>("rubros/parents", "GET", token);
  }
  
  export async function findRubroById(id: number, token: string): Promise<Rubro> {
    return GenericService<Rubro>(`rubros/${id}`, "GET", token);
  }
  
  export async function saveRubro(entity: Rubro, token: string): Promise<Rubro> {
    return GenericService<Rubro>("rubros", "POST", token, entity);
  }
  
  export async function updateRubro(id: number, entity: Rubro, token: string): Promise<Rubro> {
    return GenericService<Rubro>(`rubros/${id}`, "PUT", token, entity);
  }
