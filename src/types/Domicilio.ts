import { GenericTypes } from "./GenericTypes";
import { Localidad } from "./Localidad";

export interface Domicilio extends GenericTypes{
    calle: string;
    numero: number;
    localidad: Localidad;
}