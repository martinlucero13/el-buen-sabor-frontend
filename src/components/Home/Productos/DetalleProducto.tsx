import "./Producto.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Col, Container, Row, Image } from "react-bootstrap";

import { useCarrito } from "../../../context/CarritoContext";
import { ArticuloCantidad } from "../../../types/ArticuloCantidad";
import { useArticuloManufacturado } from "../../../hooks/useArticuloManufacturado";
import { checkCartAvailability } from "../../../services/ArticuloManufacturadoService";

/**
 * Componente que muestra los detalles de un producto.
 */
function DetalleProducto(): JSX.Element {
    const { id } = useParams<string>();
    const { increaseCartQuantity, cartItems, cartQuantity } = useCarrito();
    const { articuloManufacturado } = useArticuloManufacturado(Number(id), true);
    const [isStockAvailable, setIsStockAvailable] = useState(true);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const hasSufficientStock = async () => {
            const token = await getAccessTokenSilently();

            const articuloCantidad: ArticuloCantidad[] = cartItems.map(item => {
                return {
                    idArticuloManufacturado: item.id,
                    cantidad: item.quantity
                };
            });

            if (articuloCantidad.length > 0) {
                const isAvailable = await checkCartAvailability(articuloCantidad, token);
                setIsStockAvailable(isAvailable && (articuloManufacturado.stock >= cartQuantity));
            }
        };

        hasSufficientStock();
    }, [articuloManufacturado.id, cartQuantity, cartItems]);

    const handleAddToCart = (productId: number, articuloManufacturado: string) => {
        increaseCartQuantity(productId);
    };

    return (
        <section>
            <Container className="mx-auto py-5">
                <Row>
                    <Col lg={6} md={12} className="text-center mb-4 mb-lg-0">
                        <Image
                            src={articuloManufacturado.imagenURL}
                            alt={articuloManufacturado.denominacion}
                            className="rounded d-block w-100"
                            loading="lazy"
                        />
                    </Col>
                    <Col lg={6} md={12}>
                        <Row>
                            <h1 className="text-uppercase fw-semibold">
                                {articuloManufacturado.denominacion}
                            </h1>
                        </Row>

                        <div className="mt-3 py-1 border-bottom border-white">
                            <Row>
                                <h5>
                                    DESCRIPCIÓN
                                </h5>
                            </Row>
                        </div>

                        <div className="py-1">
                            <Row>
                                <p>
                                    {articuloManufacturado.descripcion}
                                </p>
                            </Row>
                        </div>

                        <div className="py-1 border-top border-white">
                            <Row>
                                <Col>
                                    <p>Tiempo Estimado:</p>
                                </Col>
                                <Col>
                                    <p className="text-end">
                                        {articuloManufacturado.tiempoEstimadoCocina}
                                    </p>
                                </Col>
                            </Row>
                        </div>

                        <div className="py-1 border-top border-white">
                            <Row>
                                <Col>
                                    <p>Precio Unitario:</p>
                                </Col>
                                <Col>
                                    <p className="text-end">
                                        ${articuloManufacturado.precioVenta}
                                    </p>
                                </Col>
                            </Row>
                        </div>

                        <div className="py-1 border-top border-white">
                            <Row>
                                <Col>
                                    <h5 className="fw-bold">
                                        ${articuloManufacturado.precioVenta}
                                    </h5>
                                </Col>
                                <Col className="text-end">
                                    {
                                        articuloManufacturado.stock > 0 && isStockAvailable ? (
                                            <Button
                                                onClick={() => handleAddToCart(Number(id), articuloManufacturado.denominacion)}
                                                disabled={articuloManufacturado.stock === 0 || !isStockAvailable}
                                                variant="warning"
                                                className="w-100 fw-semibold"
                                            >
                                                AGREGAR AL CARRITO
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="danger"
                                                className="w-100"
                                            >
                                                SIN STOCK
                                            </Button>
                                        )
                                    }
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default DetalleProducto;