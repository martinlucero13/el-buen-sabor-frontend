import { ArticuloManufacturado } from './ArticuloManufacturado';
import { GenericTypes } from './GenericTypes';
export interface DetallePedido  extends GenericTypes{
    id: number;
    cantidad: number;
    subTotal: number;
    articuloManufacturado: ArticuloManufacturado;
    pedido: number | string;
}