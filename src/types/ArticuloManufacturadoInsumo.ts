import { GenericTypes } from "./GenericTypes";

export interface ArticuloManufacturadoInsumo  extends GenericTypes{
    cantidad: number;
    articuloManufacturadoId: number;
    articuloInsumoId: number;
}