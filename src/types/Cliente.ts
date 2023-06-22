import { Usuario } from "./Usuario";
import { Domicilio } from "./Domicilio";

export interface Cliente {
    id: number;
    nombre: string;
    apellido: string;
    telefono: number;
    usuario: Usuario;
    domicilio: Domicilio;
}