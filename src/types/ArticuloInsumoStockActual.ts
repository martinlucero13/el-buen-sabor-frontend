import { GenericTypes } from "./GenericTypes";

export interface ArticuloInsumoStockActual  extends GenericTypes{
    stockActual: number;
    fecha: Date;
}