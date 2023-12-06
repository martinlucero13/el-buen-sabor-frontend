import { Base } from "./Base";
import { Rubro } from "./Rubro";
import { UnidadMedida } from "./UnidadMedida";

export interface ArticuloInsumo extends Base {
    denominacion: string;
    precioCompra: number;
    bloqueado: boolean;
    unidadMedida: UnidadMedida;
    esInsumo?: boolean;
    rubro?: Rubro;
    stockMinimo?: number;
    stockActual?: number;
}

export interface ArticuloInsumoUpdate {
    stockGanado: number;
    stockPerdido: number;
    precioCompra: number;
}