import { Usuario } from "./Usuario";
import { Domicilio } from "./Domicilio";
import { GenericTypes } from "./GenericTypes";

export interface Cliente extends GenericTypes{

    nombre: string;
    apellido: string;
    telefono: number;
    usuario: Usuario;
    domicilio: Domicilio;
}