import { Base } from "./Base";
import { Localidad } from "./Localidad";

export interface Domicilio extends Base {
    calle: string;
    numero: number;
    localidad: Localidad;
}