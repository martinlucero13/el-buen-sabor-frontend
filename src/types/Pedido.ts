import { Cliente } from "./Cliente";
import { GenericTypes } from "./GenericTypes";
import { TipoEntregaPedido } from "./TipoEntregaPedido";
import { TipoPagoPedido } from "./TipoPagoPedido";

export interface Pedido extends GenericTypes{

    fecha: Date;
    horaEstimadaFin: string;
    montoDescuento: number;
    pagado: boolean;
    estado: string;
    cliente: Cliente;
    tipoEntregaPedido?: TipoEntregaPedido;
    tipoPagoPedido?: TipoPagoPedido;
    total: number;
}