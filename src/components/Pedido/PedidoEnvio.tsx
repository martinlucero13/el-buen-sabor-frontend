import { useEffect } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { initMercadoPago } from "@mercadopago/sdk-react";

import { useCarrito } from "../../context/CarritoContext";
import CarritoPedido from "../Usuario/Cart/CarritoPedido";
import { FormaPago } from "../../types/FormaPago";
import { EstadoPedido } from "../../types/EstadoPedido";
import { savePedido } from "../../services/PedidoService";
import { usePedido } from "../../context/PedidoContext";
import MercadoPagoPayment from "./MercadoPagoPayment";
import { saveCompraArticulos, saveDetallePedido } from "../../services/DetallePedido";

const MERCADO_PAGO_KEY = import.meta.env.VITE_MERCADO_PAGO_KEY as string;

/**
 * Componente que muestra Detalles del Pedido.
 * Vista de Usuario.
 */
function PedidoEnvio(): JSX.Element {
    const { getAccessTokenSilently } = useAuth0();
    const { cartItems, clearCart } = useCarrito();
    const { pedido, setPedido, generarNumeroPedido } = usePedido();
    const showMercadoPagoWallet = pedido.formaPago === FormaPago.MERCADO_PAGO && pedido.estado === EstadoPedido.CONFIRMAR;

    useEffect(() => {
        initMercadoPago(MERCADO_PAGO_KEY);
        generarNumeroPedido();
    }, []);

    const handlePaymentSuccess = async () => {
        const token = await getAccessTokenSilently();
        const newDetallePedido = cartItems.map((item) => ({
            id: item.id,
            cantidad: item.quantity,
            articuloManufacturado: item.id,
            pedido: pedido.numeroPedido,
        }));

        setPedido({
            ...pedido,
            fecha: new Date(),
            estado: EstadoPedido.CONFIRMAR,
            factura: {
                id: 0,
                fechaFacturacion: new Date(),
                fechaBaja: new Date(),
                pedido: 0,
                cliente: 0
            }
        });

        try {
            await savePedido(token, pedido);
            await saveDetallePedido(token, newDetallePedido);
            await saveCompraArticulos(token, newDetallePedido);

            console.log("Pedido y detalles guardados correctamente.");
        } catch (error) {
            console.log("Error al guardar el pedido:", error);
        }
        clearCart();
    };

    return (
        <section className="section-bg">
            <Container className="py-3">
                <Row className="py-3">
                    <h2><strong>Pedido: </strong>{pedido.numeroPedido}</h2>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        {pedido.numeroPedido ? (
                            <>
                                <p><strong>Fecha: </strong>{pedido.fecha.toLocaleDateString()}</p>
                                <p><strong>Estado: </strong>{pedido.estado}</p>
                            </>
                        ) : (
                            <>
                                <h2>Pedido: S/N</h2>
                                <p><strong>Fecha: </strong>-</p>
                                <p><strong>Estado: </strong>-</p>
                            </>
                        )}
                        <p><strong>Forma de pago: </strong>{pedido.formaPago}</p>
                        <p><strong>Forma de entrega: </strong>{pedido.formaEntrega}</p>
                    </Col>
                    <Col xs={12} md={6}>
                        <p><strong>Subtotal: </strong>${pedido.subtotal}</p>
                        <p><strong>Descuento: </strong>${pedido.descuento}</p>
                        <p><strong>Total: ${pedido.total}</strong></p>
                        <p><strong>Tiempo Estimado: </strong>{pedido.tiempoEstimadoPedido} minutos</p>
                    </Col>
                </Row>
                <Row className="py-3">
                    <div className="table-scrollable">
                        <Table responsive bordered hover>
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th><strong>Producto</strong></th>
                                    <th>Cantidad</th>
                                    <th>SubTotal</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cartItems.map((item) => (
                                    <CarritoPedido key={item.id} {...item} />
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Row>
                <Row>
                    <Col xs={12} md={4} className="mt-3">
                        <Link to="/pedido-form">
                            <Button variant="dark" className="btn-add botones-carrito mb-3">
                                Volver
                            </Button>
                        </Link>
                    </Col>
                    <Col>
                    </Col>
                    <Col xs={12} md={2}>
                        {showMercadoPagoWallet ? (
                            <MercadoPagoPayment
                            />
                        ) : (
                            <Link to={"/pedido-exito"}>
                                <Button
                                    variant="dark"
                                    className="btn-add botones-carrito"
                                    onClick={handlePaymentSuccess}
                                >
                                    Confirmar
                                </Button>
                            </Link>
                        )}
                    </Col>
                </Row>
            </Container>
        </section>

    );
}

export default PedidoEnvio;