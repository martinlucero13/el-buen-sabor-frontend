import { ArticuloManufacturado } from './ArticuloManufacturado';

export interface Receta {
    id: number;
    descripcion: string;
    articuloManufacturado:ArticuloManufacturado;
}