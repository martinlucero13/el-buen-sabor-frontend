import { useArticuloManufacturado } from "../../../hooks/useArticuloManufacturado";

interface Props {
    id: number;
    quantity: number;
}

/**
 * Componente que muestra productos del Carrito en el pedido.
 */
function CarritoPedido({ id, quantity }: Props): JSX.Element {
    const { articuloManufacturado: item } = useArticuloManufacturado(id, true);

    return (
        <tr>
            <td>
                {item.denominacion}
            </td>
            <td>
                {quantity > 0 && <span>{quantity}</span>}
            </td>
            <td>
                <div>
                    ${(item.precioVenta || 0) * quantity}
                </div>
            </td>
        </tr>
    );
}

export default CarritoPedido;