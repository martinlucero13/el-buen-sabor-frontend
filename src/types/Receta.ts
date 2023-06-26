import { ArticuloManufacturado } from './ArticuloManufacturado';
import { GenericTypes } from "./GenericTypes";

export interface Receta extends GenericTypes{

    descripcion: string;
    articuloManufacturado:ArticuloManufacturado;
}