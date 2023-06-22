import { ArticuloManufacturado } from './ArticuloManufacturado';
export interface DetallePedido {
    id: number;
    cantidad: number;
    subtotal: number;
    articuloManufacturado: ArticuloManufacturado;
}