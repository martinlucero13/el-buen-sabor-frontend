import { Link } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

import CarritoItemDetalle from "./CarritoItemDetalle";
import { useCarrito } from "../../../context/CarritoContext";
import { useState } from "react";
import { toastError } from "../../../util/ToastUtil";
import PermissionAccess from "../../../util/PermissionAccess";
import { RolUsuario } from "../../../types/Rol";

/**
 * Componente que muestra los detalles de un Artículo Manufacturado en el Carrito de Compras.
 */
function DetalleCarrito(): JSX.Element {
    const { cartItems, calcularSubtotal, isHoraEnRango } = useCarrito();
    const [isEnlaceHabilitado, setIsEnlaceHabilitado] = useState(isHoraEnRango());

    const handleClick = (event: any) => {
        if (isHoraEnRango()) {
            event.preventDefault();
            toastError("El servicio esta cerrado");
        }
    };

    return (
        <section>
            <Container className="py-3">
                <h1>Carrito de Compras</h1>

                <div className="table-scrollable">
                    <Table responsive bordered hover>
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>Imagen</th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>SubTotal</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                cartItems.map((item) => (
                                    <CarritoItemDetalle key={item.id} {...item} />
                                ))
                            }
                        </tbody>
                    </Table>
                </div>

                <Row>
                    <Col xs={12} md={6}></Col>
                    <Col xs={12} md={6} className="text-md-end">
                        <h5>Total: ${calcularSubtotal()}</h5>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={6}>
                        <Link to="/productos/all">
                            <Button variant="warning" className="text-uppercase">
                                Seguir Comprando
                            </Button>
                        </Link>
                    </Col>

                    <Col xs={12} md={6} className="text-md-end mt-md-0 mt-3">
                        <PermissionAccess request={[RolUsuario.CLIENTE]}>
                            <Link to="/pedido-form" onClick={handleClick}>
                                <Button className="btn-ok"
                                    variant="dark"
                                    disabled={!isEnlaceHabilitado}
                                >
                                    Finalizar Compra
                                </Button>
                            </Link>
                        </PermissionAccess>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
export default DetalleCarrito;