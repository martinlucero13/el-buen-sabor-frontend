import { useEffect, useState } from "react";
import { DetallePedido } from "../types/DetallePedido";
import { useAuth0 } from "@auth0/auth0-react";
import { findDetallesByPedidoId } from "../services/DetallePedido";

export const useDetallePedido = (id: number) => {
    const { getAccessTokenSilently } = useAuth0();
    const [detallePedido, setDetallePedido] = useState<DetallePedido[]>([]);

    useEffect(() => {
        getDetallePedidoById(id);
    }, [id]);

    const getDetallePedidoById = async (pedidoId: number) => {
        const token = await getAccessTokenSilently();
        let newArticulosManufacturados: DetallePedido[];

        newArticulosManufacturados = await findDetallesByPedidoId(pedidoId, token);
        const newDetallePedidoList = newArticulosManufacturados.map((item) => ({
            ...item,
            pedido: pedidoId,
        }));
        setDetallePedido(newDetallePedidoList);

    };

    return { detallePedido };
};