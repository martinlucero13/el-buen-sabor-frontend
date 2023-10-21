import "./CarritoCompras.css";
import { Button, Stack } from "react-bootstrap";

import { useCarrito } from "../../../context/CarritoContext";
import { useArticuloManufacturado } from "../../../hooks/useArticuloManufacturado";
import { Trash3 } from "react-bootstrap-icons";

interface Props {
    id: number;
    quantity: number;
}

/**
 * Componente que muestra los Artículos Manufacturados en el Carrito de Compras desplegable.
 */
function CarritoMenuDesplegable({ id, quantity }: Props): JSX.Element {
    const { removeFromCart } = useCarrito();
    const { articuloManufacturado: item } = useArticuloManufacturado(id, true);

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center img-producto">
            <img
                src={item.imagenURL}
                alt={item.denominacion}
                loading="lazy"
            />

            <div className="me-auto">
                <div>
                    {item.denominacion}
                </div>

                <div>
                    {quantity > 1 && (
                        <span className="text-muted" >
                            x{quantity}
                        </span>
                    )}
                </div>

                <div className="text-muted">
                    ${item.precioVenta}
                </div>
            </div>

            <Button onClick={() => removeFromCart(item.id || 0)} variant="outline-danger" size="sm">
                <Trash3 />
            </Button>
        </Stack>
    );
}

export default CarritoMenuDesplegable;