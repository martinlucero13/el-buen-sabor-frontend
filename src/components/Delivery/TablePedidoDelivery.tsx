import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { EstadoPedido } from "../../types/EstadoPedido";
import { findPedidosByEstado, updateEstadoPedido } from "../../services/PedidoService";
import { Container, Table } from "react-bootstrap";
import NoSearch from "../Layout/Table/NoSearch";
import { Pedido } from "../../types/Pedido";
import ItemDelivery from "./ItemDelivery";
import { ordenarPedidosPorFechaDescendente } from "../../util/PedidoUtil";

/**
 * Componente que muestra una tabla de Pedidos.
 * Vista de Delivery.
 */
function TablePedidoDelivery(): JSX.Element {
    const [pedido, setPedido] = useState<Pedido[]>([]);
    const { getAccessTokenSilently } = useAuth0();
    const [selectedEstado, setSelectedEstado] = useState<EstadoPedido | "todos">("todos");
    const [search, setSearch] = useState<string>('');
    const pedidosEnPreparacion = pedido.filter((pedido) => pedido.estado === EstadoPedido.EN_CAMINO);

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
            if (nuevoEstado === EstadoPedido.LISTO) {
                nuevoEstado = EstadoPedido.COMPLETADO
            }
            const token = await getAccessTokenSilently();
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

    return (
        <section>
            <Container className="py-3">
                <h1>Delivery</h1>

                <div className="table-scrollable">
                    <Table responsive bordered hover>
                        <thead className="table-thead">
                            <tr>
                                <th>N° Pedido</th>
                                <th>Fecha</th>
                                <th>Nombre</th>
                                <th>Dirección</th>
                                <th>Localidad</th>
                                <th>Telefono</th>
                                <th colSpan={2}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pedidosEnPreparacion.length === 0 ? (
                                    <NoSearch colSpan={8} search={search} />
                                ) : (
                                    pedidosEnPreparacion.map((pedido: Pedido) => (
                                        <ItemDelivery key={pedido.id} pedido={pedido} onEstadoChange={updatePedidoEstado} />
                                    ))
                                )}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </section>
    )
}
export default TablePedidoDelivery;