import { ArticuloInsumo } from "./ArticuloInsumo";
import { Base } from "./Base";

export interface DetalleArticuloManufacturado extends Base {
    cantidad: number;
    articuloInsumo: ArticuloInsumo;
}