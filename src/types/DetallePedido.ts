import { ArticuloManufacturado } from './ArticuloManufacturado';
import { GenericTypes } from './GenericTypes';
export interface DetallePedido  extends GenericTypes{
    cantidad: number;
    subtotal: number;
    articuloManufacturado: ArticuloManufacturado;
}