import { ArticuloInsumoPrecioCompra } from "./ArticuloInsumoPrecioCompra";
import { ArticuloInsumoStockActual } from "./ArticuloInsumoStockActual";
import { ArticuloInsumoStockMinimo } from "./ArticuloInsumoStockMinimo";
import { Rubro } from "./Rubro";
import { UnidadMedida } from "./UnidadMedida";
import { GenericTypes } from "./GenericTypes";

export interface ArticuloInsumo  extends GenericTypes{

    denominacion: string;
    esInsumo: boolean;
    unidadMedida: UnidadMedida;
    articuloInsumoPrecioCompra: ArticuloInsumoPrecioCompra;
    articuloInsumoStockMinimo: ArticuloInsumoStockMinimo;
    articuloInsumoStockActual: ArticuloInsumoStockActual;
    rubro?: Rubro;

}