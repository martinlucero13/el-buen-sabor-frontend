import { useArticuloManufacturado } from "../../hooks/useArticuloManufacturado";

/**
 * Componente para mostrar los ArticulosManufacturados del Pedido.
 * Vista de Usuario.
 */
function DetallePostPago({ id, cantidad }: { id: number, cantidad: number }): JSX.Element {
    const { articuloManufacturado: item } = useArticuloManufacturado(id);

    return (
        <tr>
            <td>
                {item.denominacion}
            </td>
            <td>
                {cantidad}
            </td>
            <td>
                <div>
                    ${item.precioVenta}
                </div>
            </td>
            <td>
                <div>
                    ${(item.precioVenta || 0) * cantidad}
                </div>
            </td>

        </tr>
    );
}
export default DetallePostPago;
