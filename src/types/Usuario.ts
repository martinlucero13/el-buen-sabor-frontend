import { Rol } from "./Rol";

export interface Usuario {
    id: number;
    auth0Id: string;
    usuario: string;
    rol: Rol;
}