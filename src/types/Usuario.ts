import { Base } from "./Base";
import { Rol } from "./Rol";

export interface Usuario extends Base {
    auth0Id: string;
    email: string;
    bloqueado: boolean;
    rol: Rol;
    clave: string;
    confirmarClave: string;
}

export interface Auth0Usuario {
    email?: string;
    clave?: string;
    bloqueado?: boolean;
}

export interface Auth0Clave {
    clave: string;
    confirmarClave: string;
}