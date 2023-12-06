import "./CarritoCompras.css";
import { Button } from "react-bootstrap"
import { Dash, Plus } from "react-bootstrap-icons";

import { useCarrito } from "../../../context/CarritoContext";
import { useArticuloManufacturado } from "../../../hooks/useArticuloManufacturado";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ArticuloCantidad } from "../../../types/ArticuloCantidad";
import { checkCartAvailability } from "../../../services/ArticuloManufacturadoService";

interface Props {
    id: number;
    quantity: number;
}

/**
 * Componente que muestra un ArticuloManufacturado que fue agregado anteriormente al Carrito.
 */
function CarritoItemDetalle({ id, quantity }: Props): JSX.Element {
    const { articuloManufacturado: item } = useArticuloManufacturado(id, true);
    const { increaseCartQuantity, decreaseCartQuantity, cartItems } = useCarrito();
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
                setIsStockAvailable(isAvailable && (item.stock >= quantity));
            }
        };

        hasSufficientStock();
    }, [item.id, quantity, cartItems]);

    return (
        <tr>
            <td className="img-producto">
                <img src={item.imagenURL} alt={item.denominacion} loading="lazy" />
            </td>

            <td>
                {item.denominacion}
            </td>

            <td>
                {quantity > 0 && <span>{quantity}</span>}
            </td>

            <td>
                <div>
                    ${item.precioVenta}
                </div>
            </td>

            <td>
                <div>
                    ${(item.precioVenta || 0) * quantity}
                </div>
            </td>

            <td>
                <div className="d-flex align-items-center justify-content-center">
                    <Button onClick={() => decreaseCartQuantity(id)} variant="dark" className="btn-cancel btn-sm me-2">
                        <Dash size={13} />
                    </Button>

                    <span className="fs-4">
                        {quantity}
                    </span>

                    <Button onClick={() => increaseCartQuantity(id)} variant="dark" className="btn-add ms-2 btn-sm">
                        <Plus size={13} />
                    </Button>
                </div>
            </td>
        </tr>
    );
}

export default CarritoItemDetalle;