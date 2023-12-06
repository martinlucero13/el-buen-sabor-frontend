import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import { Pedido } from "../../types/Pedido";
import { Cliente } from "../../types/Cliente";
import { EstadoPedido } from "../../types/EstadoPedido";
import { findClienteByPedidoId } from "../../services/ClienteService";
import { formatFecha } from "../../util/PedidoUtil";
import { CheckLg } from "react-bootstrap-icons";

interface Props {
    pedido: Pedido;
    onEstadoChange: (id: number, nuevoEstado: EstadoPedido) => void;

}
/**
 * Componente que representa un elemento de Pedido en la tabla.
 * Vista de Delivery.
 */
function ItemDelivery({ pedido, onEstadoChange }: Props): JSX.Element {
    const [cliente, setCliente] = useState<Cliente>();
    const { getAccessTokenSilently } = useAuth0();
    const [estado, setEstado] = useState(pedido.estado);

    useEffect(() => {
        getClienteByPedidoId(pedido.id);
    }, []);

    const getClienteByPedidoId = async (id: number) => {
        const token = await getAccessTokenSilently();
        const newCliente = await findClienteByPedidoId(id, token);

        setCliente(newCliente);
    };

    const handleListoClick = () => {
        setEstado(EstadoPedido.LISTO);
        onEstadoChange(pedido.id, EstadoPedido.LISTO);

    };

    return (
        <>
            <tr>
                <td>
                    #{pedido.numeroPedido}
                </td>
                <td>
                    {formatFecha(pedido.fecha)}
                </td>
                <td>
                    {cliente?.nombre}
                </td>
                <td>
                    {cliente?.domicilio.calle} {cliente?.domicilio.numero}
                </td>
                <td>
                    {cliente?.domicilio.localidad.nombre}
                </td>
                <td>
                    {cliente?.telefono}
                </td>
                <td>
                    {estado !== EstadoPedido.LISTO && (
                        <Button onClick={handleListoClick} variant="outline-success">
                            <CheckLg />
                        </Button>
                    )}
                </td>
            </tr>
        </>
    )
}
export default ItemDelivery;