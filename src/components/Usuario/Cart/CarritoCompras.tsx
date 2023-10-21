import "./CarritoCompras.css"
import { Link } from "react-router-dom";
import { Offcanvas, Stack } from "react-bootstrap";

import { useCarrito } from "../../../context/CarritoContext";
import CarritoMenuDesplegable from "./CarritoMenuDesplegable";
import { useArticulosManufacturadosSearch } from "../../../hooks/useArticulosManufacturadosSearch";

interface Props {
    isOpen: boolean;
}


function CarritoCompras({ isOpen }: Props): JSX.Element {
    const { closeCart, cartItems } = useCarrito();
    const { articulosManufacturados } = useArticulosManufacturadosSearch();

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton className="carrito-compras-bg">
                <Offcanvas.Title>Carrito de Compras</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className="carrito-compras-bg">
                <Stack gap={3}>
                    {
                        cartItems.map(item => (
                            <CarritoMenuDesplegable key={item.id} {...item} />
                        ))
                    }

                    <div className="d-flex justify-content-between fs-5 fw-bold mt-3">
                        <div>
                            <Link to="/carrito-detalle" className="btn btn-dark">
                                Ver carrito
                            </Link>
                        </div>

                        <div>
                            Total{"  $"}
                            {(
                                cartItems.reduce((total, cartItem) => {
                                    const item = articulosManufacturados.find(i => i.id === cartItem.id)
                                    return total + (item?.precioVenta || 0) * cartItem.quantity
                                }, 0)
                            )}
                        </div>
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default CarritoCompras;