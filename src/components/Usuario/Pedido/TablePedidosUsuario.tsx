import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import ItemPedidoUsuario from "./ItemPedidoUsuario";
import { Pedido } from "../../../types/Pedido";
import { useCliente } from "../../../hooks/useCliente";
import { findPedidosByCliente } from "../../../services/PedidoService";
import { findFacturaByPedido } from "../../../services/FacturaService";
import { ordenarPedidosPorFechaDescendente } from "../../../util/PedidoUtil";
import { useParams } from "react-router-dom";
import { findById } from "../../../services/BaseService";
import { Cliente } from "../../../types/Cliente";
import { Endpoint } from "../../../types/Endpoint";

/**
 * Componente que muestra una tabla de Pedidos.
 * Vista de Usuario.
 */
function TablePedidosUsuario(): JSX.Element {
    const [pedidosConFacturas, setPedidosConFacturas] = useState<any[]>([]);
    const { getAccessTokenSilently } = useAuth0();
    const { id } = useParams<string>();
    const [cliente, setCliente] = useState<Cliente>();

    useEffect(() => {
        getClienteByAuth0Id();
        getPedidosByCliente(Number(id));
    }, [id])

    const getPedidosByCliente = async (id: number) => {
        const token = await getAccessTokenSilently();
        const newPedidos = await findPedidosByCliente(id, token);
        const pedidosOrdenados = ordenarPedidosPorFechaDescendente(newPedidos);
        const pedidosWithFacturas = await Promise.all(
            pedidosOrdenados.map(async (pedido: Pedido) => {
                const factura = await findFacturaByPedido(pedido.id, token);
                return {
                    pedido: pedido,
                    factura: factura,
                    cliente: cliente
                };
            })
        );

        setPedidosConFacturas(pedidosWithFacturas);
    };

    const getClienteByAuth0Id = async () => {
        const token = await getAccessTokenSilently();

        const newCliente = await findById<Cliente>(Endpoint.Cliente, Number(id), token);
        setCliente(newCliente);

    };

    return (
        <section className="section-bg">
            <Container className="table-scrollable mt-3">
                <h1>Pedidos de: {cliente?.nombre} {cliente?.apellido}</h1>
                {pedidosConFacturas.length === 0 ? (
                    <div className="flex justify-center gap-4 py-5 px-5">
                        <h2 className="flex-auto rounded-md bg-rose-500 p-8 text-center text-4xl text-neutral-100">
                            Ups! No tienes pedidos realizados
                        </h2>
                    </div>
                ) : (
                    <Row>
                        {pedidosConFacturas.map((pedidoConFactura: any) => (
                            <ItemPedidoUsuario
                                key={pedidoConFactura.pedido.id}
                                pedido={pedidoConFactura.pedido}
                            />
                        ))}
                    </Row>
                )}
            </Container>
        </section>

    );
}

export default TablePedidosUsuario;