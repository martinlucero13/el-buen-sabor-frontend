import { Pedido } from "../../../types/Pedido";
import { Button, Col, Row } from "react-bootstrap";
import { useModal } from '../../../hooks/useModal';
import { useEffect, useState } from "react";
import ModalDetallePedidoCocinero from "./ModalDetallePedidoCocinero";
import '../ItemPedido.css'

//Util
import {formatearFecha,sumarFechas} from "../../../util/dateUtil";



type ProductoParams = {
    pedido: Pedido;
    actualizarPedido: (id: number, pedidoActualizado:Pedido) => void;
    cambiarEstado: (id: number, pedidoActualizado:Pedido) => void;
}

function ItemPedidoCocinero({ pedido, actualizarPedido, cambiarEstado }: ProductoParams): JSX.Element {

    const { showModal, handleClose } = useModal();

    const [fechaFormato, setFecha] = useState<String>();

    const sumar10Minutos = async () => {
        const confirmarSeguirEditando = window.confirm("¿Desea aumentarle 10 minutos?");
        if (confirmarSeguirEditando) {
            actualizarPedido(pedido.id , pedido);
        }
    };

    const cambiarListo = async () => {

        const confirmarSeguirEditando = window.confirm("¿Pedido Listo?");
        if (confirmarSeguirEditando) {
            pedido.estado="Listo";
            cambiarEstado(pedido.id , pedido);
        }
    };

    useEffect(() => {
        setFecha(formatearFecha(pedido.fecha));
    }, [pedido.fecha]);

    return(
        <>
            <Row className="tabla-cuerpo">
                <Col className="col-pedido">
                    { pedido.id }
                </Col>

                <Col className="col-pedido">
                    {fechaFormato}
                </Col>

                <Col className="col-pedido">
                    {pedido.horaEstimadaFin}
                </Col>

                <Col className="col-pedido">
                    {sumarFechas(String(fechaFormato),pedido.horaEstimadaFin)}
                </Col>

                <Col className="col-pedido">
                    <Button id="boton-detalle" onClick={() => handleClose()}>Detalle</Button>
                </Col>
                <Col className="col-pedido">
                    <Button id="boton-detalle-acciones" onClick={sumar10Minutos}>+ 10 min</Button>
                    <Button id="boton-detalle-acciones" onClick={cambiarListo}>Listo</Button>
                </Col>
            </Row>
            <ModalDetallePedidoCocinero
                showModal={showModal}
                handleClose={handleClose}
                pedido={pedido}
            />
        </>
    );
}

export default ItemPedidoCocinero;