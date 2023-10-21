import { useEffect } from "react";
import { Button, Col, Modal, Row, Table } from "react-bootstrap";

import DetallePostPago from "./DetallePostPago";
import { usePedidoHook } from "../../hooks/usePedidoHook";
import { useDetallePedido } from "../../hooks/useDetallePedido";
import { formatFecha } from "../../util/PedidoUtil";

/**
 * Modal para mostrar detalles del Pedido(cliente, pedido, productos).
 * Vista de Usuario.
 */
function PostPago({ selectedPedidoId, showModal, closeModal }: { selectedPedidoId: number, showModal: boolean, closeModal: () => void, }): JSX.Element {
    const { pedido: pedido } = usePedidoHook(selectedPedidoId);
    const { detallePedido: detallePedido } = useDetallePedido(selectedPedidoId);
    const { cliente: clientePedido } = usePedidoHook(selectedPedidoId);

    useEffect(() => {
    }, [pedido, detallePedido, clientePedido]);

    return (
        <Modal show={showModal} onHide={closeModal} className="modal-lg">
            <Modal.Header closeButton>
                <Modal.Title>Detalles del Pedido</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {clientePedido && pedido && detallePedido && (
                    <>
                        <Row>
                            <Col><p><strong>Número de Pedido: </strong>#{pedido.numeroPedido}</p>
                                <p><strong>Estado:</strong> {pedido.estado}</p>
                                <p><strong>Forma de Entrega:</strong> {pedido.formaEntrega}</p>
                                <p><strong>Forma Pago:</strong> {pedido.formaPago}</p>
                                <p><strong>Fecha:</strong> {formatFecha(pedido.fecha)}</p>
                            </Col>
                            <Col>
                                <p><strong>Nombre:</strong> {clientePedido.nombre} {clientePedido.apellido}</p>
                                <p><strong>Telefono:</strong> {clientePedido.telefono}</p>
                                <p><strong>Domicilio:</strong> {clientePedido.domicilio.calle} {clientePedido.domicilio.numero}, {clientePedido.domicilio.localidad.nombre}</p>
                                <p><strong>Tiempo estimado:</strong> {pedido.tiempoEstimadoPedido}</p>
                            </Col>
                        </Row>

                        <Row className="mt-5">
                            <p><strong>Subtotal:</strong> ${pedido.subtotal}</p>
                            <p><strong>Descuento:</strong> ${pedido.descuento}</p>
                            <p><strong>Total:</strong> ${pedido.total}</p>
                        </Row>

                        <Table responsive bordered hover className="table-scrollable mt-3 mb-1" style={{ backgroundColor: "#E9ECEF" }}>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio Unitario</th>
                                    <th>SubTotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detallePedido.map((item) => (
                                    <DetallePostPago
                                        key={item.articuloManufacturado}
                                        id={item.articuloManufacturado}
                                        cantidad={item.cantidad} />
                                ))}
                            </tbody>
                        </Table>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default PostPago;