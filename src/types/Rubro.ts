import { GenericTypes } from "./GenericTypes";

export interface Rubro extends GenericTypes{

    denominacion: string;
    rubroPadreId?: number;
    rubroPadre?: Rubro;
}