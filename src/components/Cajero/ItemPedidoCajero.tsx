import { useEffect, useState, Suspense, lazy } from "react";
import { Button, Form } from "react-bootstrap";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useAuth0 } from "@auth0/auth0-react";

import { EstadoPedido } from "../../types/EstadoPedido";
import { Pedido } from "../../types/Pedido";
import { useModal } from "../../hooks/useModal";
import { formatFecha, useCountdown } from "../../util/PedidoUtil";
import GenerarFactura from "../Factura/GenerarFactura";
import { usePedidoHook } from "../../hooks/usePedidoHook";
import GenerarNotaCredito from "../Factura/GenerarNotaCredito";
import { findFacturaByPedido, updateFechaBaja } from "../../services/FacturaService";
import { updateRestaurarStock } from "../../services/PedidoService";
import { FiletypePdf, Pen } from "react-bootstrap-icons";
const PostPago = lazy(() => import("../Pedido/PostPago"));

interface Props {
    pedido: Pedido;
    onEstadoChange: (id: number, nuevoEstado: EstadoPedido) => void;
}
/**
 * Componente que muestra un Pedido.
 * Vista de Cajero.
 */
function ItemPedidoCajero({ pedido, onEstadoChange }: Props): JSX.Element {
    const [estado, setEstado] = useState(pedido.estado);
    const [selectedPedidoId, setSelectedPedidoId] = useState<number>(0);
    const { showModal, handleClose } = useModal();
    const { cliente } = usePedidoHook(pedido.id);
    const [showCancelButton, setShowCancelButton] = useState(false);
    const { getAccessTokenSilently } = useAuth0();
    const { countdown, startCountdown } = useCountdown();
    const [shouldReturnStock, setShouldReturnStock] = useState(false);

    useEffect(() => {
        const pedidoTime = new Date(pedido.fecha).getTime();
        const currentTime = new Date().getTime();
        const timeDifference = (currentTime - pedidoTime) / (1000 * 60);

        if (pedido.estado !== EstadoPedido.CANCELADO && timeDifference <= 10) {
            setShowCancelButton(true);
            startCountdown();
        }
    }, []);

    useEffect(() => {
        if (shouldReturnStock && pedido.estado === EstadoPedido.CANCELADO) {
            retornarStock();
            setShouldReturnStock(false);
        }
    }, [shouldReturnStock, pedido.estado]);

    const updateFechaFacturaBaja = async (id: number) => {
        try {
            const token = await getAccessTokenSilently();
            const idFactura = await findFacturaByPedido(id, token);
            await updateFechaBaja(idFactura.id, token);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelOrder = () => {
        const newEstado = EstadoPedido.CANCELADO;
        setEstado(newEstado);
        onEstadoChange(pedido.id, newEstado);
        setShowCancelButton(false);
        updateFechaFacturaBaja(pedido.id);
        setShouldReturnStock(true);

    };

    const retornarStock = async () => {
        try {
            const token = await getAccessTokenSilently();
            await updateRestaurarStock(pedido.id, token);
        } catch (error) {
            console.log(error);
        }
    }

    const handleEstadoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newEstado = event.target.value as EstadoPedido;
        if (pedido.estado !== EstadoPedido.CANCELADO) {
            setEstado(newEstado);
            onEstadoChange(pedido.id, newEstado);
        }
    };

    const handleOpenModal = (pedidoId: number) => {
        setSelectedPedidoId(pedidoId);
        handleClose();
    };

    return (
        <>
            <tr style={{ backgroundColor: pedido.estado === EstadoPedido.CANCELADO ? '#BFC5CA' : '' }}>
                <td>
                    #{pedido.numeroPedido}
                </td>
                <td>
                    {formatFecha(pedido.fecha)}
                </td>
                <td>
                    {pedido.formaEntrega}
                </td>
                <td>
                    {pedido.formaPago}
                </td>
                <td>
                    <Form.Select
                        size="sm"
                        className="fw-bolder"
                        value={pedido.estado}
                        onChange={handleEstadoChange}
                        disabled={pedido.estado === EstadoPedido.CANCELADO || pedido.estado === EstadoPedido.COMPLETADO}
                    >
                        {Object.values(EstadoPedido).map((estado) => (
                            <option
                                className="fw-bolder"
                                key={estado}
                                value={estado}
                                disabled={pedido.estado === EstadoPedido.CONFIRMAR &&
                                    (estado === EstadoPedido.EN_CAMINO || estado === EstadoPedido.COMPLETADO)
                                }
                            >
                                {estado}
                            </option>
                        ))}
                    </Form.Select>
                </td>
                <td>
                    <Button onClick={() => handleOpenModal(pedido.id)} variant="outline-dark">
                        <Pen />
                    </Button>
                </td>
                <td>
                    {pedido && cliente && pedido.estado !== 'CANCELADO' && (
                        <PDFDownloadLink
                            document={<GenerarFactura pedido={pedido} cliente={cliente} />}
                            fileName={`factura_${pedido.id}.pdf`}
                        >
                            <Button variant="outline-dark">
                                Factura <FiletypePdf />
                            </Button>
                        </PDFDownloadLink>
                    )}{pedido && cliente && pedido.estado === 'CANCELADO' && (
                        <PDFDownloadLink
                            document={<GenerarNotaCredito pedido={pedido} cliente={cliente} />}
                            fileName={`nota_credito_${pedido.id}.pdf`}
                        >
                            <Button variant="outline-dark">
                                Nota Crédito <FiletypePdf />
                            </Button>
                        </PDFDownloadLink>
                    )}
                    {pedido.estado !== EstadoPedido.COMPLETADO && (
                        <>
                            {showCancelButton && (
                                <Button
                                    variant="danger"
                                    onClick={handleCancelOrder}
                                >
                                    Cancelar Pedido
                                </Button>
                            )}
                        </>
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
    );
}
export default ItemPedidoCajero;