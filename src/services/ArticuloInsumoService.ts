
import { ArticuloInsumo } from "../types/ArticuloInsumo";
import { GenericService } from "./GenericService";

export async function findAllArticuloInsumo(token: string) {
  return GenericService<ArticuloInsumo[]>("articulos-insumos", "GET", token);
}

export async function findBebidas(token: string) {
  return GenericService<ArticuloInsumo[]>("articulos-insumos/bebidas", "GET", token);
}

export async function findArticuloInsumoById(id: number, token: string) {
  return GenericService<ArticuloInsumo>(`articulos-insumos/${id}`, "GET", token);
}

export async function saveArticuloInsumo(articuloInsumo: ArticuloInsumo, token: string) {
  return GenericService<ArticuloInsumo>("articulos-insumos", "POST", token, articuloInsumo);
}

export async function updateArticuloInsumo(id: number, articuloInsumo: ArticuloInsumo, token: string) {
  return GenericService<ArticuloInsumo>(`articulos-insumos/${id}`, "PUT", token, articuloInsumo);
}

export async function deleteArticuloInsumo(id: number, token: string) {
  return GenericService<void>(`articulos-insumos/${id}`, "DELETE", token);
}