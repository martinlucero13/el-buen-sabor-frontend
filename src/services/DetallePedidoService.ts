
import { DetallePedido } from "../types/DetallePedido";
import { GenericService } from "./GenericService";

export async function findByPedidoId(id: number, token: string): Promise<DetallePedido[]> {
    return GenericService<DetallePedido[]>(`detalle-pedido/byPedido/${id}`, "GET", token);
}