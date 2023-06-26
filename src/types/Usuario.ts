import { Rol } from "./Rol";
import { GenericTypes } from "./GenericTypes";

export interface Usuario extends GenericTypes{

    auth0Id: string;
    usuario: string;
    rol: Rol;
}