
import { ArticuloManufacturadoInsumo } from "../types/ArticuloManufacturadoInsumo";
import { GenericService } from "./GenericService";

export async function findByArticuloManufacturado(id: number, token: string) {
    return GenericService<ArticuloManufacturadoInsumo[]>(`articulos-manufacturados-insumos/byArticuloManufacturado/${id}`, "GET", token);
}
  
export async function saveArticuloManufacturadoInsumo(articuloManufacturadoInsumo: ArticuloManufacturadoInsumo, token: string) {
    return GenericService<void>("articulos-manufacturados-insumos", "POST", token, articuloManufacturadoInsumo);
}
  
export async function findArticuloManufacturadoInsumoById(id: number, token: string) {
    return GenericService<ArticuloManufacturadoInsumo>(`articulos-manufacturados-insumos/${id}`, "GET", token);
}
  
export async function updateArticuloManufacturadoInsumo(id: number, articuloManufacturadoInsumo: ArticuloManufacturadoInsumo, token: string) {
    return GenericService<void>(`articulos-manufacturados-insumos/${id}`, "PUT", token, articuloManufacturadoInsumo);
}
  
export async function deleteArticuloManufacturadoInsumo(id: number, token: string) {
    return GenericService<void>(`articulos-manufacturados-insumos/${id}`, "DELETE", token);
}
