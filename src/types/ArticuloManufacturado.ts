import { ArticuloManufacturadoPrecioVenta } from "./ArticuloManufacturadoPrecioVenta";
import { Imagen } from "./Imagen";
import { Rubro } from './Rubro';
import { Receta } from './Receta';
import { GenericTypes } from "./GenericTypes";

export interface ArticuloManufacturado extends GenericTypes{
    denominacion: string;
    descripcion: string;
    tiempoEstimadoCocina: string; // TODO: Manejar tiempoEstimadoCocina como Date
    imagen: Imagen;
    articuloManufacturadoPrecioVenta: ArticuloManufacturadoPrecioVenta;
    rubro?: Rubro;
    receta?: Receta;
}