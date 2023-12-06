import { Base } from "./Base";
import { DetallePedido } from "./DetallePedido";
import { Pedido } from "./Pedido";

export interface RankingProducto extends Base{
    denominacion: string;
    pedidos: Pedido[];
    detallesPedidos: DetallePedido[];
    cantidadVendida?: number;
}

export interface RankingMonetarios extends Base{
    ingresosTotales: number;
    costosTotales: number;
    gananciasTotales: number;
}

export interface RankingCliente extends Base{
    nombre: string;
    detallesPedidos: DetallePedido[];
    montoTotal: number;
    pedidos: Pedido[];
    cantidadPedidos: number;
}