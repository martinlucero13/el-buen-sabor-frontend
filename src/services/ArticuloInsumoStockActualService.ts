import { ArticuloInsumoStockActual } from '../types/ArticuloInsumoStockActual';
import { GenericService } from "./GenericService";

export async function comprarArticuloInsumo(id: number, articuloInsumoStockActual: ArticuloInsumoStockActual, token: string) {
    return GenericService<ArticuloInsumoStockActual>(`articulos-insumos-stock-actual/${id}`, "PUT", token, articuloInsumoStockActual);
}
