import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import { Pedido } from "../../types/Pedido";
import { findPedidosByEstado, updateEstadoPedido } from "../../services/PedidoService";
import { EstadoPedido } from "../../types/EstadoPedido";
import NoSearch from "../Layout/Table/NoSearch";
import ItemPedido from "./ItemPedidoCajero";
import { ordenarPedidosPorFechaDescendente } from "../../util/PedidoUtil";

/**
 * Componente que muestra una tabla de Pedidos.
 * Vista de Cajero.
 */
function TablePedidosCajero(): JSX.Element {
    const [search, setSearch] = useState<string>('');
    const [pedido, setPedido] = useState<Pedido[]>([]);
    const { getAccessTokenSilently } = useAuth0();
    const [selectedEstado, setSelectedEstado] = useState<EstadoPedido | "todos">("todos");

    useEffect(() => {
        getPedidos();
    }, [selectedEstado, search]);

    const getPedidos = async () => {
        const token = await getAccessTokenSilently();
        const pedidosData = await findPedidosByEstado(selectedEstado === "todos" ? null : selectedEstado, token);
        const pedidosOrdenados = ordenarPedidosPorFechaDescendente(pedidosData);

        const pedidosFiltrados = pedidosOrdenados.filter(pedido => pedido.estado !== EstadoPedido.COMPLETADO);

        if (search === '') {
            setPedido(pedidosFiltrados);
        } else {
            setPedido(filterPedidos(pedidosFiltrados, search));
        }
    };

    const filterPedidos = (pedidos: Pedido[], search: string): Pedido[] => {
        return pedidos.filter((pedido) =>
            pedido.numeroPedido.toLowerCase().includes(search.toLowerCase())
        );
    };

    const updatePedidoEstado = async (id: number, nuevoEstado: EstadoPedido) => {
        try {
            const token = await getAccessTokenSilently();
            await updateEstadoPedido(id, nuevoEstado, token);

            setPedido(prevPedidos => {
                return prevPedidos.map(pedido => {
                    if (pedido.id === id) {
                        return { ...pedido, estado: nuevoEstado };
                    }
                    return pedido;
                });
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section>
            <Container className="py-3">
                <h1>Listado de Pedidos</h1>

                <Row className="py-3">
                    <Col xs={12} md={4}>
                        <Form.Select
                            className="form-control-search"
                            value={selectedEstado}
                            onChange={(e) => setSelectedEstado(e.target.value as EstadoPedido | "todos")}>
                            <option className="fw-bolder" value="todos">
                                Todos los estados
                            </option>
                            {Object.values(EstadoPedido)
                                .filter(estado => estado !== EstadoPedido.COMPLETADO)
                                .map((estado) => (
                                    <option key={estado} value={estado} className="fw-bolder">
                                        {estado}
                                    </option>
                                ))}
                        </Form.Select>
                    </Col>
                    <Col>
                    </Col>
                    <Col xs={12} md={4}>
                        <Form.Control
                            id="search"
                            name="search"
                            type="search"
                            placeholder="Buscar productos..."
                            value={search}
                            className="form-control-search"
                            onChange={e => setSearch(e.target.value)}
                        />
                    </Col>
                </Row>

                <div className="table-scrollable">
                    <Table responsive bordered hover>
                        <thead className="table-thead">
                            <tr>
                                <th>N° Pedido</th>
                                <th>Fecha</th>
                                <th>Forma de Entrega</th>
                                <th>Forma de Pago</th>
                                <th>Estado</th>
                                <td>Detalle</td>
                                <th colSpan={2}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pedido.length === 0 ? (
                                    <NoSearch colSpan={8} search={search} />
                                ) : (
                                    pedido.map((pedidos: Pedido) =>
                                        <ItemPedido
                                            key={pedidos.id}
                                            pedido={pedidos}
                                            onEstadoChange={updatePedidoEstado}
                                        />
                                    )
                                )
                            }
                        </tbody>
                    </Table>
                </div>
            </Container>
        </section>
    )
}
export default TablePedidosCajero;