import { Container, Table } from "react-bootstrap";
import NoSearch from "../../Layout/Table/NoSearch";
import { useEffect, useState } from "react";
import { Pedido } from "../../../types/Pedido";
import ItemPedidoCocinero from "./ItemPedidoCocinero";
import { EstadoPedido } from "../../../types/EstadoPedido";
import { useAuth0 } from "@auth0/auth0-react";
import { findPedidosByEstado, updateEstadoPedido, updateTiempoPedido } from "../../../services/PedidoService";
import { ordenarPedidosPorFechaDescendente } from "../../../util/PedidoUtil";

/**
 * Componente que muestra una tabla de Pedidos.
 * Vista de Cocinero.
 */
function TablePedidosCocinero(): JSX.Element {
    const [pedido, setPedido] = useState<Pedido[]>([]);
    const { getAccessTokenSilently } = useAuth0();
    const [selectedEstado, setSelectedEstado] = useState<EstadoPedido | "todos">("todos");
    const [search, setSearch] = useState<string>('');
    const pedidosEnPreparacion = pedido.filter((pedido) => pedido.estado === EstadoPedido.PREPARACION);

    useEffect(() => {
        getPedidos();
    }, [selectedEstado]);

    const getPedidos = async () => {
        const token = await getAccessTokenSilently();
        const pedidosData = await findPedidosByEstado(selectedEstado === "todos" ? null : selectedEstado, token);
        const pedidosOrdenados = ordenarPedidosPorFechaDescendente(pedidosData);
        setPedido(pedidosOrdenados);
    };

    const updatePedidoEstado = async (id: number, nuevoEstado: EstadoPedido) => {
        try {
            const token = await getAccessTokenSilently();
            if (nuevoEstado === EstadoPedido.LISTO && pedido.find((p) => p.id === id)?.formaEntrega === "LOCAL") {
                nuevoEstado = EstadoPedido.PENDIENTE_PAGO;
            } else if (nuevoEstado === EstadoPedido.LISTO && pedido.find((p) => p.id === id)?.formaEntrega === "DELIVERY") {
                nuevoEstado = EstadoPedido.EN_CAMINO
            }
            await updateEstadoPedido(id, nuevoEstado, token);
            setPedido((prevPedidos) =>
                prevPedidos.map((pedido) => {
                    if (pedido.id === id) {
                        return { ...pedido, estado: nuevoEstado };
                    }
                    return pedido;
                })
            );
        } catch (error) {
            console.log(error);
        }
    };
    const updateTiempo = async (id: number, nuevoTiempo: string) => {
        try {
            const token = await getAccessTokenSilently();
            await updateTiempoPedido(id, nuevoTiempo, token);
            setPedido((prevPedidos) =>
                prevPedidos.map((pedido) => {
                    if (pedido.id === id) {
                        return { ...pedido, tiempoEstimadoPedido: nuevoTiempo };
                    }
                    return pedido;
                })
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section>
            <Container className="py-3">
                <h1>Cocina</h1>

                <div className="table-scrollable">
                    <Table responsive bordered hover>
                        <thead className="table-thead">
                            <tr>
                                <th>N° Pedido</th>
                                <th>Fecha</th>
                                <th>Tiempo Preparacion</th>
                                <th>Detalle</th>
                                <th colSpan={2}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidosEnPreparacion.length === 0 ? (
                                <NoSearch colSpan={6} search={search} />
                            ) : (
                                pedidosEnPreparacion.map((pedido: Pedido) => (
                                    <ItemPedidoCocinero key={pedido.id}
                                        pedido={pedido}
                                        onEstadoChange={updatePedidoEstado}
                                        onTiempoChange={updateTiempo} />
                                ))
                            )}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </section>
    )
}
export default TablePedidosCocinero;