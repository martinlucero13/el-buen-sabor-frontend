import { useState, Suspense, lazy } from "react";
import { Button } from "react-bootstrap";

import { Pedido } from "../../../types/Pedido";
import { EstadoPedido } from "../../../types/EstadoPedido";
import { useModal } from "../../../hooks/useModal";
import { formatFecha, convertirTiempoASegundos, convertirMinutosATiempo } from "../../../util/PedidoUtil";
import { CheckLg, Pen } from "react-bootstrap-icons";
const PostPago = lazy(() => import("../../Pedido/PostPago"));

interface Props {
    pedido: Pedido;
    onEstadoChange: (id: number, nuevoEstado: EstadoPedido) => void;
    onTiempoChange: (id: number, nuevoTiempo: string) => void;
}

/**
 * Componente que representa un elemento de Pedido en la tabla.
 * Vista de Cocinero.
 */
function ItemPedidoCocinero({ pedido, onEstadoChange, onTiempoChange }: Props): JSX.Element {
    const [estado, setEstado] = useState(pedido.estado);
    const [selectedPedidoId, setSelectedPedidoId] = useState<number>(0);
    const { showModal, handleClose } = useModal();
    const [tiempo, setTiempo] = useState(pedido.tiempoEstimadoPedido);

    const handleListoClick = () => {
        setEstado(EstadoPedido.LISTO);
        onEstadoChange(pedido.id, EstadoPedido.LISTO);

    };

    const handleOpenModal = (pedidoId: number) => {
        setSelectedPedidoId(pedidoId);
        handleClose();
    };

    const handle10min = () => {
        const tiempoEnMinutos = convertirTiempoASegundos(tiempo) / 60;
        const nuevoTiempoEnMinutos = tiempoEnMinutos + 10;
        const nuevoTiempoString = convertirMinutosATiempo(nuevoTiempoEnMinutos);

        setTiempo(nuevoTiempoString);
        onTiempoChange(pedido.id, nuevoTiempoString);
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
                    {pedido.tiempoEstimadoPedido}
                </td>
                <td>
                    <Button onClick={() => handleOpenModal(pedido.id)} variant="outline-dark">
                        <Pen />
                    </Button>
                </td>
                <td>
                    <Button onClick={() => handle10min()} variant="outline-primary">
                        +10
                    </Button>
                </td>
                <td>
                    {estado !== EstadoPedido.LISTO && (
                        <Button onClick={handleListoClick} variant="outline-success">
                            <CheckLg />
                        </Button>
                    )}
                </td>
            </tr>
            {showModal && (
                <Suspense>
                    <PostPago
                        selectedPedidoId={selectedPedidoId}
                        showModal={showModal}
                        closeModal={handleClose}
                    />
                </Suspense>
            )}
        </>
    )
}
export default ItemPedidoCocinero;