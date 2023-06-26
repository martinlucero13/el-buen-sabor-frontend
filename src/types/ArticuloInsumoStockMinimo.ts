import { GenericTypes } from "./GenericTypes";

export interface ArticuloInsumoStockMinimo  extends GenericTypes{
    stockMinimo: number;
    fecha: Date;
}