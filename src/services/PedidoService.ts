import { Pedido } from "../types/Pedido";
import { GenericService } from "./GenericService";

export async function findAllPedidos(token: string) {
  return GenericService<Pedido[]>("pedidos", "GET", token);
}

export async function findPedidoByTermino(termino: string, token: string) {
  return GenericService<Pedido[]>(`pedidos/byTermino/${termino}`, "GET", token);
}

export async function findPedidoByEstado(estado: string, token: string) {
  return GenericService<Pedido[]>(`pedidos/byEstado/${estado}`, "GET", token);
}

export async function findPedidoByCliente(idCliente: number, token: string) {
  return GenericService<Pedido[]>(`pedidos/byCliente/${idCliente}`, "GET", token);
}

export async function findAPedidoById(id: number, token: string) {
  return GenericService<Pedido>(`pedidos/${id}`, "GET", token);
}

export async function savePedido(pedido: Pedido, token: string) {
  return GenericService<Pedido>("pedidos", "POST", token, pedido);
}

export async function updatePedido(id: number, pedido: Pedido, token: string) {
  return GenericService<Pedido>(`pedidos/${id}`, "PUT", token, pedido);
}

export async function sumarMinutosPedido(id: number, pedido: Pedido, token: string) {
  return GenericService<Pedido>(`pedidos/minuto/${id}`, "PUT", token, pedido);
}

export async function cambiarEstado(id: number, estado: string, token: string) {
  return GenericService<Pedido>(`pedidos/estado/${id}`, "PUT", token, estado);
}

export async function deletePedido(id: number, token: string) {
  return GenericService<void>(`pedidos/${id}`, "DELETE", token);
}