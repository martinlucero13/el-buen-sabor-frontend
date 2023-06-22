import { ArticuloManufacturadoPrecioVenta } from "./ArticuloManufacturadoPrecioVenta";
import { Imagen } from "./Imagen";
import { Rubro } from './Rubro';
import { Receta } from './Receta';

export interface ArticuloManufacturado {
    id: number;
    denominacion: string;
    descripcion: string;
    tiempoEstimadoCocina: string; // TODO: Manejar tiempoEstimadoCocina como Date
    imagen: Imagen;
    articuloManufacturadoPrecioVenta: ArticuloManufacturadoPrecioVenta;
    rubro?: Rubro;
    receta?: Receta;
}