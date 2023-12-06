import { useState, Suspense, lazy } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

import { Pedido } from "../../../types/Pedido";
import { useModal } from "../../../hooks/useModal";
import GenerarFactura from "../../Factura/GenerarFactura";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { formatFecha } from "../../../util/PedidoUtil";
import { usePedidoHook } from "../../../hooks/usePedidoHook";
import GenerarNotaCredito from "../../Factura/GenerarNotaCredito";
import { FiletypePdf } from "react-bootstrap-icons";
const PostPago = lazy(() => import("../../Pedido/PostPago"));

interface Props {
    pedido: Pedido;
}

/**
 * Componente que representa un elemento de Pedido en la tabla.
 * Vista de Usuario.
 */
function ItemPedidoUsuario({ pedido }: Props): JSX.Element {
    const [selectedPedidoId, setSelectedPedidoId] = useState<number>(0);
    const { showModal, handleClose } = useModal();
    const { cliente } = usePedidoHook(pedido.id);

    const handleOpenModal = (pedidoId: number) => {
        setSelectedPedidoId(pedidoId);
        handleClose();
    };
    let estadoColor = "";

    if (pedido.estado === "COMPLETADO") {
        estadoColor = "text-success";
    } else if (pedido.estado === "CANCELADO") {
        estadoColor = "text-danger";
    } else if (pedido.estado === "PENDIENTE_PAGO") {
        estadoColor = "text-warning";
    }
    return (
        <section className="section-bg">
            <Card className="mb-2 p-2 rounded bg-dark">
                <Row className="d-flex justify-content-between align-items-center">
                    <Col md={6} xs={12} className="mt-2 mt-md-0">
                        <p className="mb-1"><strong>N° Pedido: </strong>{pedido.numeroPedido}</p>
                        <span >{formatFecha(pedido.fecha)}</span>
                    </Col>
                    <Col md={3} xs={12} className="mt-2 mt-md-0">
                        <p className="mb-1"><strong>Total: ${pedido.total}</strong></p>
                    </Col>
                    <Col md={3} xs={12} className="mt-2 mt-md-0">
                        <p className={`mb-1 ${estadoColor}`}><strong>{pedido.estado}</strong></p>
                    </Col>
                    <Col md={3} xs={12} className="mt-2 mt-md-0">
                        <Button
                            variant="outline-danger"
                            onClick={() => handleOpenModal(pedido.id)}>Detalle</Button>
                    </Col>
                    <Col md={3} xs={12} className="mt-2 mt-md-0">
                        {pedido && cliente && pedido.estado !== 'CANCELADO' && (
                            <PDFDownloadLink
                                document={<GenerarFactura pedido={pedido} cliente={cliente} />}
                                fileName={`factura_${pedido.id}.pdf`}
                            >
                                <Button variant="outline-light">
                                    Factura <FiletypePdf />
                                </Button>
                            </PDFDownloadLink>
                        )}{pedido && cliente && pedido.estado === 'CANCELADO' && (
                            <PDFDownloadLink
                                document={<GenerarNotaCredito pedido={pedido} cliente={cliente} />}
                                fileName={`nota_credito_${pedido.id}.pdf`}
                            >
                                <Button variant="outline-light">
                                    Nota Crédito <FiletypePdf />
                                </Button>
                            </PDFDownloadLink>
                        )}
                    </Col>
                </Row>
                {showModal && (
                    <Suspense>
                        <PostPago
                            selectedPedidoId={selectedPedidoId}
                            showModal={showModal}
                            closeModal={handleClose}
                        />
                    </Suspense>
                )}
            </Card>
        </section>

    );
}

export default ItemPedidoUsuario;