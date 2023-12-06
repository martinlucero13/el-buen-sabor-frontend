import { Base } from "./Base";

export interface Rubro extends Base {
    denominacion: string;
    bloqueado: boolean;
    esInsumo: boolean;
    rubroPadreId?: number;
    rubroPadreDenominacion?: string;
}

export enum TipoRubro {
    INSUMO = 'Insumo',
    PRODUCTO = 'Producto'
}

export enum FiltroRubro {
    TIPO = 'byTipo',
    EXISTE = 'exists',
}