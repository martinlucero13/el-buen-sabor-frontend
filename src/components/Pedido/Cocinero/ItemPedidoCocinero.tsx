import { Pedido } from "../../../types/Pedido";
import { Button, Col, Row } from "react-bootstrap";
import '../ItemPedido.css'
import { useModal } from '../../../hooks/useModal';
import ModalDetallePedidoConfirmado from '../ModalDetallePedidoConfirmado';

function ItemPedidoCocinero(props: Pedido): JSX.Element {

    const { showModal, handleClose } = useModal();

    return(
        <>
            <Row id="tabla-cuerpo">
                <Col className="col-pedido">
                    { props.id }
                </Col>

                <Col className="col-pedido">
                    {props.fecha + "\t"} 
                    {props.horaEstimadaFin}
                </Col>

                <Col className="col-pedido">
                    {props.horaEstimadaFin}
                </Col>

                <Col className="col-pedido">
                    Hora Estimada
                </Col>

                <Col className="col-pedido">
                    <Button id="boton-detalle" onClick={() => handleClose()}>Detalle</Button>
                </Col>
                <Col className="col-pedido">
                    <Button id="boton-detalle-acciones">+ 10 min</Button>
                    <Button id="boton-detalle-acciones">Listo</Button>
                </Col>
            </Row>
            <ModalDetallePedidoConfirmado
                showModal={showModal}
                handleClose={handleClose}
                pedido={props}
                receta={true}
            />
        </>
    );
}

export default ItemPedidoCocinero;