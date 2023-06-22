import { Localidad } from "./Localidad";

export interface Domicilio {
    id: number;
    calle: string;
    numero: number;
    localidad: Localidad;
}