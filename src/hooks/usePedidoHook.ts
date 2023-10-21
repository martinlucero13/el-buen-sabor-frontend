import { useEffect, useState } from "react";
import { findById } from "../services/BaseService";
import { Endpoint } from "../types/Endpoint";
import { Pedido } from "../types/Pedido";
import { useAuth0 } from "@auth0/auth0-react";
import { findClienteByPedidoId } from "../services/ClienteService";
import { Cliente } from "../types/Cliente";

/**
 * Hook personalizado para obtener un Pedido por su ID.
 * @param id ID del Pedido a buscar.
 * @returns Un objeto que contiene el estado del Pedido.
 */
export const usePedidoHook = (id: number | string) => {
    const { getAccessTokenSilently } = useAuth0();
    const [cliente, setCliente] = useState<Cliente | undefined>();
    const [pedido, setPedido] = useState<Pedido | undefined>();

    useEffect(() => {
        if (id) {
            getPedidoAndClienteById(Number(id));
        }
    }, [id]);

    const getPedidoAndClienteById = async (id: number) => {
        const token = await getAccessTokenSilently();
        const newPedido = await findById<Pedido>(Endpoint.Pedidos, Number(id), token);
        setPedido(newPedido);

        const newCliente = await findClienteByPedidoId(id, token);
        setCliente(newCliente);
    };

    return { pedido, cliente };
};