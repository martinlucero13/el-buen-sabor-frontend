import { Base } from "./Base";
import { Rubro } from "./Rubro";
import { DetalleArticuloManufacturado } from "./DetalleArticuloManufacturado";

export interface ArticuloManufacturado extends Base {
    denominacion: string;
    categoria: string;
    imagen: string;
    imagenURL: string;
    stock: number;
    precioVenta: number;
    detalles: DetalleArticuloManufacturado[];
    descripcion: string;
    bloqueado?: boolean;
    tiempoEstimadoCocina: string;
    receta?: string;
    rubro?: Rubro;
}