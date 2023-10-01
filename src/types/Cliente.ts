import { Base } from "./Base";
import { Usuario } from "./Usuario";
import { Domicilio } from "./Domicilio";

export interface Cliente extends Base {
    nombre: string;
    apellido: string;
    telefono: number;
    usuario: Usuario;
    domicilio: Domicilio;
}

export enum TipoCliente {
    Cliente = 'Cliente',
    Empleado = 'Empleado'
}