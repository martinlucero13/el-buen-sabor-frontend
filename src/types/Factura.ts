import { Base } from "./Base";

export interface Factura extends Base{
    fechaFacturacion: Date;
    fechaBaja: Date | null;
    pedido: number;
    cliente: number;
}