import { useNavigate } from "react-router-dom";
import { Pedido } from "../../types/Pedido";
import { Button, Col, Row } from "react-bootstrap";
import './ItemPedido.css'
import { useModal } from '../../hooks/useModal';
import ModalDetallePedidoConfirmado from './ModalDetallePedidoConfirmado';


function ItemPedido(props: Pedido): JSX.Element {

    const navigate = useNavigate();
    const { showModal, handleClose } = useModal();

    function handleButtonClick() {
        navigate(`abm/${props.id}`);
    }

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
                    { props.tipoEntregaPedido?.descripcion }
                </Col>

                <Col className="col-pedido">
                    { props.tipoPagoPedido?.descripcion }
                </Col>
                <Col className="col-pedido">
                    Estado del pago
                </Col>
                <Col className="col-pedido">
                    Estado del pedido
                </Col>
                <Col className="col-pedido">
                    <Button id="boton-detalle" onClick={() => handleClose()}>Detalle</Button>
                </Col>
            </Row>
            <ModalDetallePedidoConfirmado
                showModal={showModal}
                handleClose={handleClose}
                pedido={props}
            />
        </>
    );
}

export default ItemPedido;